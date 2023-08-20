// 01EZTX9M3AWK0ZB16B6KYR56F1

import { mount, config, createLocalVue, RouterLinkStub } from '@vue/test-utils';

import Vuex from 'vuex';
import * as _ from 'lodash';
import filters from '@/plugins/filters.js';
import flushPromises from 'flush-promises';
import moment from 'moment';

import Confirm from '@/pages/solicitation/confirm.vue';
import BaseButton from '@/components/formItems/BaseButton';
import PageTitle from '@/components/PageTitle.vue';
import StepProgress from '@/components/stepProgress/stepProgress';
import SelectedInsuranceCard from '@/components/cards/SelectedInsuranceCard.vue';

import contract from '@/constants/contract';

import listProductInfo from '@/test/data/listProductInfo.js';
import petInfoData from '@/test/data/petInfoData';
import premiumCalculation from '@/test/data/premiumCalculation';
import newContract from '@/test/data/newContract';
import customerData from '@/test/data/customerData';
import examination01 from '@/test/data/examination-01';

config.mocks.$t = (key) => key;
window._ = _;
const localVue = createLocalVue();
localVue.filter('filters', filters);
localVue.use(Vuex);

Object.defineProperty(localVue.prototype, '_', { value: _ });

let $router = {
  push: () => {},
};

let $helpers = {
  setDataFromLocalToVuex: () => {},
  setDataFromVuexToLocal: (event) => {},
  getLastAuthUser: () => {},
  getUserId: () => {},
  getAccessToken: () => jest.fn(),
  getCurrentTimeFromServer: () => {
    return new Promise((resolve) => {
      resolve(moment().subtract(10, 'day'));
    });
  },
};

const $cookies = {
  get: () => {},
  set: () => {},
  remove: () => {},
};

