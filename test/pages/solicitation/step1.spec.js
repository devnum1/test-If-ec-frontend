import { mount, config, createLocalVue } from '@vue/test-utils';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import VueMask from 'v-mask';
import Vuex from 'vuex';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';

import Step1 from '@/pages/solicitation/step1.vue';
import BaseButton from '@/components/formItems/BaseButton';
import PageTitle from '@/components/PageTitle.vue';
import BaseNotice from '@/components/formItems/BaseNotice';
import BaseLabel from '@/components/formItems/BaseLabel';
import BaseInput from '@/components/formItems/BaseInput';
import BaseSelect from '@/components/formItems/BaseSelect';
import InfoBox from '@/components/cards/InfoBox';
import BaseLabelTooltip from '@/components/formItems/BaseLabelTooltip';
import BaseInputRadio from '@/components/formItems/BaseInputRadio';
import BaseCheckBoxList from '@/components/formItems/BaseCheckBoxList';
import BaseInputRadioContainer from '@/components/formItems/BaseInputRadioContainer';
import StepProgress from '@/components/stepProgress/stepProgress';

import contract from '@/constants/contract';

import listProductInfo from '@/test/data/listProductInfo.js';
import petInfo from '@/test/data/petInfo';
import sample from '@/test/data/sample';
import examination01 from '@/test/data/examination-01';

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

const $cookies = {
  get: () => {},
  set: () => {},
  remove: () => {},
};

let $route = {
  hash: '',
};

let $helpers = {
  setDataFromLocalToVuex: () => {},
  setDataFromVuexToLocal: (event) => {},
};

let $store = {
  dispatch: () => {},
  state: {
    contracts: {},
  },
  commit: () => {},
};

