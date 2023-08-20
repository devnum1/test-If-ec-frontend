import { shallowMount, config, createLocalVue, mount } from '@vue/test-utils';
import VueMask from 'v-mask';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';

import Step4Confirm from '@/pages/solicitation/step4/confirm';
import BaseButton from '@/components/formItems/BaseButton';
import PageTitle from '@/components/PageTitle';
import ButtonBack from '@/components/formItems/ButtonBack';
import StepProgress from '@/components/stepProgress/stepProgress';
import BaseInputCheckbox from '@/components/formItems/BaseInputCheckbox';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';

import customerInfo from '@/test/data/customerInfo.js';

config.mocks.$t = (key) => key;

const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(VueMask);
localVue.use(Vuex);
localVue.use(VBTogglePlugin);
localVue.use(CollapsePlugin);
Object.defineProperty(localVue.prototype, '_', { value: _ });

let $router = {
  push: () => {},
};

let $helpers = {
  setDataFromLocalToVuex: () => {},
  setDataFromVuexToLocal: (event) => {},
};

describe('step4-confirm', () => {
  let wrapper;
  window.open = jest.fn();

  const factory = (options) =>
    mount(Step4Confirm, {
      localVue,
      stubs: {
        PageTitle,
        BaseButton,
        StepProgress,
        BaseInputCheckbox,
        ButtonBack,
      },
      mocks: {
        $helpers,
      },
      computed: {
        customerInfo: () => customerInfo,
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

  test('Test preventNav', async () => {
    const spyPreventNav = jest.spyOn(Step4Confirm.methods, 'preventNav');
    wrapper = await factory();

    const spy = jest.spyOn(wrapper.vm.$helpers, 'setDataFromVuexToLocal');

    await window.dispatchEvent(new Event('pagehide'));

    expect(spyPreventNav.mock.calls.length).toBe(1);
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0]).toEqual(
      expect.arrayContaining([
        'petInfo',
        'productCd',
        'customerInfo',
        'contract_duplicate',
      ])
    );
  });

  test('check show pdf', async () => {
    const windowOpenSpy = spyOn(window, 'open');
    const spySubmit = jest.spyOn(Step4Confirm.methods, 'handlePdf');
    wrapper = await factory();
    await wrapper.findComponent(BaseButton).trigger('click');

    expect(spySubmit.mock.calls.length).toBe(1);
    expect(wrapper.vm.$data.showPdf).toBe(true);
    expect(windowOpenSpy).toHaveBeenCalledWith(
      '/pdf/important_matters.pdf',
      '_blank'
    );
  });

  test('Next step', async () => {
    window.open.mockClear();
    const spySubmit = jest.spyOn(Step4Confirm.methods, 'handleNextStep');
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
      isChecked: true,
      showPdf: true,
    });

    await wrapper.find('.btn--icon-right').trigger('click');
    await flushPromises();

    expect(spySubmit.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/solicitation/confirm/');
  });

  // test('Test back Step: customer = null and send_mail = null', async () => {
  //   const spySubmit = jest.spyOn(Step4Confirm.methods, 'handleCancel');
  //   localStorage.setItem('send_from_mail', false);
  //   window._ = _;

  //   $router = {
  //     ...$router,
  //     push: jest.fn(),
  //   };

  //   wrapper = await factory({
  //     mocks: {
  //       $helpers,
  //       $router,
  //     },
  //     computed: {
  //       customerInfo: () => null,
  //     },
  //   });

  //   await wrapper.findComponent(ButtonBack).trigger('click');
  //   await flushPromises();

  //   expect(spySubmit.mock.calls.length).toBe(1);
  //   expect($router.push.mock.calls.length).toBe(1);
  //   expect($router.push.mock.calls[0][0]).toBe('/solicitation/step2/');
  // });

  // test('Test back Step: customer exist', async () => {
  //   const spySubmit = jest.spyOn(Step4Confirm.methods, 'handleCancel');
  //   window._ = _;

  //   $router = {
  //     ...$router,
  //     push: jest.fn(),
  //   };

  //   wrapper = await factory({
  //     mocks: {
  //       $helpers,
  //       $router,
  //     },
  //     computed: {
  //       customerInfo: () => customerInfo,
  //     },
  //   });

  //   await wrapper.findComponent(ButtonBack).trigger('click');
  //   await flushPromises();

  //   expect(spySubmit.mock.calls.length).toBe(1);
  //   expect($router.push.mock.calls.length).toBe(1);
  //   expect($router.push.mock.calls[0][0]).toBe('/solicitation/step4/');
  // });
});
