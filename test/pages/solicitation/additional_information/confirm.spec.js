import { shallowMount, config, createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import * as _ from 'lodash';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';

import listProductInfo from '@/test/data/listProductInfo.js';
import customerInfo from '@/test/data/customerInfo.js';
import petInfoData from '@/test/data/petInfoData';
import customerData from '@/test/data/customerData.js';
import petInfo from '@/test/data/petInfo';
import contractInfo from '@/test/data/contractInfo';
import newContract from '@/test/data/newContract';

import AdditionalInfoConfirm from '@/pages/solicitation/additional_information/confirm';
import BaseInputCheckbox from '@/components/formItems/BaseInputCheckbox';
import BaseCheckBoxList from '@/components/formItems/BaseCheckBoxList';
import BaseButton from '@/components/formItems/BaseButton';
import ButtonBack from '@/components/formItems/ButtonBack';
import BaseLabel from '@/components/formItems/BaseLabel';
import BaseLabelTooltip from '@/components/formItems/BaseLabelTooltip';
import PageTitle from '@/components/PageTitle.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VBTogglePlugin);
localVue.use(CollapsePlugin);
window._ = _;

Object.defineProperty(localVue.prototype, '_', { value: _ });
let $helpers = {
  setDataFromLocalToVuex: () => {},
  setDataFromVuexToLocal: (event) => {},
  getUserId: (id) => {
    return 123;
  },
  getLastAuthUser: () => customerData.customerInfo.contact.mailAddress,
};

let $store = {
  dispatch: () => {},
  commit: () => {},
  state: {
    contracts: {
      // petInfo,
      listProductInfo,
      repProductCd: '',
      newContractInfo: contractInfo,
    },
  },
};

let $router = {
  push: () => {},
};

let $route = {
  hash: '',
};

const $cookies = {
  get: () => {},
  set: () => {},
  remove: () => {},
};

config.mocks.$t = (key) => key;

describe('additional_information_confirm', () => {
  let wrapper;
  process.env.BOOTSTRAP_VUE_NO_WARN = true;
  let actions = {
    customerInfo: (id) => {
      return new Promise((resolve) => {
        return resolve(customerData);
      });
    },
    productInfo: (id) => jest.fn((route) => {}),
  };

  let store = new Vuex.Store({
    modules: {
      contracts: {
        namespaced: true,
        state: {
          // petInfo,
          listProductInfo,
          newContractInfo: contractInfo,
        },
        actions,
      },
    },
  });

  let factory = (options) =>
    mount(AdditionalInfoConfirm, {
      localVue,
      stubs: {
        BaseInputCheckbox,
        BaseCheckBoxList,
        PageTitle,
        BaseButton,
        BaseLabel,
        BaseLabelTooltip,
        ButtonBack,
      },
      mocks: {
        $helpers,
      },
      store,
      ...options,
    });

  // beforeEach(() => {
  //   wrapper = factory();
  // });
  //
  // afterEach(() => {
  //   wrapper.destroy();
  // });

  test('is a Vue instance', async () => {
    localStorage.setItem(
      'disease_option',
      JSON.stringify({
        list: '',
        btnActive: '',
        noDisease: '',
      })
    );

    wrapper = await factory();

    expect(wrapper.vm).toBeTruthy();
  });

  // Test refresh browser
  test('Test preventNav', async () => {
    const spyPreventNav = jest.spyOn(
      AdditionalInfoConfirm.methods,
      'preventNav'
    );
    wrapper = await factory();

    await window.dispatchEvent(new Event('pagehide'));

    expect(spyPreventNav.mock.calls.length).toBe(1);
  });
});

describe('complete', () => {
  let wrapper;

  let actions = {
    customerInfo: (id) => {
      return new Promise((resolve) => {
        return resolve(customerData);
      });
    },
    productInfo: (id) => jest.fn((route) => {}),
  };

  let store = new Vuex.Store({
    modules: {
      contracts: {
        namespaced: true,
        state: {
          customerInfo,
          newContractInfo: contractInfo,
        },
        actions,
      },
    },
  });

  let factory = (options) =>
    mount(AdditionalInfoConfirm, {
      localVue,
      stubs: {
        BaseInputCheckbox,
        BaseCheckBoxList,
        PageTitle,
        BaseButton,
        BaseLabel,
        BaseLabelTooltip,
        ButtonBack,
      },
      mocks: {
        $helpers,
        $store,
      },
      computed: {
        petInfo: () => petInfo,
        listProductInfo: () => listProductInfo,
      },
      ...options,
    });

  afterEach(async () => {
    await wrapper.destroy();
    await jest.clearAllMocks();
  });

  test('Test BeforeRouteEnter', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $router,
        $helpers,
      },
      store,
    });

    const spySubmit = jest.spyOn(AdditionalInfoConfirm, 'beforeRouteEnter');

    const next = jest.fn();
    const from = {
      name: 'solicitation-additional_information-index',
    };
    localStorage.setItem('reload', false);

    AdditionalInfoConfirm.beforeRouteEnter.call(
      wrapper.vm,
      undefined,
      from,
      next
    );

    expect(spySubmit).toHaveBeenCalled();
  });

  test('Test BeforeRouteEnter with reload', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $router,
        $helpers,
      },
      store,
    });

    const spySubmit = jest.spyOn(AdditionalInfoConfirm, 'beforeRouteEnter');

    const from = {
      name: 'solicitation-additional_information-index',
    };
    localStorage.setItem('reload', true);

    AdditionalInfoConfirm.beforeRouteEnter.call(
      wrapper.vm,
      undefined,
      from,
      (next) => next(wrapper.vm)
    );

    expect(spySubmit).toHaveBeenCalled();
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe(
      '/solicitation/additional_information/'
    );
  });
});

