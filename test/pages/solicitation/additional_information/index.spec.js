import { shallowMount, config, createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import * as _ from 'lodash';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';

import listProductInfo from '@/test/data/listProductInfo.js';
import petInfo from '@/test/data/petInfo';

import AdditionalInfoIndex from '@/pages/solicitation/additional_information';
import BaseInputCheckbox from '@/components/formItems/BaseInputCheckbox';
import BaseCheckBoxList from '@/components/formItems/BaseCheckBoxList';
import BaseButton from '@/components/formItems/BaseButton';
import BaseLabel from '@/components/formItems/BaseLabel';
import BaseLabelTooltip from '@/components/formItems/BaseLabelTooltip';
import PageTitle from '@/components/PageTitle.vue';
import moment from 'moment';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VBTogglePlugin);
localVue.use(CollapsePlugin);
window._ = _;

Object.defineProperty(localVue.prototype, '_', { value: _ });
let $helpers = {
  setDataFromLocalToVuex: () => {},
  setDataFromVuexToLocal: (event) => {},
  getCurrentTimeFromServer: () => {
    return new Promise((resolve) => {
      resolve(moment().subtract(10, 'day'));
    });
  },
};

let $store = {
  dispatch: () => {},
  commit: () => {},
  state: {
    contracts: {
      // petInfo: {},
      // listProductInfo: [],
      petInfo,
      listProductInfo,
    },
  },
};

let $router = {
  push: () => {},
};

let $route = {
  hash: '',
};

config.mocks.$t = (key) => key;

describe('additional_information', () => {
  let wrapper;
  process.env.BOOTSTRAP_VUE_NO_WARN = true;

  beforeEach(() => {
    wrapper = factory();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  const spy = jest.spyOn(AdditionalInfoIndex.methods, 'handleNextStep');

  const factory = (options) =>
    mount(AdditionalInfoIndex, {
      localVue,
      stubs: {
        BaseInputCheckbox,
        BaseCheckBoxList,
        PageTitle,
        BaseButton,
        BaseLabel,
        BaseLabelTooltip,
      },
      mocks: {
        $helpers,
        $store,
        $router,
      },
      computed: {
        petInfo: () => petInfo,
        listProductInfo: () => listProductInfo,
      },
      ...options,
    });

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

    await AdditionalInfoIndex.asyncData({
      store: $store,
    });

    expect(wrapper.vm).toBeTruthy();
  });

  test('getDiseaseOption is fail', () => {
    localStorage.setItem('disease_option', JSON.stringify(false));

    wrapper = factory();
  });

  test('getPetInfo', () => {
    localStorage.setItem('contract_refresh', JSON.stringify(petInfo));

    wrapper = factory();
  });

  test('notCheck is false - diseaseList.length != 0', () => {
    wrapper.vm.diseaseList = ['abc'];
    wrapper.vm.btnActive = true;

    wrapper = factory();
  });

  test('notCheck is true - diseaseList.length == 0', () => {
    wrapper.vm.btnActive = true;

    wrapper = factory();
  });

  test('Test click button', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $router,
        $route,
        $helpers,
        $store,
      },
    });

    wrapper.vm.diseaseList = ['abc'];
    wrapper.vm.btnActive = true;

    const checkBox = wrapper.find('.input-checkbox__checkmark');
    await checkBox.trigger('click');

    const button = wrapper.find('.illness-history__button button');
    expect(button.exists()).toBe(true);

    // wrapper.vm.$router = $router;
    await button.trigger('click');
    expect($router.push).toHaveBeenCalledWith(
      '/solicitation/additional_information/confirm/'
    );
  });
});

describe('Des - showPetBreed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = factory();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  const factory = (options) =>
    shallowMount(AdditionalInfoIndex, {
      localVue,
      stubs: {
        BaseInputCheckbox,
        BaseCheckBoxList,
        PageTitle,
        BaseButton,
        BaseLabel,
        BaseLabelTooltip,
      },
      mocks: {
        $helpers,
        $store,
        $router,
      },
      computed: {
        petInfo: () => {
          return {
            ...petInfo,
            petBreed: '004',
            petName: 'petName',
          };
        },
        listProductInfo: () => listProductInfo,
      },
      ...options,
    });

  test('show petBreed', async () => {
    wrapper = factory();
  });

  test('currentDate is expired', async () => {
    const d = new Date();
    localStorage.setItem('time_send_mail_confirm', d.toUTCString());
    $helpers.getCurrentTimeFromServer = () => {
      return new Promise((resolve) => {
        resolve(moment().subtract(10, 'day'));
      });
    };
    wrapper = factory();
  });
});

describe('Des - MapState', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = factory();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  const factory = (options) =>
    shallowMount(AdditionalInfoIndex, {
      localVue,
      stubs: {
        BaseInputCheckbox,
        BaseCheckBoxList,
        PageTitle,
        BaseButton,
        BaseLabel,
        BaseLabelTooltip,
      },
      mocks: {
        $helpers,
        $store,
        $router,
      },
    });

  test('mapState', async () => {
    $store = {
      dispatch: () => {},
      commit: () => {},
      state: {
        contracts: {
          petInfo,
          listProductInfo,
        },
      },
    };

    wrapper = factory();
  });
});
