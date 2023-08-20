import { mount, config, createLocalVue } from '@vue/test-utils';
import VueMask from 'v-mask';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';

import Agreement from '@/pages/solicitation/contracts/agreement';
import BaseButton from '@/components/formItems/BaseButton';
import PageTitle from '@/components/PageTitle';
import BaseInputCheckbox from '@/components/formItems/BaseInputCheckbox';
import BaseNotice from '@/components/formItems/BaseNotice';
import PetIdCard from '@/components/cards/PetIdCard.vue';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';

import storeMock from '@/test/mocks/store';
import listContractInfo from '@/test/data/contractInfo.js';

config.mocks.$t = (key) => key;

const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(VueMask);
localVue.use(Vuex);
localVue.use(VBTogglePlugin);
localVue.use(CollapsePlugin);
Object.defineProperty(localVue.prototype, '_', { value: _ });
window._ = _;

Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  configurable: true,
  value: 200,
});

let $router = {
  push: () => {},
};

let $route = {
  query: {
    policyNo: '05',
    subscriberNo: '0000000000',
  },
};

const contractId = {
  policyNo: 'PPR00000831100',
  subscriberNo: '0000000000',
};

let $helpers = {
  setDataFromLocalToVuex: () => {},
  getUserId: jest.fn(),
};

describe('Agreement', () => {
  let wrapper, store, mutations, actions;

  actions = {
    contractInfo: jest.fn(),
    updateContractStatus: jest.fn(),
  };

  mutations = {
    setContractId: jest.fn(),
  };

  store = new Vuex.Store({
    modules: {
      contracts: {
        namespaced: true,
        state: {
          listContractInfo,
          contractId,
        },
        mutations,
        actions,
      },
    },
  });

  const factory = (options) =>
    mount(Agreement, {
      localVue,
      store,
      stubs: {
        PageTitle,
        BaseButton,
        BaseInputCheckbox,
        PetIdCard,
        BaseNotice,
      },
      computed: {
        listContractInfo: () => listContractInfo,
        contractId: () => contractId,
      },
      mocks: {
        $helpers,
        $router,
        $route,
      },
      ...options,
    });

  afterEach(async () => {
    await wrapper.destroy();
    await jest.clearAllMocks();
  });

  test('is a Vue instance', async () => {
    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $route,
        $router,
      },
    });

    expect(wrapper.vm).toBeTruthy();
  });

  test('test scrolled to bottom is true', async () => {
    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $route,
        $router,
      },
    });

    window.innerHeight = 200;
    window.dispatchEvent(new CustomEvent('scroll'));
    expect(wrapper.vm.scrolledToBottom).toBe(true);
  });

  test('test scrolled to bottom is false', async () => {
    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $route,
        $router,
      },
    });

    window.innerHeight = 100;
    window.dispatchEvent(new CustomEvent('scroll'));
    expect(wrapper.vm.scrolledToBottom).toBeFalsy();
  });

  test('contractInfo is null', async () => {
    $route = {
      query: {
        policyNo: '08',
        subscriberNo: '0000000008',
      },
    };

    storeMock.$axios = {
      post: jest.fn().mockImplementation(() => {
        throw '';
      }),
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $route,
        $router,
      },
      store: storeMock,
    });

    await flushPromises();
  });

  test('confirmAgree click: confirmed agreement', async () => {
    const spyConfirmAgree = jest.spyOn(Agreement.methods, 'confirmAgree');
    $route = {
      ...$route,
      query: {
        expired_page: true,
      },
    };

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $route,
        $router,
      },
    });
    await wrapper.setData({
      urlHasExpired: false,
      agreement: true,
    });

    await flushPromises();
    await wrapper.findAllComponents(BaseButton).at(0).trigger('click');

    expect(spyConfirmAgree.mock.calls.length).toBe(1);
    await wrapper.vm.$validator.validate();
    expect(wrapper.vm.listErrors.length).toBe(0);
    expect($router.push.mock.calls.length).toBe(2);
    expect($router.push.mock.calls[0][0]).toBe(
      '/solicitation/contracts/agreement/expired/'
    );
  });

  test('confirmAgree click: not confirmed agreement', async () => {
    $route = {
      ...$route,
      query: {
        expired_page: true,
      },
    };

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $route,
        $router,
      },
    });

    await wrapper.setData({
      urlHasExpired: false,
      agreement: '',
    });

    await flushPromises();
    await wrapper.vm.confirmAgree();
    await wrapper.vm.$validator.validate();
    expect(wrapper.vm.listErrors.length).toBe(1);
  });
});
