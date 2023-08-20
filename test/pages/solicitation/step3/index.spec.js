import { shallowMount, mount, config, createLocalVue } from '@vue/test-utils';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import VueMask from 'v-mask';
import Vuex from 'vuex';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';
import { Auth } from 'aws-amplify';

// components
import Step3 from '@/pages/solicitation/step3/index.vue';
import BaseButton from '@/components/formItems/BaseButton';
import ButtonBack from '@/components/formItems/ButtonBack';
import BaseLabel from '@/components/formItems/BaseLabel';
import SuggestMail from '@/components/formItems/SuggestMail';
import BaseInputCheckbox from '@/components/formItems/BaseInputCheckbox';
import PageTitle from '@/components/PageTitle.vue';
import StepProgress from '@/components/stepProgress/stepProgress';

// store
import storeMock from '@/test/mocks/store';

// sample data
import listProductInfo from '@/test/data/listProductInfo.js';
import petInfo from '@/test/data/petInfo';

config.mocks.$t = (key) => key;
const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(VueMask);
localVue.use(Vuex);
localVue.use(VBTogglePlugin);
localVue.use(CollapsePlugin);
localVue.filter('formatPrice', jest.fn());
Object.defineProperty(localVue.prototype, '_', { value: _ });

let $router = {
  push: () => {},
};

let $route = {
  hash: '',
};

let $helpers = {
  setDataFromLocalToVuex: () => {},
  setDataFromVuexToLocal: (event) => {},
  randomString: () => {},
};

let $store = {
  dispatch: () => {},
  getters: {
    'auth/isAuthenticated': false,
  },
  commit: () => {},
  state: {
    contracts: {
      petInfo,
      repProductCd: '',
    },
  },
};

const $storeReturnPromise = {
  dispatch: () => Promise.resolve(),
};

describe('step3', () => {
  let wrapper;

  const factory = (options) =>
    mount(Step3, {
      localVue,
      stubs: {
        PageTitle,
        BaseButton,
        StepProgress,
        BaseLabel,
        SuggestMail,
        BaseInputCheckbox,
        ButtonBack,
      },
      mocks: {
        $helpers,
        $store: $storeReturnPromise,
        $route,
        $router,
      },
      computed: {
        petInfo: () => petInfo,
        repProductCd: () => listProductInfo,
      },
      ...options,
    });

  afterEach(async () => {
    await jest.clearAllMocks();
  });

  test('is vue instance', async () => {
    wrapper = await factory();

    expect(wrapper.vm).toBeTruthy();
  });

  // Test refresh browser
  test('Test refresh browser', async () => {
    wrapper = await factory();

    const spy = jest.spyOn(wrapper.vm.$helpers, 'setDataFromVuexToLocal');

    await window.dispatchEvent(new Event('pagehide'));

    expect(spy.mock.calls.length).toBe(2);
    expect(spy.mock.calls[0]).toEqual(
      expect.arrayContaining(['petInfo', 'productCd'])
    );
  });

  test('Test handle open PDF', async () => {
    await wrapper.find('.cursor-pointer').trigger('click');
    wrapper.vm.handleOpenPdf();
    expect(global.open).toBeCalled();
  });

  test('Test handleNextStep unauthenticated', async () => {
    const spyNextStep = jest.spyOn(Step3.methods, 'handleNextStep');
    const push = jest.fn();

    wrapper = await factory({
      mocks: {
        $helpers,
        $router: {
          push,
        },
        $route,
        $store: $storeReturnPromise,
      },
    });

    await wrapper.setData({
      email: 'pet@sun-asterisk.com',
    });

    await wrapper.findAllComponents(BaseButton).at(0).trigger('click');
    await flushPromises();

    expect(spyNextStep.mock.calls.length).toBe(1);
  });
});
