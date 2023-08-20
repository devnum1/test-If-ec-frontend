import { shallowMount, mount, config, createLocalVue } from '@vue/test-utils';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';
import VueMask from 'v-mask';
import Vuex from 'vuex';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';
import { Auth } from 'aws-amplify';

import Payment from '@/pages/solicitation/contracts/payment/new/index.vue';
import BaseButton from '@/components/formItems/BaseButton';
import PageTitle from '@/components/PageTitle.vue';
import BaseLabel from '@/components/formItems/BaseLabel';
import BaseInput from '@/components/formItems/BaseInput';
import BaseSelect from '@/components/formItems/BaseSelect';
import BaseLabelTooltip from '@/components/formItems/BaseLabelTooltip';

import sample from '@/test/data/sample';
import veelidate from '@/plugins/veelidate';

let paymentResponse = {
  resultCode: '001',
};

global.Multipayment = {
  init: jest.fn(),
  getToken: jest.fn().mockImplementation((params, callback) => {
    callback(paymentResponse);
  }),
};

// store
import storeMock from '@/test/mocks/store';

config.mocks.$t = (key) => key;
window._ = _;

const localVue = createLocalVue();
localVue.use(VueMask);
localVue.use(Vuex);
localVue.use(VBTogglePlugin);
localVue.use(CollapsePlugin);
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
  getAccessToken: () => {},
};

let $store = {
  dispatch: () => {},
  commit: () => {},
};

describe('payment', () => {
  let wrapper;
  window.confirm = jest.fn();

  const factory = (options) =>
    mount(Payment, {
      localVue,
      stubs: {
        PageTitle,
        BaseButton,
        BaseLabel,
        BaseInput,
        BaseSelect,
        BaseLabelTooltip,
      },
      mocks: {
        $helpers,
        $store,
        $route,
        $router,
      },
      ...options,
    });

  afterEach(async () => {
    await wrapper.destroy();
    await jest.clearAllMocks();
  });

  test('is vue instance', async () => {
    wrapper = await factory({
      mocks: {
        $helpers,
        $store,
        $route,
      },
    });

    wrapper.setData({
      dataForm: {
        expire_YY: new Date().getFullYear(),
      },
    });

    expect(wrapper.vm).toBeTruthy();
  });

  test('Test preventNav', async () => {
    const spyPreventNav = jest.spyOn(Payment.methods, 'preventNav');
    wrapper = await factory();
    localStorage.setItem('refresh', true);
    const spy = jest.spyOn(wrapper.vm.$helpers, 'setDataFromVuexToLocal');

    await window.dispatchEvent(new Event('pagehide'));

    await flushPromises();

    expect(spyPreventNav.mock.calls.length).toBe(1);
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0]).toEqual(
      expect.arrayContaining([
        'petInfo',
        'productCd',
        'customerInfo',
        'contractId',
        'refresh',
      ])
    );
  });

  // Test BeforeRouteEnter
  test('Test BeforeRouteEnter', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
    });

    const spySubmit = jest.spyOn(Payment, 'beforeRouteEnter');

    const next = jest.fn();
    const from = {
      name: 'solicitation-confirm',
    };
    localStorage.setItem('refresh', false);

    Payment.beforeRouteEnter.call(wrapper.vm, undefined, from, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
  });

  // Test BeforeRouteEnter with refresh
  test('Test BeforeRouteEnter with refresh', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
    });

    const spySubmit = jest.spyOn(Payment, 'beforeRouteEnter');

    const from = {
      name: 'solicitation-step1',
    };
    localStorage.setItem('refresh', false);

    Payment.beforeRouteEnter.call(wrapper.vm, undefined, from, (next) =>
      next(wrapper.vm)
    );
    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/mypage/contracts/');
  });

  test('Test nextStep immediate submit', async () => {
    const spyNextStep = jest.spyOn(Payment.methods, 'nextStep');

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
    });

    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();

    expect(spyNextStep.mock.calls.length).toBe(1);
  });

  test('Test nextStep invalid month', async () => {
    const spyNextStep = jest.spyOn(Payment.methods, 'nextStep');

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
    });

    wrapper.setData({
      dataForm: {
        cardno: '1234567891234567',
        expire_MM: 2,
        expire_YY: 2021,
        securitycode: '1234',
      },
    });

    await flushPromises();
    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();

    expect(spyNextStep.mock.calls.length).toBe(0);
  });

  test('Test nextStep invalid year', async () => {
    const spyNextStep = jest.spyOn(Payment.methods, 'nextStep');

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
    });

    wrapper.setData({
      dataForm: {
        cardno: '1234567891234567',
        expire_MM: 1,
        expire_YY: 2020,
        securitycode: '1234',
      },
    });

    await flushPromises();
    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();

    expect(spyNextStep.mock.calls.length).toBe(0);
  });

  test('Test nextStep Multipayment fail', async () => {
    const spyNextStep = jest.spyOn(Payment.methods, 'nextStep');

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
    });

    wrapper.setData({
      dataForm: {
        cardno: '1234567891234567',
        expire_MM: 6,
        expire_YY: 2022,
        securitycode: '1234',
      },
    });

    await flushPromises();
    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();

    expect(spyNextStep.mock.calls.length).toBe(1);
  });

  test('Test nextStep Multipayment success', async () => {
    const spyNextStep = jest.spyOn(Payment.methods, 'nextStep');

    paymentResponse = {
      resultCode: '000',
      tokenObject: {
        token: ['token_1', 'token_2'],
      },
    };

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
        $store,
      },
    });

    wrapper.setData({
      dataForm: {
        cardno: '1234567891234567',
        expire_MM: 6,
        expire_YY: 2022,
        securitycode: '1234',
      },
    });

    await flushPromises();
    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();

    expect(spyNextStep.mock.calls.length).toBe(1);
  });
});
