import { mount, config, createLocalVue } from '@vue/test-utils';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';
import Vuex from 'vuex';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';
import Step4 from '@/pages/solicitation/step4/index.vue';
import BaseButton from '@/components/formItems/BaseButton';
import PageTitle from '@/components/PageTitle.vue';
import BaseNotice from '@/components/formItems/BaseNotice';
import BaseLabel from '@/components/formItems/BaseLabel';
import BaseInput from '@/components/formItems/BaseInput';
import ButtonBack from '@/components/formItems/ButtonBack';
import BaseLabelTooltip from '@/components/formItems/BaseLabelTooltip';
import BaseInputRadio from '@/components/formItems/BaseInputRadio';
import BaseInputRadioContainer from '@/components/formItems/BaseInputRadioContainer';
import StepProgress from '@/components/stepProgress/stepProgress';

import sample from '@/test/data/sample';

config.mocks.$t = (key) => key;
const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VBTogglePlugin);
localVue.use(CollapsePlugin);
window._ = _;

Object.defineProperty(localVue.prototype, '_', { value: _ });

let $router = {
  push: () => {},
};

let $route = {
  hash: '',
};

let $helpers = {
  setDataFromLocalToVuex: () => {},
  setDataFromVuexToLocal: () => {},
  getLastAuthUser: () => {},
  getUserId: () => {},
};

let context = {
  from: {
    name: 'NA',
  },
  route: {
    hash: '#edit',
  },
};

