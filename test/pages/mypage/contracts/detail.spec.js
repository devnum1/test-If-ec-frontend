// 01EZTX9M3AWK0ZB16B6KYR56F1

import { mount, config, createLocalVue } from '@vue/test-utils';
import filters from '@/plugins/filters.js';
import Vuex from 'vuex';
import Header from '@/components/Header.vue';
import InfoBox from '@/components/cards/InfoBox.vue';
import BaseButton from '@/components/formItems/BaseButton';
import ButtonBack from '@/components/formItems/ButtonBack';
import VueRouter from 'vue-router';
import ContractDetail from '@/pages/mypage/contracts/detail.vue';
import VueMask from 'v-mask';
import listContractInfo from '@/test/data/contractInfo.js';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';
const localVue = createLocalVue();
localVue.filter('filters', filters);
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(VueMask);

window._ = _;

Object.defineProperty(localVue.prototype, '_', { value: _ });

config.mocks.$t = (key) => key;

const router = new VueRouter({});

const contractId = {
  policyNo: 'PPR00000831100',
  subscriberNo: '0000000000',
};

const $helpers = {
  getUserId: () => {},
  getContractStatus: () => {},
};

describe('ContractDetail', () => {
  let wrapper;
  let actions, mutations, store;
  mutations = {
    setContractInfo: jest.fn(),
    setContractId: jest.fn(),
  };

  actions = {
    contractInfo: jest.fn(),
  };

  store = new Vuex.Store({
    modules: {
      contracts: {
        namespaced: true,
        state: {
          listContractInfo,
          contractId,
        },
        actions,
        mutations,
      },
    },
  });

  const factory = (options) =>
    mount(ContractDetail, {
      localVue,
      store,
      stubs: {
        Header,
        InfoBox,
        BaseButton,
        ButtonBack,
      },
      mocks: {
        $helpers,
      },
      router,
      ...options,
    });

  afterEach(async () => {
    await wrapper.destroy();
    await jest.clearAllMocks();
  });

  test('is a Vue instance', async () => {
    wrapper = await factory({
      store,
      router,
      mocks: {
        $helpers,
      },
    });

    expect(wrapper.vm).toBeTruthy();
  });

  test('Special dog: Show Pet Breed Dog and Pet Weight', async () => {
    let dataInfo = [
      {
        title: 'common.owner.name',
        text: 'うちの子',
      },
      {
        title: 'common.pet.pet_type',
        text: 'common.pet.dog',
      },
      {
        title: 'contract_pet.pet_contract_type',
        text: 'その他犬種',
      },
      {
        title: 'common.weight',
        text: '10.0kg',
      },
      {
        title: 'common.gender.gender_title',
        text: '男の子',
      },
      {
        title: 'common.contraception_status.title',
        text: 'あり',
      },
      {
        title: 'common.dob.title',
        text: '2020/02 (確定)',
      },
    ];

    (mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    }),
      (actions = {
        contractInfo: jest.fn(),
      });

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listContractInfo,
            contractId,
          },
          actions,
          mutations,
        },
      },
    });
    wrapper = await factory({
      store,
      router,
      mocks: {
        $helpers,
      },
    });

    await flushPromises();

    expect(wrapper.vm.dataInfo).toEqual(dataInfo);
  });

  test('Ordinary dog: Show Pet Breed Dog and No Pet Weight', async () => {
    let dataInfo = [
      {
        title: 'common.owner.name',
        text: 'うちの子',
      },
      {
        title: 'common.pet.pet_type',
        text: 'common.pet.dog',
      },
      {
        title: 'contract_pet.pet_contract_type',
        text: 'その他犬種',
      },
      {
        title: 'common.gender.gender_title',
        text: '男の子',
      },
      {
        title: 'common.contraception_status.title',
        text: 'あり',
      },
      {
        title: 'common.dob.title',
        text: '2020/02 (確定)',
      },
    ];

    let contract = _.cloneDeep(listContractInfo);
    contract.contractInfo[0].insCoverageInfo[0].insTargetProperty.petBreed.propVal =
      '10';

    (mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    }),
      (actions = {
        contractInfo: jest.fn(),
      });

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listContractInfo: contract,
            contractId,
          },
          actions,
          mutations,
        },
      },
    });
    wrapper = await factory({
      store,
      router,
      mocks: {
        $helpers,
      },
    });

    await flushPromises();
    expect(wrapper.vm.dataInfo).toEqual(dataInfo);
  });

  test('Show Cat: Type and weight are not displayed', async () => {
    let dataInfo = [
      {
        title: 'common.owner.name',
        text: 'うちの子',
      },
      {
        title: 'common.pet.pet_type',
        text: 'common.pet.cat',
      },
      {
        title: 'common.gender.gender_title',
        text: '男の子',
      },
      {
        title: 'common.contraception_status.title',
        text: 'あり',
      },
      {
        title: 'common.dob.title',
        text: '2020/02 (確定)',
      },
    ];

    let contract = _.cloneDeep(listContractInfo);

    contract.contractInfo[0].insCoverageInfo[0].insTargetProperty.petType.propVal =
      '02';

    (mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    }),
      (actions = {
        contractInfo: jest.fn(),
      });

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listContractInfo: contract,
            contractId,
          },
          actions,
          mutations,
        },
      },
    });
    wrapper = await factory({
      store,
      router,
      mocks: {
        $helpers,
      },
    });

    await flushPromises();
    expect(wrapper.vm.dataInfo).toEqual(dataInfo);
  });

  test('Test preventNav', async () => {
    const spyPreventNav = jest.spyOn(ContractDetail.methods, 'preventNav');
    wrapper = await factory();
    await window.dispatchEvent(new Event('pagehide'));
    expect(spyPreventNav.mock.calls.length).toBe(1);
  });

  test('Test Commit ContractId', async () => {
    localStorage.setItem('contractId_refresh', JSON.stringify(contractId));
    (mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    }),
      (actions = {
        contractInfo: jest.fn(),
      });

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listContractInfo,
          },
          actions,
          mutations,
        },
      },
    });
    wrapper = await factory({
      store,
      router,
      mocks: {
        $helpers,
      },
      computed: {
        contractId: () => {},
      },
    });

    wrapper = await factory();
    await flushPromises();
    expect(mutations.setContractId).toHaveBeenCalled();
    localStorage.clear();
  });
});