describe('additional_information_confirm_dispatch', () => {
  let wrapper;
  process.env.BOOTSTRAP_VUE_NO_WARN = true;
  let actions = {
    customerInfo: (id) => {
      return new Promise((resolve) => {
        return resolve(customerData);
      });
    },
    productInfo: (id) => jest.fn((route) => {}),
    newContract: (id) => jest.fn((route) => {}),
  };

  let mutations = {
    setPetInfo: jest.fn(),
    setRepProductCd: jest.fn(),
    setCustomerInfo: jest.fn(),
  };

  let store = new Vuex.Store({
    modules: {
      contracts: {
        namespaced: true,
        state: {
          petInfo,
          listProductInfo,
          repProductCd: () => listProductInfo,
          customerInfoFromVuex: customerInfo,
        },
        actions,
        mutations,
      },
    },
  });

  afterEach(async () => {
    await wrapper.destroy();
    await jest.clearAllMocks();
  });

  let factory = (options) =>
    mount(AdditionalInfoConfirm, {
      localVue,
      stubs: {
        BaseInputCheckbox,
        BaseCheckBoxList,
        PageTitle,
        BaseButton,
        BaseLabel,
        BaseLabelTooltip,
        ButtonBack,
      },
      mocks: {
        $helpers,
        $store,
      },
      store,
      ...options,
    });

  test('dispatch customerInfo false', async () => {
    localStorage.setItem('contract_refresh', JSON.stringify(petInfoData));
    localStorage.setItem('repProductCd_refresh', 70);
    localStorage.setItem('customer_refresh', JSON.stringify({}));
    wrapper = await factory();

    expect(wrapper.vm).toBeTruthy();
  });

  test('Test click button', async () => {
    localStorage.setItem(
      'disease_option',
      JSON.stringify({
        list: ['027', '028', '098'],
        btnActive: true,
        noDisease: false,
      })
    );
    let petInfoTmp = {
      petName: '入力情報に不備があり',
      petType: '02',
      petBreed: null,
      petWeight: null,
      petSexCd: '02',
      noticeCd01: '01',
      petBirthdayDiv: '02',
      petBirthday: '2020/05',
      noticeCd02: '02',
      petInsJoinFlg: '02',
    };

    let mutations = {
      setPetInfo: jest.fn(),
      setRepProductCd: jest.fn(),
      setCustomerInfo: jest.fn(),
    };

    let store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            petInfo: petInfoTmp,
            listProductInfo,
            repProductCd: () => listProductInfo,
          },
          actions,
          mutations,
        },
      },
    });

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $router,
        $helpers,
        $cookies,
      },
      store,
    });

    await wrapper.setData({
      btnActive: true,
      dataCustomerInfo: customerData.customerInfo.customer,
    });

    // await flushPromises();

    const checkBox = wrapper.find('.input-checkbox__checkmark');
    await checkBox.trigger('click');

    const button = wrapper.find('.page-button button');
    expect(button.exists()).toBe(true);

    // wrapper.vm.$router = $router;
    await button.trigger('click');
  });

  test('Test click button - disease_option is NULL', async () => {
    localStorage.setItem(
      'disease_option',
      JSON.stringify({
        list: [],
        btnActive: true,
        noDisease: false,
      })
    );
    let petInfoTmp = {
      petName: '入力情報に不備があり',
      petType: '02',
      petBreed: null,
      petWeight: null,
      petSexCd: '02',
      noticeCd01: '01',
      petBirthdayDiv: '02',
      petBirthday: '2020/05',
      noticeCd02: '02',
      petInsJoinFlg: '02',
    };

    let mutations = {
      setPetInfo: jest.fn(),
      setRepProductCd: jest.fn(),
      setCustomerInfo: jest.fn(),
      setContractId: jest.fn(),
    };

    actions = {
      ...actions,
      newContract: jest.fn().mockReturnValue(newContract),
    };

    let store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            petInfo: petInfoTmp,
            listProductInfo,
            repProductCd: () => listProductInfo,
            contractDuplicate: true,
          },
          actions,
          mutations,
        },
      },
    });

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $router,
        $helpers,
        $cookies,
      },
      store,
    });

    await wrapper.setData({
      btnActive: true,
      dataCustomerInfo: customerData.customerInfo.customer,
    });

    // await flushPromises();

    const checkBox = wrapper.find('.input-checkbox__checkmark');
    await checkBox.trigger('click');

    const button = wrapper.find('.page-button button');
    expect(button.exists()).toBe(true);

    // wrapper.vm.$router = $router;
    await button.trigger('click');
  });
});
