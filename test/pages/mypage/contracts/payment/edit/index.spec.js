import { shallowMount, mount, config, createLocalVue } from '@vue/test-utils';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';
import VueMask from 'v-mask';
import Vuex from 'vuex';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';
import { Auth } from 'aws-amplify';

import EditPayment from '@/pages/mypage/contracts/payment/edit/index.vue';
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
localVue.filter('cardLast4Digit', jest.fn());
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

localStorage.setItem('credit_card', '8123');

describe('payment edit', () => {
  let wrapper;
  window.confirm = jest.fn();

  const factory = (options) =>
    mount(EditPayment, {
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

    expect(wrapper.vm).toBeTruthy();
  });

  test('Test preventNav', async () => {
    const spyPreventNav = jest.spyOn(EditPayment.methods, 'preventNav');
    wrapper = await factory();
    localStorage.setItem('refresh', true);
    const spy = jest.spyOn(wrapper.vm.$helpers, 'setDataFromVuexToLocal');

    await window.dispatchEvent(new Event('pagehide'));

    await flushPromises();

    expect(spyPreventNav.mock.calls.length).toBe(1);
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0]).toEqual(expect.arrayContaining(['refresh']));
  });

  test('Test nextStep invalid month', async () => {
    const spyNextStep = jest.spyOn(EditPayment.methods, 'nextStep');

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

    await wrapper.setData({
      dataForm: {
        cardno: '123456789012345',
        expire_MM: 2,
        expire_YY: 2026,
        securitycode: '1234',
      },
    });

    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();

    expect(spyNextStep.mock.calls.length).toBe(1);
  });
});