describe('confirm', () => {
  let wrapper;
  let actions, mutations, store;

  actions = {
    customerInfo: jest.fn().mockReturnValue(customerData),
    premiumCalculation: jest.fn().mockReturnValue(premiumCalculation),
    productInfo: jest.fn(),
  };

  store = new Vuex.Store({
    modules: {
      contracts: {
        namespaced: true,
        actions,
      },
    },
  });

  const factory = (options) =>
    mount(Confirm, {
      localVue,
      store,
      stubs: {
        PageTitle,
        BaseButton,
        StepProgress,
        SelectedInsuranceCard,
        NuxtLink: RouterLinkStub,
      },
      mocks: {
        $helpers,
        $cookies,
      },
      computed: {
        petInfo: () => petInfoData,
        listProductInfo: () => listProductInfo,
        repProductCd: () => {},
        customerInfo: () => customerData,
        contractDuplicate: () => {},
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
      computed: {
        listProductInfo: () => listProductInfo,
        customerInfo: () => null,
        petInfo: () => petInfoData,
      },
    });
    await Confirm.asyncData({
      store,
    });

    expect(wrapper.vm).toBeTruthy();
  });

  test('test preventNav', async () => {
    let spyPreventNav = jest.spyOn(Confirm.methods, 'preventNav');
    wrapper = await factory();

    let spy = jest.spyOn(wrapper.vm.$helpers, 'setDataFromVuexToLocal');

    await window.dispatchEvent(new Event('pagehide'));

    expect(spyPreventNav.mock.calls.length).toBe(1);
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0]).toEqual(expect.arrayContaining(['petInfo']));
  });

  test('test handle confirm registration', async () => {
    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          actions,
        },
      },
    });

    $router = {
      ...$router,
      push: jest.fn(),
    };
    let spyConfirm = jest.spyOn(Confirm.methods, 'handleConfirmRegistration');

    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $router,
      },
    });

    await flushPromises();
    await wrapper.findAllComponents(BaseButton).at(0).trigger('click');

    expect(spyConfirm.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/solicitation/landing/');
  });

  test('test handle confirm registration with noticeCd02 and payment new', async () => {
    let _petInfoData = _.cloneDeep(petInfoData);
    _petInfoData.petType = '01';
    _petInfoData.petBreed = '001';
    _petInfoData.petWeight = '1.1';
    let productInfo02 = _.cloneDeep(listProductInfo);

    _petInfoData.noticeCd02 =
      productInfo02.noticeInfo[1].noticeContent.selection[2].id = '02';

    mutations = {
      setContractId: jest.fn(),
    };

    actions = {
      ...actions,
      newContract: jest.fn().mockReturnValue(newContract),
      examination: jest.fn().mockReturnValue(examination01),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            newContract: newContract,
          },
          mutations,
          actions,
        },
        mail: {
          namespaced: true,
          actions,
        },
      },
    });

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $router,
        $cookies,
      },
      computed: {
        petInfo: () => _petInfoData,
        listProductInfo: () => productInfo02,
        repProductCd: () => {},
        customerInfo: () => customerData,
        contractDuplicate: () => {},
      },
    });

    await wrapper.setData({
      isActiveBtn: false,
      dataCustomerInfo: {
        lastnameKanji: '保険',
        firstnameKanji: '太郎',
        lastnameKana: 'ホケン',
        firstnameKana: 'タロウ',
        sexCd: '02',
        birthday: '1998/04/01',
      },
    });

    await wrapper.vm.handleConfirmRegistration();
    await flushPromises();

    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe(
      '/solicitation/contracts/payment/new/'
    );
  });

  test('test handle confirm registration with noticeCd02 and approvalSystemJadge = 01', async () => {
    let dataContract02 = _.cloneDeep(petInfoData);
    let productInfo02 = _.cloneDeep(listProductInfo);

    dataContract02.noticeCd02 =
      productInfo02.noticeInfo[1].noticeContent.selection[2].id = '02';

    mutations = {
      setContractId: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            newContract: newContract,
          },
          mutations,
          actions,
        },
        mail: {
          namespaced: true,
          actions,
        },
      },
    });

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $router,
        $cookies,
      },
      computed: {
        petInfo: () => dataContract02,
        listProductInfo: () => productInfo02,
        repProductCd: () => {},
        customerInfo: () => customerData,
        contractDuplicate: () => {},
      },
    });

    await wrapper.setData({
      isActiveBtn: false,
      dataCustomerInfo: {
        lastnameKanji: '保険',
        firstnameKanji: '太郎',
        lastnameKana: 'ホケン',
        firstnameKana: 'タロウ',
        sexCd: '01',
        birthday: '1998/04/01',
      },
    });

    await wrapper.vm.handleConfirmRegistration();
    await flushPromises();

    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe(
      '/solicitation/contracts/payment/new/'
    );
  });

  test('test handle confirm registration with noticeCd02 and approvalSystemJadge != 01', async () => {
    let dataContract02 = _.cloneDeep(petInfoData);
    let productInfo02 = _.cloneDeep(listProductInfo);

    dataContract02.noticeCd02 =
      productInfo02.noticeInfo[1].noticeContent.selection[2].id = '02';
    let newContract01 = _.cloneDeep(newContract);
    newContract01.checkResult[0].approvalSystemJadge = '02';

    mutations = {
      setContractId: jest.fn(),
    };
    actions = {
      ...actions,
      newContract: jest.fn().mockReturnValue(newContract01),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          mutations,
          actions,
        },
        mail: {
          namespaced: true,
          actions,
        },
      },
    });

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $router,
        $cookies,
      },
      computed: {
        petInfo: () => dataContract02,
        listProductInfo: () => productInfo02,
        repProductCd: () => {},
        customerInfo: () => customerData,
        contractDuplicate: () => customerData,
      },
    });

    await wrapper.setData({
      isActiveBtn: false,
      dataCustomerInfo: {
        lastnameKanji: '保険',
        firstnameKanji: '太郎',
        lastnameKana: 'ホケン',
        firstnameKana: 'タロウ',
        sexCd: '01',
        birthday: '1998/04/01',
      },
    });

    await wrapper.vm.handleConfirmRegistration();
    await flushPromises();

    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe(
      '/solicitation/contracts/assessment/'
    );
  });
});