describe('step4', () => {
  let wrapper;
  let mutations, store;

  const factory = (options) =>
    mount(Step4, {
      localVue,
      stubs: {
        PageTitle,
        BaseButton,
        ButtonBack,
        StepProgress,
        BaseNotice,
        BaseLabel,
        BaseInput,
        BaseLabelTooltip,
        BaseInputRadio,
        BaseInputRadioContainer,
      },
      mocks: {
        $helpers,
        $route,
        $router,
      },
      computed: {
        customerInfo: () => {},
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
        $router,
        $route,
      },
    });

    await Step4.asyncData(context);
    expect(wrapper.vm).toBeTruthy();
  });

  test('test asyncData with customerInfo', async () => {
    let dispatchSpy = jest.fn().mockReturnValueOnce('example');
    let commitSpy = jest.fn();
    let redirectSpy = jest.fn();

    context = {
      ...context,
      from: {
        name: 'login',
      },
      route: {
        hash: '#',
      },
      store: {
        dispatch: dispatchSpy,
        commit: commitSpy,
      },
      $helpers: {
        getUserId: () => {},
      },
      redirect: redirectSpy,
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
        $route,
      },
    });

    await Step4.asyncData(context);

    expect(dispatchSpy.mock.calls.length).toBe(1);
    expect(commitSpy.mock.calls.length).toBe(1);
    expect(redirectSpy.mock.calls.length).toBe(1);
  });

  test('test asyncData with customerInfo is null', async () => {
    let dispatchSpy = jest.fn().mockReturnValueOnce(null);
    let commitSpy = jest.fn();

    context = {
      ...context,
      store: {
        dispatch: dispatchSpy,
        commit: commitSpy,
      },
      $helpers: {
        getUserId: () => {},
      },
      redirect: () => {},
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $route,
      },
    });

    await Step4.asyncData(context);
    expect(commitSpy.mock.calls.length).toBe(0);
  });

  test('validate lastnameKanji: valid', async () => {
    wrapper = await factory();
    const lastNameKanjiInput = wrapper.find('input[name="lastnameKanji"]');

    let error = wrapper.find('.base-input__error');
    expect(error.exists()).toBe(false);

    const validValue = sample.mixed_25_chars;

    await lastNameKanjiInput.setValue(validValue);
    await wrapper.vm.$validator.validate();

    expect(
      wrapper
        .findAll('.form-group')
        .at(0)
        .findAll('.base-input')
        .at(0)
        .find('.base-input__error')
        .exists()
    ).toBe(false);
  });

  test('validate lastnameKanji: invalid', async () => {
    wrapper = await factory();
    const lastNameKanjiInput = wrapper.find('input[name="lastnameKanji"]');

    let error = wrapper.find('.base-input__error');
    expect(error.exists()).toBe(false);

    const invalidValues = [
      sample.empty,
      sample.number,
      sample.latin_chars,
      sample.mixed_26_chars,
    ];

    for (let value of invalidValues) {
      await lastNameKanjiInput.setValue(value);
      await wrapper.vm.$validator.validate();

      expect(
        wrapper
          .findAll('.form-group')
          .at(0)
          .findAll('.base-input')
          .at(0)
          .find('.base-input__error')
          .exists()
      ).toBe(true);
    }
  });

  test('validate firstnameKanji: valid', async () => {
    wrapper = await factory();
    const firstNameKanjiInput = wrapper.find('input[name="firstnameKanji"]');

    let error = wrapper.find('.base-input__error');
    expect(error.exists()).toBe(false);

    const validValue = sample.mixed_25_chars;

    await firstNameKanjiInput.setValue(validValue);
    await wrapper.vm.$validator.validate();

    expect(
      wrapper
        .findAll('.form-group')
        .at(0)
        .findAll('.base-input')
        .at(1)
        .find('.base-input__error')
        .exists()
    ).toBe(false);
  });

  test('validate firstnameKanji: invalid', async () => {
    wrapper = await factory();
    const firstNameKanjiInput = wrapper.find('input[name="firstnameKanji"]');

    let error = wrapper.find('.base-input__error');
    expect(error.exists()).toBe(false);

    const invalidValues = [
      sample.empty,
      sample.number,
      sample.latin_chars,
      sample.mixed_26_chars,
    ];

    for (let value of invalidValues) {
      await firstNameKanjiInput.setValue(value);
      await wrapper.vm.$validator.validate();

      expect(
        wrapper
          .findAll('.form-group')
          .at(0)
          .findAll('.base-input')
          .at(1)
          .find('.base-input__error')
          .exists()
      ).toBe(true);
    }
  });

  test('validate lastnameKana: valid', async () => {
    wrapper = await factory();
    const lastNameKanaInput = wrapper.find('input[name="lastnameKana"]');

    let error = wrapper.find('.base-input__error');
    expect(error.exists()).toBe(false);

    const validValue = sample.katakana;

    await lastNameKanaInput.setValue(validValue);
    await wrapper.vm.$validator.validate();

    expect(
      wrapper
        .findAll('.form-group')
        .at(1)
        .findAll('.base-input')
        .at(0)
        .find('.base-input__error')
        .exists()
    ).toBe(false);
  });

  test('validate lastnameKanji: invalid', async () => {
    wrapper = await factory();
    const lastNameKanaInput = wrapper.find('input[name="lastnameKana"]');

    let error = wrapper.find('.base-input__error');
    expect(error.exists()).toBe(false);

    const invalidValues = [
      sample.empty,
      sample.number,
      sample.latin_chars,
      sample.mixed_26_chars,
    ];

    for (let value of invalidValues) {
      await lastNameKanaInput.setValue(value);
      await wrapper.vm.$validator.validate();

      expect(
        wrapper
          .findAll('.form-group')
          .at(1)
          .findAll('.base-input')
          .at(0)
          .find('.base-input__error')
          .exists()
      ).toBe(true);
    }
  });

  test('validate firstnameKana: valid', async () => {
    wrapper = await factory();
    const firstNameKanaInput = wrapper.find('input[name="firstnameKana"]');

    let error = wrapper.find('.base-input__error');
    expect(error.exists()).toBe(false);

    const validValue = sample.katakana;

    await firstNameKanaInput.setValue(validValue);
    await wrapper.vm.$validator.validate();

    expect(
      wrapper
        .findAll('.form-group')
        .at(1)
        .findAll('.base-input')
        .at(1)
        .find('.base-input__error')
        .exists()
    ).toBe(false);
  });

  test('validate firstnameKana: invalid', async () => {
    wrapper = await factory();
    const firstNameKanaInput = wrapper.find('input[name="firstnameKana"]');

    let error = wrapper.find('.base-input__error');
    expect(error.exists()).toBe(false);

    const invalidValues = [
      sample.empty,
      sample.number,
      sample.latin_chars,
      sample.mixed_26_chars,
    ];

    for (let value of invalidValues) {
      await firstNameKanaInput.setValue(value);
      await wrapper.vm.$validator.validate();

      expect(
        wrapper
          .findAll('.form-group')
          .at(1)
          .findAll('.base-input')
          .at(1)
          .find('.base-input__error')
          .exists()
      ).toBe(true);
    }
  });

  test('validate customer gender: submit', async () => {
    let spySubmit = jest.spyOn(Step4.methods, 'nextStep');
    wrapper = await factory();
    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();
    expect(spySubmit.mock.calls.length).toBe(1);
    expect(
      wrapper
        .findAll('.form-group')
        .at(2)
        .find('.input-radio-container__error')
        .exists()
    ).toBe(true);
  });

  test('validate customer gender: selected', async () => {
    wrapper = await factory();
    const formGroup = wrapper.findAll('.form-group').at(2);

    await formGroup.findAll('input').at(1).trigger('click');
    await flushPromises();
    expect(wrapper.vm.dataForm.sexCd).toBe('02');
    expect(formGroup.find('.input-radio-container__error').exists()).toBe(
      false
    );
  });

  test('validate addressZip: valid', async () => {
    wrapper = await factory();
    let addressZipInput = wrapper.find('input[name="addressZip"]');

    let error = wrapper.find('.base-input__error');
    expect(error.exists()).toBe(false);

    await addressZipInput.setValue('1235678');
    await wrapper.vm.$validator.validate();

    expect(
      wrapper.findAll('.form-group').at(4).find('.base-input__error').exists()
    ).toBe(false);
  });

  test('validate addressZip: invalid', async () => {
    wrapper = await factory();
    let addressZipInput = wrapper.find('input[name="addressZip"]');

    let error = wrapper.find('.base-input__error');
    expect(error.exists()).toBe(false);

    await addressZipInput.setValue('');
    await wrapper.vm.$validator.validate();

    expect(
      wrapper.findAll('.form-group').at(4).find('.base-input__error').exists()
    ).toBe(true);
  });

  test('Test nextStep', async () => {
    let spySubmit = jest.spyOn(Step4.methods, 'nextStep');
    Date.now = jest.fn(() => new Date('2020-04-11T12:33:37.000Z'));

    $router = {
      ...$router,
      push: jest.fn(),
    };
    mutations = {
      setCustomerInfo: jest.fn(),
    };

    $route = {
      ...$route,
      hash: '#',
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          mutations,
        },
      },
    });
    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $router,
        $route,
      },
    });
    await wrapper.setData({
      dataForm: {
        lastnameKanji: '名前',
        firstnameKanji: '名前',
        lastnameKana: 'カナ',
        firstnameKana: 'カナ',
        sexCd: '01',
        birthday: '1986/01/01',
        addressZip: '1000005',
        telephone: '0976872921',
      },
      txtRequiredCheckAge: '',
    });

    await wrapper.vm.nextStep();
    await flushPromises();

    expect(spySubmit.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/solicitation/step4/confirm/');
  });

  test('Test nextStep with #edit', async () => {
    let spySubmit = jest.spyOn(Step4.methods, 'nextStep');

    $router = {
      ...$router,
      push: jest.fn(),
    };
    mutations = {
      setCustomerInfo: jest.fn(),
    };

    $route = {
      ...$route,
      hash: '#edit',
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          mutations,
        },
      },
    });
    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $router,
        $route,
      },
    });
    await wrapper.setData({
      dataForm: {
        lastnameKanji: '名前',
        firstnameKanji: '名前',
        lastnameKana: 'カナ',
        firstnameKana: 'カナ',
        sexCd: '01',
        birthday: '1986/01/01',
        addressZip: '1000005',
        telephone: '0976872921',
      },
      txtRequiredCheckAge: '',
    });

    await wrapper.vm.nextStep();
    await flushPromises();

    expect(spySubmit.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/solicitation/confirm/');
  });

  test('Test preventNav when edit', async () => {
    const spyPreventNav = jest.spyOn(Step4.methods, 'preventNav');
    wrapper = await factory();
    const spy = jest.spyOn(wrapper.vm.$helpers, 'setDataFromVuexToLocal');

    await window.dispatchEvent(new Event('pagehide'));

    expect(spyPreventNav.mock.calls.length).toBe(1);
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0]).toEqual(
      expect.arrayContaining(['petInfo', 'productCd', 'customerInfo'])
    );
  });

  // test('Test handleBack with send_from_mail is false', async () => {
  //   $route = {
  //     ...$route,
  //     hash: '',
  //   };

  //   let spyHandleBack = jest.spyOn(Step4.methods, 'handleBack');
  //   wrapper = await factory({
  //     mocks: {
  //       $helpers,
  //       $router,
  //       $route,
  //     },
  //   });

  //   await wrapper.setData({
  //     sendFromMail: false
  //   });

  //   await wrapper.findComponent(ButtonBack).trigger('click');
  //   await flushPromises();
  //   expect(spyHandleBack.mock.calls.length).toBe(1);
  //   expect($router.push.mock.calls.length).toBe(1);
  //   expect($router.push.mock.calls[0][0]).toBe('/solicitation/step2/');
  // });

  // test('Test handleBack with #edit', async () => {
  //   $route = {
  //     ...$route,
  //     hash: '#edit',
  //   };

  //   let spyHandleBack = jest.spyOn(Step4.methods, 'handleBack');
  //   wrapper = await factory({
  //     mocks: {
  //       $helpers,
  //       $router,
  //       $route,
  //     },
  //   });

  //   await wrapper.setData({
  //     sendFromMail: false
  //   });

  //   await wrapper.findComponent(ButtonBack).trigger('click');
  //   await flushPromises();
  //   expect(spyHandleBack.mock.calls.length).toBe(1);
  //   expect($router.push.mock.calls.length).toBe(1);
  //   expect($router.push.mock.calls[0][0]).toBe('/solicitation/confirm/');
  // });
});