describe('step1', () => {
  let wrapper;
  let actions, mutations, store;

  const factory = (options) =>
    mount(Step1, {
      localVue,
      stubs: {
        PageTitle,
        BaseButton,
        InfoBox,
        StepProgress,
        BaseNotice,
        BaseLabel,
        BaseInput,
        BaseSelect,
        BaseLabelTooltip,
        BaseInputRadio,
        BaseCheckBoxList,
        BaseInputRadioContainer,
      },
      mocks: {
        $helpers,
        $store,
        $route,
        $cookies,
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

  test('is a Vue instance', async () => {
    const dispatchSpy = jest.fn();
    const $store = {
      dispatch: dispatchSpy,
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $store,
        $route,
        $cookies,
      },
    });
    await Step1.asyncData({
      store: $store,
    });

    expect(wrapper.vm).toBeTruthy();
    expect(dispatchSpy.mock.calls.length).toBe(1);
  });

  test('validate pet name: valid', async () => {
    wrapper = await factory();
    const petNameInput = wrapper.find('input[name="petName"]');

    let error = wrapper.find('.base-input__error');
    expect(error.exists()).toBe(false);

    const validValues = [
      sample.kanji,
      sample.katakana,
      sample.hiragana,
      sample.mixed_25_chars,
    ];

    for (let value of validValues) {
      await petNameInput.setValue(value);
      expect(wrapper.find('input[name="petName"]').element.value).toBe(value);
      await wrapper.vm.$validator.validate();

      expect(
        wrapper.findAll('.form-group').at(0).find('.base-input__error').exists()
      ).toBe(false);
    }
  });

  test('validate pet name: invalid', async () => {
    wrapper = await factory();
    const petNameInput = wrapper.find('input[name="petName"]');

    let error = wrapper.find('.base-input__error');
    expect(error.exists()).toBe(false);

    const invalidValues = [
      sample.empty,
      sample.number,
      sample.latin_chars,
      sample.mixed_26_chars,
    ];

    for (let value of invalidValues) {
      await petNameInput.setValue(value);
      expect(
        wrapper.findAll('.form-group').at(0).find('input').element.value
      ).toBe(value);
      await wrapper.vm.$validator.validate();

      expect(
        wrapper.findAll('.form-group').at(0).find('.base-input__error').exists()
      ).toBe(true);
    }
  });

  test('validate pet type: init', async () => {
    wrapper = await factory();
    let error = wrapper.find('.input-radio-container__error');

    expect(error.exists()).toBe(false);
    expect(wrapper.vm.dataForm.petType).toBe(null);
  });

  test('validate pet type: submit', async () => {
    const spySubmit = jest.spyOn(Step1.methods, 'nextStep');
    wrapper = await factory();

    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();
    expect(spySubmit.mock.calls.length).toBe(1);
    expect(
      wrapper
        .findAll('.form-group')
        .at(1)
        .find('.input-radio-container__error')
        .exists()
    ).toBe(true);
  });

  test('validate pet type: selected', async () => {
    wrapper = await factory();
    const formGroup = wrapper.findAll('.form-group').at(1);

    await formGroup.findAll('input').at(1).trigger('click');
    await flushPromises();
    expect(wrapper.vm.dataForm.petType).toBe('02');
    expect(formGroup.find('.input-radio-container__error').exists()).toBe(
      false
    );
  });

  test('validate pet type: dog selected', async () => {
    wrapper = await factory();
    const formGroup = wrapper.findAll('.form-group').at(1);

    await formGroup.findAll('input').at(0).trigger('click');
    await flushPromises();
    expect(wrapper.vm.dataForm.petType).toBe('01');
    expect(formGroup.find('.input-radio-container__error').exists()).toBe(
      false
    );

    const dogBreedFormGroup = wrapper.findAll('.form-group').at(2);
    const dogBreedSelect = dogBreedFormGroup.find('.base-select');
    expect(dogBreedFormGroup.exists()).toBeTruthy();
    expect(dogBreedSelect.exists()).toBeTruthy();

    const dogWeightFormGroup = wrapper.findAll('.form-group').at(3);
    const dogWeightInput = dogWeightFormGroup.find('input[name="petWeight"]');
    expect(dogWeightFormGroup.exists()).toBeTruthy();
    expect(dogWeightInput.exists()).toBeFalsy();
  });

  test('validate pet type: dog breed select', async () => {
    wrapper = await factory();
    const formGroup = wrapper.findAll('.form-group').at(1);

    await formGroup.findAll('input').at(0).trigger('click');
    await flushPromises();
    expect(wrapper.vm.dataForm.petType).toBe('01');
    expect(formGroup.find('.input-radio-container__error').exists()).toBe(
      false
    );

    const dogBreedFormGroup = wrapper.findAll('.form-group').at(2);
    const dogBreedSelect = dogBreedFormGroup.find('.base-select');
    expect(dogBreedFormGroup.exists()).toBeTruthy();
    expect(dogBreedSelect.exists()).toBeTruthy();

    const dogWeightFormGroup = wrapper.findAll('.form-group').at(3);
    const dogWeightInput = dogWeightFormGroup.find('input[name="petWeight"]');
    expect(dogWeightFormGroup.exists()).toBeTruthy();
    expect(dogWeightInput.exists()).toBeFalsy();
  });

  test('validate pet type: dog selected without weight', async () => {
    wrapper = await factory();
    const formGroup = wrapper.findAll('.form-group').at(1);

    await formGroup.findAll('input').at(0).trigger('click');
    await flushPromises();

    const dogBreedFormGroup = wrapper.findAll('.form-group').at(2);
    const selectItems = dogBreedFormGroup.findAll('.multiselect__option');
    await selectItems.at(5).trigger('click');
    await flushPromises();

    const dogWeightFormGroup = wrapper.findAll('.form-group').at(3);
    const dogWeightInput = dogWeightFormGroup.find('input[name="petWeight"]');
    expect(dogWeightFormGroup.exists()).toBeTruthy();
    expect(dogWeightInput.exists()).toBeFalsy();
  });

  test('validate pet type: dog selected with weight', async () => {
    wrapper = await factory();
    const formGroup = wrapper.findAll('.form-group').at(1);

    await formGroup.findAll('input').at(0).trigger('click');
    await flushPromises();

    const dogBreedFormGroup = wrapper.findAll('.form-group').at(2);
    const selectItems = dogBreedFormGroup.findAll('.multiselect__option');
    await selectItems.at(0).trigger('click');
    await flushPromises();

    const dogWeightFormGroup = wrapper.findAll('.form-group').at(3);
    const dogWeightInput = dogWeightFormGroup.find('input[name="petWeight"]');
    expect(dogWeightFormGroup.exists()).toBeTruthy();
    expect(dogWeightInput.exists()).toBeTruthy();
  });

  test('validate pet type: dog selected with weight: validate weight', async () => {
    wrapper = await factory();
    const formGroup = wrapper.findAll('.form-group').at(1);

    await formGroup.findAll('input').at(0).trigger('click');
    await flushPromises();

    const dogBreedFormGroup = wrapper.findAll('.form-group').at(2);
    const selectItems = dogBreedFormGroup.findAll('.multiselect__option');
    await selectItems.at(0).trigger('click');
    await flushPromises();

    const dogWeightFormGroup = wrapper.findAll('.form-group').at(3);
    const dogWeightInput = dogWeightFormGroup.find('input[name="petWeight"]');
    expect(dogWeightFormGroup.find('.base-input__error').exists()).toBeFalsy();

    const validValues = ['1', '1.1'];

    for (let value of validValues) {
      await dogWeightInput.setValue(value);
      expect(
        dogWeightFormGroup.find('input[name="petWeight"]').element.value
      ).toBe(value);
      await wrapper.vm.$validator.validate();

      expect(
        dogWeightFormGroup.find('.base-input__error').exists()
      ).toBeFalsy();
    }

    const inValidValues = ['a', '1.1.1', '１'];

    for (let value of inValidValues) {
      await dogWeightInput.setValue(value);
      expect(
        dogWeightFormGroup.find('input[name="petWeight"]').element.value
      ).toBe(value);
      await wrapper.vm.$validator.validate();

      expect(
        dogWeightFormGroup.find('.base-input__error').exists()
      ).toBeTruthy();
    }
  });

  test('validate pet gender: init', async () => {
    wrapper = await factory();
    let error = wrapper.find('.input-radio-container__error');

    expect(error.exists()).toBe(false);
    expect(wrapper.vm.dataForm.petSexCd).toBe(null);
  });

  test('validate pet gender: submit', async () => {
    const spySubmit = jest.spyOn(Step1.methods, 'nextStep');
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

  test('validate pet gender: selected', async () => {
    wrapper = await factory();
    const formGroup = wrapper.findAll('.form-group').at(2);

    await formGroup.findAll('input').at(1).trigger('click');
    await flushPromises();
    expect(wrapper.vm.dataForm.petSexCd).toBe('02');
    expect(formGroup.find('.input-radio-container__error').exists()).toBe(
      false
    );
  });

  test('validate pet castration/contraception: init', async () => {
    wrapper = await factory();
    let error = wrapper.find('.input-radio-container__error');

    expect(error.exists()).toBe(false);
    expect(wrapper.vm.dataForm.noticeCd01).toBe(null);
  });

  test('validate pet castration/contraception: submit', async () => {
    const spySubmit = jest.spyOn(Step1.methods, 'nextStep');
    wrapper = await factory();
    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();
    expect(spySubmit.mock.calls.length).toBe(1);
    expect(
      wrapper
        .findAll('.form-group')
        .at(3)
        .find('.input-radio-container__error')
        .exists()
    ).toBe(true);
  });

  test('validate pet castration/contraception: selected', async () => {
    wrapper = await factory();
    const formGroup = wrapper.findAll('.form-group').at(3);

    await formGroup.findAll('input').at(0).trigger('click');
    await flushPromises();
    expect(wrapper.vm.dataForm.noticeCd01).toBe('01');
    expect(formGroup.find('.input-radio-container__error').exists()).toBe(
      false
    );
  });

  test('validate pet disease: init', async () => {
    wrapper = await factory();
    let error = wrapper.find('.input-radio-container__error');

    expect(error.exists()).toBe(false);
    expect(wrapper.vm.dataForm.noticeCd02).toBe(null);
  });

  test('validate pet disease: submit', async () => {
    const spySubmit = jest.spyOn(Step1.methods, 'nextStep');
    wrapper = await factory();
    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();
    expect(spySubmit.mock.calls.length).toBe(1);
    expect(
      wrapper
        .findAll('.form-group')
        .at(7)
        .find('.input-radio-container__error')
        .exists()
    ).toBe(true);
  });

  test('validate pet disease: selected', async () => {
    wrapper = await factory();
    const formGroup = wrapper.findAll('.form-group').at(7);

    await formGroup.findAll('input').at(2).trigger('click');
    await flushPromises();
    expect(wrapper.vm.dataForm.noticeCd02).toBe('02');
    expect(formGroup.find('.input-radio-container__error').exists()).toBe(
      false
    );
  });

  test('validate pet insurance join flag: init', async () => {
    wrapper = await factory();
    let error = wrapper.find('.input-radio-container__error');

    expect(error.exists()).toBe(false);
    expect(wrapper.vm.dataForm.petInsJoinFlg).toBe(null);
  });

  test('validate pet insurance join flag: submit', async () => {
    const spySubmit = jest.spyOn(Step1.methods, 'nextStep');
    wrapper = await factory();
    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();
    expect(spySubmit.mock.calls.length).toBe(1);
    expect(
      wrapper
        .findAll('.form-group')
        .at(9)
        .find('.input-radio-container__error')
        .exists()
    ).toBe(true);
  });

  test('validate pet insurance join flag: selected', async () => {
    wrapper = await factory();
    const formGroup = wrapper.findAll('.form-group').at(9);

    await formGroup.findAll('input').at(0).trigger('click');
    await flushPromises();
    expect(wrapper.vm.dataForm.petInsJoinFlg).toBe('01');
    expect(formGroup.find('.input-radio-container__error').exists()).toBe(
      false
    );
  });

  test('handle pet type', async () => {
    const spyChangePetType = jest.spyOn(Step1.methods, 'handleRadioPetType');

    wrapper = await factory({
      computed: {
        petInfo: () => {},
        listProductInfo: () => listProductInfo,
      },
    });

    const petNameInput = wrapper.find('input[name="petName"]');
    const petGenderSelect = wrapper.findAll('input[name="petSexCd"]');
    const formGroup = wrapper.findAll('.form-group').at(1);
    const dogTypeInput = formGroup.findAll('input').at(0);
    const catTypeInput = formGroup.findAll('input').at(1);

    expect(spyChangePetType.mock.calls.length).toBe(0);

    // click to select pet type: dog
    await petNameInput.setValue('花山川');
    await dogTypeInput.trigger('click');
    await petGenderSelect.at(1).trigger('click');
    await flushPromises();
    expect(spyChangePetType.mock.calls.length).toBe(1);
    expect(wrapper.vm.dataForm.petName).toBe('花山川');
    expect(wrapper.vm.dataForm.petSexCd).toBe('02');

    // test case not change
    await dogTypeInput.trigger('click');
    await flushPromises();
    expect(spyChangePetType.mock.calls.length).toBe(2);
    expect(wrapper.vm.dataForm.petName).toBe('花山川');
    expect(wrapper.vm.dataForm.petSexCd).toBe('02');

    // click to select pet type: cat
    await catTypeInput.trigger('click');
    await flushPromises();
    expect(spyChangePetType.mock.calls.length).toBe(3);
    expect(wrapper.vm.dataForm.petName).toBe('花山川');
    expect(wrapper.vm.dataForm.petSexCd).toBe(null);
  });

  test('Test beforeRouteLeave', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
        $cookies,
      },
    });

    const spySubmit = jest.spyOn(Step1, 'beforeRouteEnter');

    const next = jest.fn();
    const from = {
      name: 'solicitation-step2',
    };

    Step1.beforeRouteEnter.call(wrapper.vm, undefined, from, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
  });

  test('Test beforeRouteLeave', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    mutations = {
      setPetInfo: jest.fn(),
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
      mocks: {
        $helpers,
        $router,
        $cookies,
      },
      store,
    });

    const spySubmit = jest.spyOn(Step1, 'beforeRouteEnter');

    const from = {
      name: 'corporate',
    };

    Step1.beforeRouteEnter.call(wrapper.vm, undefined, from, (next) =>
      next(wrapper.vm)
    );

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
  });

  test('Test nextStep: under 30 days', async () => {
    const spySubmit = jest.spyOn(Step1.methods, 'nextStep');
    Date.now = jest.fn(() => new Date('2020-04-11T12:33:37.000Z'));

    $router = {
      ...$router,
      push: jest.fn(),
    };

    let examination = _.cloneDeep(examination01);
    examination.checkResult[0].approvalSystemJadge =
      contract.ng_type.CONTRACT_DENIAL;

    actions = {
      examination: jest.fn().mockReturnValueOnce(examination),
      premiumCalculation: jest.fn(),
    };

    mutations = {
      setNgType: jest.fn(),
      setPetInfo: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listProductInfo,
            petInfo,
          },
          actions,
          mutations,
        },
      },
    });

    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $route,
        $router,
        $cookies,
      },
    });
    await wrapper.setData({
      dataForm: {
        petName: '花山川',
        petType: '02',
        petBreed: null,
        petWeight: null,
        petSexCd: '02',
        noticeCd01: '02',
        petBirthdayDiv: '01',
        petBirthday: '2020/04',
        noticeCd02: '02',
        petInsJoinFlg: '02',
      },
    });

    await wrapper.vm.nextStep();
    await flushPromises();

    expect(spySubmit.mock.calls.length).toBe(1);
    expect(mutations.setPetInfo.mock.calls.length).toBe(1);
    expect(actions.examination.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe(
      '/solicitation/apologize/too_young/'
    );
  });

  test('Test nextStep: more than 9 years', async () => {
    const spySubmit = jest.spyOn(Step1.methods, 'nextStep');
    Date.now = jest.fn(() => new Date('2020-04-11T12:33:37.000Z'));

    $router = {
      ...$router,
      push: jest.fn(),
    };

    let examination = _.cloneDeep(examination01);
    examination.checkResult[0].approvalSystemJadge =
      contract.ng_type.CONTRACT_DENIAL;

    actions = {
      examination: jest.fn().mockReturnValueOnce(examination),
      premiumCalculation: jest.fn(),
    };

    mutations = {
      setNgType: jest.fn(),
      setPetInfo: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listProductInfo,
            petInfo,
          },
          actions,
          mutations,
        },
      },
    });

    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $route,
        $router,
        $cookies,
      },
    });
    await wrapper.setData({
      dataForm: {
        petName: '花山川',
        petType: '02',
        petBreed: null,
        petWeight: null,
        petSexCd: '02',
        noticeCd01: '02',
        petBirthdayDiv: '01',
        petBirthday: '2011/04',
        noticeCd02: '02',
        petInsJoinFlg: '02',
      },
    });

    await wrapper.vm.nextStep();
    await flushPromises();

    expect(spySubmit.mock.calls.length).toBe(1);
    expect(mutations.setPetInfo.mock.calls.length).toBe(1);
    expect(actions.examination.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe(
      '/solicitation/apologize/too_old/'
    );
  });

  test('Test nextStep: normal case cat', async () => {
    const spySubmit = jest.spyOn(Step1.methods, 'nextStep');
    Date.now = jest.fn(() => new Date('2020-05-11T12:33:37.000Z'));
    $router = {
      ...$router,
      push: jest.fn(),
    };

    actions = {
      examination: jest.fn().mockReturnValueOnce(examination01),
      premiumCalculation: jest.fn(),
    };

    mutations = {
      setNgType: jest.fn(),
      setPetInfo: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listProductInfo,
            petInfo,
          },
          actions,
          mutations,
        },
      },
    });

    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $route,
        $router,
        $cookies,
      },
    });
    await wrapper.setData({
      dataForm: {
        petName: '花山川',
        petType: '02',
        petBreed: null,
        petWeight: null,
        petSexCd: '02',
        noticeCd01: '02',
        petBirthdayDiv: '01',
        petBirthday: '2020/04',
        noticeCd02: '02',
        petInsJoinFlg: '02',
      },
    });

    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();

    expect(spySubmit.mock.calls.length).toBe(1);
    expect(mutations.setPetInfo.mock.calls.length).toBe(1);
    expect(actions.examination.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/solicitation/step2/');
  });

  test('Test nextStep: normal case with #edit', async () => {
    const spySubmit = jest.spyOn(Step1.methods, 'nextStep');
    Date.now = jest.fn(() => new Date('2020-05-11T12:33:37.000Z'));
    $router = {
      ...$router,
      push: jest.fn(),
    };

    $route = {
      ...$route,
      hash: '#edit',
    };

    actions = {
      examination: jest.fn().mockReturnValueOnce(examination01),
      premiumCalculation: jest.fn(),
    };

    mutations = {
      setNgType: jest.fn(),
      setPetInfo: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listProductInfo,
            petInfo,
            repProductCd: '10100001',
          },
          actions,
          mutations,
        },
      },
    });

    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $route,
        $router,
        $cookies,
      },
    });
    await wrapper.setData({
      dataForm: {
        petName: '花山川',
        petType: '02',
        petBreed: null,
        petWeight: null,
        petSexCd: '02',
        noticeCd01: '02',
        petBirthdayDiv: '01',
        petBirthday: '2020/04',
        noticeCd02: '02',
        petInsJoinFlg: '02',
      },
    });

    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();

    expect(spySubmit.mock.calls.length).toBe(1);
    expect(mutations.setPetInfo.mock.calls.length).toBe(1);
    expect(actions.examination.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/solicitation/confirm/');
  });

  test('Test nextStep: normal case dog with #edit', async () => {
    const spySubmit = jest.spyOn(Step1.methods, 'nextStep');
    Date.now = jest.fn(() => new Date('2020-05-11T12:33:37.000Z'));
    $router = {
      ...$router,
      push: jest.fn(),
    };

    $route = {
      ...$route,
      hash: '#edit',
    };

    actions = {
      examination: jest.fn().mockReturnValueOnce(examination01),
      premiumCalculation: jest.fn(),
    };

    mutations = {
      setNgType: jest.fn(),
      setPetInfo: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listProductInfo,
            petInfo,
            repProductCd: '10100001',
          },
          actions,
          mutations,
        },
      },
    });

    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $route,
        $router,
        $cookies,
      },
    });
    await wrapper.setData({
      dataForm: {
        petName: '花山川',
        petType: '01',
        petBreed: '01',
        petWeight: '1.3',
        petSexCd: '02',
        noticeCd01: '02',
        petBirthdayDiv: '01',
        petBirthday: '2020/04',
        noticeCd02: '02',
        petInsJoinFlg: '02',
      },
    });

    await wrapper.findComponent(BaseButton).trigger('click');
    await flushPromises();

    expect(spySubmit.mock.calls.length).toBe(1);
    expect(mutations.setPetInfo.mock.calls.length).toBe(1);
    expect(actions.examination.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/solicitation/confirm/');
  });

  test('test handle Pet Weight', async () => {
    wrapper = await factory();
    expect(wrapper.vm.handlePetWeight('1.1.1')).toBe('1.1.1');
    expect(wrapper.vm.handlePetWeight('a')).toBe('a');
    expect(wrapper.vm.handlePetWeight('1.11')).toBe('1.1');
  });

  test('Test preventNav', async () => {
    const spyPreventNav = jest.spyOn(Step1.methods, 'preventNav');
    wrapper = await factory();

    const spy = jest.spyOn(wrapper.vm.$helpers, 'setDataFromVuexToLocal');

    await window.dispatchEvent(new Event('pagehide'));

    expect(spyPreventNav.mock.calls.length).toBe(1);
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0]).toEqual(expect.arrayContaining(['petInfo']));
  });

  test('Test preventNav when edit', async () => {
    const spyPreventNav = jest.spyOn(Step1.methods, 'preventNav');

    wrapper = await factory({
      mocks: {
        $helpers,
        $store,
        $route: {
          hash: '#edit',
        },
        $cookies,
      },
    });

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
});
