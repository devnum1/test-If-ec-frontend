// 01EZTX9M3AWK0ZB16B6KYR56F1

import { mount, config, createLocalVue } from '@vue/test-utils';
import Header from '@/components/Header.vue';
import PetIdCard from '@/components/cards/PetIdCard.vue';
import Vuex from 'vuex';
import Contracts from '@/pages/mypage/contracts/index.vue';
import VueMask from 'v-mask';
import VueSlickCarousel from 'vue-slick-carousel';
import listContractInfo from '@/test/data/contractInfo.js';
import * as _ from 'lodash';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueMask);
Object.defineProperty(localVue.prototype, '_', { value: _ });

config.mocks.$t = (key) => key;

const app = {
  $helpers: {
    getUserId: () => {},
  },
};

let $router = {
  push: () => {},
};

let $helpers = {
  getContractStatus: () => {},
};

describe('Contracts', () => {
  let wrapper;
  let actions, mutations, store;

  $helpers = {
    ...$helpers,
    getContractStatus: jest
      .fn()
      .mockReturnValue(listContractInfo.contractInfo[0]),
  };
  mutations = {
    setContractInfo: jest.fn(),
    setContractId: jest.fn(),
  };

  actions = {
    contractInfo: jest.fn(),
    uploadPhotoPet: jest.fn(),
    s3download: jest.fn().mockReturnValue({ data: null }),
  };

  store = new Vuex.Store({
    modules: {
      contracts: {
        namespaced: true,
        state: {
          listContractInfo: listContractInfo,
        },
        actions,
        mutations,
      },
    },
  });

  const factory = (options) =>
    mount(Contracts, {
      localVue,
      store,
      stubs: {
        Header: Header,
        PetIdCard: PetIdCard,
        VueSlickCarousel: VueSlickCarousel,
      },
      mocks: {
        $helpers,
        $router,
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
      },
    });

    await Contracts.fetch({ store, app });

    expect(wrapper.vm).toBeTruthy();
  });

  test('Mypage: show the contract in the displayed list', async () => {
    let spyHandleEdit = jest.spyOn(Contracts.methods, 'handleEdit');
    wrapper = await factory();
    await wrapper.find('.id-edit__button').trigger('click');
    let notice = wrapper.find('.notice__note');
    expect(notice.exists()).toBe(false);
    expect(spyHandleEdit.mock.calls.length).toBe(1);
  });

  test('Mypage: show the notice waiting to pay the premium with no card payment', async () => {
    let spyGetPriorityContract = jest.spyOn(
      Contracts.methods,
      'getPriorityContract'
    );
    let spyHandleClick = jest.spyOn(Contracts.methods, 'handleClick');

    let contractNoCard = _.cloneDeep(listContractInfo);
    contractNoCard.contractInfo.map((contractInfo) => {
      contractInfo.insApplicationStatus = '05';
      return contractInfo;
    });

    mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    };

    actions = {
      contractInfo: jest.fn(),
      uploadPhotoPet: jest.fn(),
      s3download: jest.fn().mockReturnValue({ data: null }),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listContractInfo: contractNoCard,
          },
          actions,
          mutations,
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
      },
    });
    expect(spyGetPriorityContract.mock.calls.length).toBe(1);
    let notice = wrapper.find('.notice__note');
    expect(notice.exists()).toBe(true);

    await notice.trigger('click');

    expect(spyHandleClick.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe(
      '/mypage/contracts/payment/new/'
    );
  });

  test('Mypage: show the notice waiting to pay the premium with card payment', async () => {
    let spyGetPriorityContract = jest.spyOn(
      Contracts.methods,
      'getPriorityContract'
    );
    let spyHandleClick = jest.spyOn(Contracts.methods, 'handleClick');

    let contractWithCard = _.cloneDeep(listContractInfo);
    contractWithCard.contractInfo.map((contractInfo) => {
      contractInfo.insApplicationStatus = '05';
      contractInfo.creditInfo = {
        brand: 'VISA',
        creditCardNo4: '9876',
      };

      return contractInfo;
    });

    $router = {
      ...$router,
      push: jest.fn(),
    };

    mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    };

    actions = {
      contractInfo: jest.fn(),
      uploadPhotoPet: jest.fn(),
      s3download: jest.fn().mockReturnValue({ data: null }),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listContractInfo: contractWithCard,
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
        $router,
      },
    });
    expect(spyGetPriorityContract.mock.calls.length).toBe(1);
    let notice = wrapper.find('.notice__note');
    expect(notice.exists()).toBe(true);

    await notice.trigger('click');

    expect(spyHandleClick.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/mypage/contracts/detail/');
  });

  test('Mypage: show the image registration notice for pets', async () => {
    let spyGetPriorityContract = jest.spyOn(
      Contracts.methods,
      'getPriorityContract'
    );
    let spyHandleClick = jest.spyOn(Contracts.methods, 'handleClick');

    let contractNoPetPhoto = _.cloneDeep(listContractInfo);
    contractNoPetPhoto.contractInfo.map((contractInfo) => {
      contractInfo.insCoverageInfo[0].document = null;

      return contractInfo;
    });

    $router = {
      ...$router,
      push: jest.fn(),
    };

    mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    };

    actions = {
      contractInfo: jest.fn(),
      uploadPhotoPet: jest.fn(),
      s3download: jest.fn().mockReturnValue({ data: null }),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listContractInfo: contractNoPetPhoto,
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
        $router,
      },
    });
    expect(spyGetPriorityContract.mock.calls.length).toBe(1);
    let notice = wrapper.find('.notice__note');
    expect(notice.exists()).toBe(true);
    expect(notice.text()).toEqual('error.click_to_register');

    await notice.trigger('click');

    expect(spyHandleClick.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/mypage/contracts/pet/');
  });

  test('Mypage: show the contract out of the displayed list', async () => {
    $helpers = {
      ...$helpers,
      getContractStatus: jest.fn().mockReturnValue(null),
    };

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

    const notice = wrapper.find('.notice__top');
    expect(notice.exists()).toBeTruthy();
    expect(notice.text()).toEqual('contract_pet.no_contracts');
  });

  test('Mypage: show the notice no contract', async () => {
    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            listContractInfo: [],
          },
        },
      },
    });

    wrapper = await factory({
      store,
      mocks: {
        $helpers,
        $router,
      },
    });

    let notice = wrapper.find('.notice__content');
    expect(notice.exists()).toBe(true);
  });
});
