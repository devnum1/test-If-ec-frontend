import { shallowMount, config, createLocalVue, mount } from '@vue/test-utils';
import VueMask from 'v-mask';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';
import '~/plugins/filters';

import Confirm from '@/pages/solicitation/contracts/payment/new/confirm';
import BaseButton from '@/components/formItems/BaseButton';
import PageTitle from '@/components/PageTitle';
import SelectedInsuranceCard from '@/components/cards/SelectedInsuranceCard';

// import cardInfo from '@/test/data/cardInfo';
import paymentInfo from '@/test/data/paymentInfo';
import listContractInfo from '@/test/data/listContractInfo';
import customerData from '@/test/data/customerData';
import premiumCalculation from '@/test/data/premiumCalculation';
import petInfoData from '@/test/data/petInfoData';
import listProductInfo from '@/test/data/listProductInfo.js';

window._ = _;

config.mocks.$t = (key) => key;

const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(VueMask);
localVue.use(Vuex);
localVue.filter('cardLast4Digit', jest.fn());
localVue.filter('expiredMonth', jest.fn());
localVue.filter('expiredYear', jest.fn());
localVue.filter('securityCode', jest.fn());

Object.defineProperty(localVue.prototype, '_', { value: _ });

let $router = {
  push: () => {},
};

let $helpers = {
  setDataFromLocalToVuex: () => {},
  setDataFromVuexToLocal: (event) => {},
  getLastAuthUser: () => {},
  getUserId: () => {},
};

let $store = {
  dispatch: () => {},
  commit: () => {},
  state: {
    payments: '',
  },
};

localStorage.setItem('cardPaymentInfo_refresh', false);

