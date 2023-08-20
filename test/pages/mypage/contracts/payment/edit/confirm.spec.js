import { config, createLocalVue, mount } from '@vue/test-utils';
import VueMask from 'v-mask';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';

import EditPaymentConfirm from '@/pages/mypage/contracts/payment/edit/confirm.vue';
import BaseButton from '@/components/formItems/BaseButton';
import PageTitle from '@/components/PageTitle';

import paymentInfo from '@/test/data/paymentInfo';

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
  let actions, mutations, store;

  mutations = {
    setContractId: jest.fn(),
  };

  store = new Vuex.Store({
    modules: {
      contracts: {
        namespaced: true,
        mutations,
        actions,
        state: {
          paymentInfo,
        },
      },
      payment: {
        actions,
      },
    },
  });

  const factory = (options) =>
    mount(EditPaymentConfirm, {
      data() {
        return {
          cardInfo: paymentInfo,
        };
      },
      localVue,
      stubs: {
        PageTitle,
        BaseButton,
      },
      mocks: {
        $helpers,
        $store,
      },
      store,
      computed: {
        paymentInfo: () => paymentInfo,
        contractId: () => {},
        listContractInfo: () => {},
      },
      ...options,
    });

  afterEach(async () => {
    await wrapper.destroy();
    await jest.clearAllMocks();
  });

  test('is a Vue instance', async () => {
    wrapper = await factory({
      mocks: {
        $helpers,
      },
    });

    expect(wrapper.vm).toBeTruthy();
  });

  // Test refresh browser
  test('Test preventNav', async () => {
    const spyPreventNav = jest.spyOn(EditPaymentConfirm.methods, 'preventNav');
    wrapper = await factory();

    await window.dispatchEvent(new Event('pagehide'));

    expect(spyPreventNav.mock.calls.length).toBe(1);
  });

  test('Test handleFinish when undefied contractPaymentInfo', async () => {
    const spyHandleFinish = jest.spyOn(
      EditPaymentConfirm.methods,
      'handleFinish'
    );
    localStorage.setItem('cardPaymentInfo_refresh', false);
    localStorage.setItem('contractId_refresh', false);
    let contractId = {
      policyNo: 0,
      subscriberNo: 0,
    };

    actions = {
      updateContractCard: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          mutations,
          state: {
            paymentInfo,
          },
        },
        payments: {
          namespaced: true,
          actions,
        },
      },
    });

    wrapper = await factory({
      data() {
        return {
          cardInfo: paymentInfo,
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
        listContractInfo: () => {},
      },
    });

    const button = wrapper.find('.test');
    expect(button.exists()).toBe(true);
    await button.trigger('click');
    await flushPromises();
    expect(spyHandleFinish).toHaveBeenCalled();
  });

  test('Test handleFinish when undefied contractPaymentInfo', async () => {
    const spyHandleFinish = jest.spyOn(
      EditPaymentConfirm.methods,
      'handleFinish'
    );
    localStorage.setItem('cardPaymentInfo_refresh', false);
    localStorage.setItem('contractId_refresh', false);
    let contractId = {
      policyNo: 0,
      subscriberNo: 0,
    };

    $router = {
      ...$router,
      push: jest.fn(),
    };

    actions = {
      updateContractCard: jest.fn().mockReturnValueOnce(paymentInfo),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          mutations,
          state: {
            paymentInfo,
          },
        },
        payments: {
          namespaced: true,
          actions,
        },
      },
    });

    wrapper = await factory({
      data() {
        return {
          cardInfo: paymentInfo,
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
        listContractInfo: () => {},
      },
    });

    const button = wrapper.find('.test');
    expect(button.exists()).toBe(true);
    await button.trigger('click');
    await flushPromises();

    expect(spyHandleFinish).toHaveBeenCalled();
    expect($router.push.mock.calls[0][0]).toBe('/mypage/contracts/detail/');
  });

  test('Test BeforeRouteEnter', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    localStorage.setItem('cardPaymentInfo_refresh', false);
    localStorage.setItem('contractId_refresh', false);

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
          actions,
        },
      },
    });

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
      computed: {},
      store,
    });

    const spySubmit = jest.spyOn(EditPaymentConfirm, 'beforeRouteEnter');
    localStorage.setItem('reload', false);

    const from = {
      name: 'mypage-contracts-payment-edit',
    };

    const next = jest.fn();

    EditPaymentConfirm.beforeRouteEnter.call(wrapper.vm, undefined, from, next);

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
      computed: {},
      store,
    });

    const spySubmit = jest.spyOn(EditPaymentConfirm, 'beforeRouteEnter');
    localStorage.setItem('reload', false);

    const from = {
      name: '/',
    };

    EditPaymentConfirm.beforeRouteEnter.call(
      wrapper.vm,
      undefined,
      from,
      (next) => next(wrapper.vm)
    );

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/mypage/contracts/');
  });

  test('Test BeforeRouteEnter reload true', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    localStorage.setItem('cardPaymentInfo_refresh', false);
    localStorage.setItem('contractId_refresh', false);

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
      computed: {},
      store,
    });

    const spySubmit = jest.spyOn(EditPaymentConfirm, 'beforeRouteEnter');
    localStorage.setItem('reload', true);

    const from = {
      name: 'solicitation-contracts-payment-new',
    };

    EditPaymentConfirm.beforeRouteEnter.call(
      wrapper.vm,
      undefined,
      from,
      (next) => next(wrapper.vm)
    );

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe(
      '/mypage/contracts/payment/edit/'
    );
  });
});