describe('Payment new contract', () => {
  let wrapper;
  let actions, mutations, store, setContractId;

  mutations = {
    setContractId: jest.fn(),
  };

  actions = {
    customerInfo: jest.fn().mockReturnValue(customerData),
    premiumCalculation: jest.fn().mockReturnValue(premiumCalculation),
    productInfo: jest.fn(),
    contractInfo: jest.fn(),
  };

  store = new Vuex.Store({
    modules: {
      contracts: {
        namespaced: true,
        mutations,
        actions,
      },
      payment: {
        actions,
        state: {
          paymentInfo,
        },
      },
    },
  });

  const factory = (options) =>
    mount(Confirm, {
      data() {
        return {
          cardInfo: paymentInfo,
          calculationResult: premiumCalculation,
        };
      },
      localVue,
      stubs: {
        PageTitle,
        BaseButton,
        SelectedInsuranceCard,
      },
      mocks: {
        $helpers,
        $store,
        $router,
      },
      store,
      computed: {
        paymentInfo: () => paymentInfo,
        contractId: () => {},
        listContractInfo: () => listContractInfo,
        petInfo: () => petInfoData,
        listProductInfo: () => listProductInfo,
        repProductCd: () => {},
        customerInfo: () => customerData,
      },
      ...options,
    });

  afterEach(async () => {
    await wrapper.destroy();
    await jest.clearAllMocks();
  });

  test('is a Vue instance', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };
    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
      computed: {
        paymentInfo: () => paymentInfo,
        contractId: () => {},
        listContractInfo: () => listContractInfo,
        petInfo: () => petInfoData,
        listProductInfo: () => listProductInfo,
        repProductCd: () => {},
        customerInfo: () => customerData,
      },
    });
    await Confirm.asyncData({
      store,
    });

    expect(wrapper.vm).toBeTruthy();
  });

  // Test refresh browser
  test('Test preventNav', async () => {
    const spyPreventNav = jest.spyOn(Confirm.methods, 'preventNav');
    wrapper = await factory();

    await window.dispatchEvent(new Event('pagehide'));

    expect(spyPreventNav.mock.calls.length).toBe(1);
  });

  test('Test handleFinish when undefied contractPaymentInfo', async () => {
    const spyHandleFinish = jest.spyOn(Confirm.methods, 'handleFinish');
    localStorage.setItem('cardPaymentInfo_refresh', false);
    localStorage.setItem('contractId_refresh', false);
    let contractId = {
      policyNo: 0,
      subscriberNo: 0,
    };

    actions = {
      updateContractPayment: jest.fn(),
      premiumCalculation: jest.fn().mockReturnValue(premiumCalculation),
      contractInfo: jest.fn(),
      customerInfo: jest.fn().mockReturnValue(customerData),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          mutations,
          actions,
        },
        payments: {
          namespaced: true,
          actions,
          state: {
            paymentInfo,
          },
        },
      },
    });

    wrapper = await factory({
      data() {
        return {
          cardInfo: paymentInfo,
          calculationResult: premiumCalculation,
        };
      },
      store,
      mocks: {
        $helpers,
        $router,
        $store,
      },
      computed: {
        paymentInfo: () => paymentInfo,
        contractId: () => contractId,
        listContractInfo: () => listContractInfo,
        petInfo: () => petInfoData,
        listProductInfo: () => listProductInfo,
        repProductCd: () => {},
        customerInfo: () => customerData,
      },
    });

    const button = wrapper.find('.test');
    expect(button.exists()).toBe(true);
    await button.trigger('click');
    await flushPromises();
    expect(spyHandleFinish).toHaveBeenCalled();
  });

  test('Test handleFinish when undefied contractPaymentInfo', async () => {
    const spyHandleFinish = jest.spyOn(Confirm.methods, 'handleFinish');
    localStorage.setItem('cardPaymentInfo_refresh', false);
    localStorage.setItem('contractId_refresh', false);
    localStorage.setItem('access_insurance', 'home_page');
    let contractId = {
      policyNo: 'PPR00002153900',
      subscriberNo: '0000000000',
    };

    $router = {
      ...$router,
      push: jest.fn(),
    };

    actions = {
      updateContractPayment: jest.fn().mockReturnValueOnce(paymentInfo),
      premiumCalculation: jest.fn().mockReturnValue(premiumCalculation),
      contractInfo: jest.fn(),
      customerInfo: jest.fn().mockReturnValue(customerData),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          mutations,
          actions,
        },
        payments: {
          namespaced: true,
          actions,
          state: {
            paymentInfo,
          },
        },
      },
    });

    wrapper = await factory({
      data() {
        return {
          cardInfo: paymentInfo,
          calculationResult: premiumCalculation,
        };
      },
      store,
      mocks: {
        $helpers,
        $router,
        $store,
      },
      computed: {
        paymentInfo: () => paymentInfo,
        contractId: () => contractId,
        listContractInfo: () => listContractInfo,
        petInfo: () => petInfoData,
        listProductInfo: () => listProductInfo,
        repProductCd: () => {},
        customerInfo: () => customerData,
      },
    });

    const button = wrapper.find('.test');
    expect(button.exists()).toBe(true);
    await button.trigger('click');
    await flushPromises();

    expect(spyHandleFinish).toHaveBeenCalled();
  });

  test('Test BeforeRouteEnter', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    localStorage.setItem('cardPaymentInfo_refresh', false);
    localStorage.setItem('contractId_refresh', false);

    actions = {
      updateContractPayment: jest.fn().mockReturnValueOnce(paymentInfo),
      premiumCalculation: jest.fn().mockReturnValue(premiumCalculation),
      contractInfo: jest.fn(),
      customerInfo: jest.fn().mockReturnValue(customerData),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {},
          actions,
          mutations,
          listContractInfo: null,
        },
        payments: {
          paymentInfo,
        },
      },
    });

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
      computed: {
        paymentInfo: () => paymentInfo,
        contractId: () => {},
        listContractInfo: () => listContractInfo,
        petInfo: () => petInfoData,
        listProductInfo: () => listProductInfo,
        repProductCd: () => {},
        customerInfo: () => customerData,
      },
      store,
    });

    const spySubmit = jest.spyOn(Confirm, 'beforeRouteEnter');
    localStorage.setItem('reload', false);

    const from = {
      name: 'solicitation-contracts-payment-new',
    };

    const next = jest.fn();

    Confirm.beforeRouteEnter.call(wrapper.vm, undefined, from, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
  });

  test('Test BeforeRouteEnter reload false and from # payment new', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    localStorage.setItem('cardPaymentInfo_refresh', false);
    localStorage.setItem('contractId_refresh', false);

    actions = {
      updateContractPayment: jest.fn().mockReturnValueOnce(paymentInfo),
      premiumCalculation: jest.fn().mockReturnValue(premiumCalculation),
      contractInfo: jest.fn(),
      customerInfo: jest.fn().mockReturnValue(customerData),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {},
          actions,
          mutations,
          listContractInfo: null,
        },
        payments: {
          paymentInfo,
        },
      },
    });

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
      computed: {
        paymentInfo: () => paymentInfo,
        contractId: () => {},
        listContractInfo: () => listContractInfo,
        petInfo: () => petInfoData,
        listProductInfo: () => listProductInfo,
        repProductCd: () => {},
        customerInfo: () => customerData,
      },
      store,
    });

    const spySubmit = jest.spyOn(Confirm, 'beforeRouteEnter');
    localStorage.setItem('reload', false);

    const from = {
      name: '/',
    };

    Confirm.beforeRouteEnter.call(wrapper.vm, undefined, from, (next) =>
      next(wrapper.vm)
    );

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
    expect($router.push.mock.calls.length).toBe(2);
    expect($router.push.mock.calls[0][0]).toBe('/mypage/contracts/');
  });

  test('Test BeforeRouteEnter reload true', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    localStorage.setItem('cardPaymentInfo_refresh', false);
    localStorage.setItem('contractId_refresh', false);

    actions = {
      updateContractPayment: jest.fn().mockReturnValueOnce(paymentInfo),
      premiumCalculation: jest.fn().mockReturnValue(premiumCalculation),
      contractInfo: jest.fn(),
      customerInfo: jest.fn().mockReturnValue(customerData),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {},
          actions,
          mutations,
          listContractInfo: null,
        },
        payments: {
          paymentInfo,
        },
      },
    });

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
      computed: {
        paymentInfo: () => paymentInfo,
        contractId: () => {},
        listContractInfo: () => listContractInfo,
        petInfo: () => petInfoData,
        listProductInfo: () => listProductInfo,
        repProductCd: () => {},
        customerInfo: () => customerData,
      },
      store,
    });

    const spySubmit = jest.spyOn(Confirm, 'beforeRouteEnter');
    localStorage.setItem('reload', true);

    const from = {
      name: 'solicitation-contracts-payment-new',
    };

    Confirm.beforeRouteEnter.call(wrapper.vm, undefined, from, (next) =>
      next(wrapper.vm)
    );

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
    expect($router.push.mock.calls.length).toBe(2);
    expect($router.push.mock.calls[0][0]).toBe(
      '/solicitation/contracts/payment/new/'
    );
  });
});
