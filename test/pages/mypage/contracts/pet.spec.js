// 01EZTX9M3AWK0ZB16B6KYR56F1

import { mount, config, createLocalVue } from '@vue/test-utils';
import Header from '@/components/Header.vue';
import BaseLabel from '@/components/formItems/BaseLabel';
import BaseLabelTooltip from '@/components/formItems/BaseLabelTooltip';
import BaseButton from '@/components/formItems/BaseButton';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Pet from '@/pages/mypage/contracts/pet.vue';
import VueMask from 'v-mask';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';

import listContractInfo from '@/test/data/contractInfo.js';

window._ = _;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(VueMask);

Object.defineProperty(localVue.prototype, '_', { value: _ });

const router = new VueRouter({});

config.mocks.$t = (key) => key;

const $helpers = {
  getUserId: jest.fn().mockReturnValue('224a9f8afd234f8bb2b2e4bb0105e8f6'),
};

const contractId = {
  policyNo: 'PPR00000832000',
  subscriberNo: '0000000000',
};

let $store = {
  dispatch: () => {},
  state: {
    contracts: {},
  },
};

describe('Pet', () => {
  let wrapper;
  let actions, mutations, store;
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
          listContractInfo,
          contractId,
        },
        actions,
        mutations,
      },
    },
  });

  const factory = (options) =>
    mount(Pet, {
      localVue,
      store,
      stubs: {
        Header: Header,
        BaseLabel: BaseLabel,
        BaseLabelTooltip: BaseLabelTooltip,
        BaseButton: BaseButton,
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

  test('Pet registered photo', async () => {
    let spyChangePhoto = jest.spyOn(Pet.methods, 'changePhoto');
    (mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    }),
      (actions = {
        contractInfo: jest.fn(),
        uploadPhotoPet: jest.fn(),
        s3download: jest.fn().mockReturnValue({ data: 'example' }),
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
    await wrapper.setData({
      isLoading: true,
    });

    await flushPromises();

    await wrapper.findAll('.page-button').at(0).find('.btn').trigger('click');

    expect(spyChangePhoto.mock.calls.length).toBe(1);
    expect(wrapper.vm.url_list_img).toBe('data:image/jpeg;base64,example');
  });

  test('Pet has not registered image: imagePreview click', async () => {
    let spyImagePreview = jest.spyOn(Pet.methods, 'imagePreview');

    wrapper = await factory();
    await wrapper.setData({
      isLoading: true,
      url_list_img: null,
    });

    await flushPromises();

    await wrapper.find('input').trigger('change');
    expect(spyImagePreview).toHaveBeenCalled();
  });

  test('Pet Upload Photo:: pet photo validated', async () => {
    let event = {
      target: {
        files: [
          {
            name: 'image.png',
            size: 124,
            type: 'image/png',
          },
        ],
      },
    };

    let contract = _.cloneDeep(listContractInfo);
    let spyImagePreview = jest.spyOn(Pet.methods, 'imagePreview');

    jest.spyOn(FileReader.prototype, 'readAsDataURL').mockReturnValue('blob');

    contract.contractInfo[0].insCoverageInfo[0].document = null;

    (mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    }),
      (actions = {
        contractInfo: jest.fn(),
        uploadPhotoPet: jest.fn(),
        s3download: jest.fn().mockReturnValue({ data: null }),
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

    await wrapper.setData({
      isLoading: true,
      url_list_img: null,
    });

    expect(wrapper.find('.format-error').exists()).toBe(false);
    wrapper.vm.imagePreview(event);

    await flushPromises();

    expect(spyImagePreview).toHaveBeenCalled();
    expect(wrapper.vm.file).toBeTruthy();
    expect(wrapper.vm.validatePetImage).toBe('');
    expect(wrapper.find('.format-error').exists()).toBe(false);
  });

  test('Pet Upload Photo: pet photo invalidate', async () => {
    let event = {
      target: {
        files: [
          {
            name: 'image.xyz',
            size: 1000000000,
            type: 'image/xyz',
          },
        ],
      },
    };

    let contract = _.cloneDeep(listContractInfo);
    let spyImagePreview = jest.spyOn(Pet.methods, 'imagePreview');

    jest.spyOn(FileReader.prototype, 'readAsDataURL').mockReturnValue('blob');

    contract.contractInfo[0].insCoverageInfo[0].document = null;
    (mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    }),
      (actions = {
        contractInfo: jest.fn(),
        uploadPhotoPet: jest.fn(),
        s3download: jest.fn().mockReturnValue({ data: null }),
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

    await wrapper.setData({
      isLoading: true,
      url_list_img: null,
    });

    expect(wrapper.find('.format-error').exists()).toBe(false);
    wrapper.vm.imagePreview(event);
    await flushPromises();
    expect(spyImagePreview).toHaveBeenCalled();
    expect(wrapper.vm.file).toBeNull();
    expect(wrapper.vm.validatePetImage).toBeTruthy();
    expect(wrapper.find('.format-error').exists()).toBe(true);
  });

  test('Pet Upload Photo: btn changePhoto click', async () => {
    let contract = _.cloneDeep(listContractInfo);
    let spyChangePhoto = jest.spyOn(Pet.methods, 'changePhoto');
    contract.contractInfo[0].insCoverageInfo[0].document = null;

    (mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    }),
      (actions = {
        contractInfo: jest.fn(),
        uploadPhotoPet: jest.fn(),
        s3download: jest.fn().mockReturnValue({ data: null }),
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

    await wrapper.setData({
      url_list_img: 'example',
    });

    await flushPromises();
    await wrapper.findAll('.page-button').at(0).find('.btn').trigger('click');
    expect(spyChangePhoto.mock.calls.length).toBe(1);
  });

  test('The first time Upload Photo: handleFileUpload success', async () => {
    let contract = _.cloneDeep(listContractInfo);
    let spyHandleFileUpload = jest.spyOn(Pet.methods, 'handleFileUpload');
    contract.contractInfo[0].insCoverageInfo[0].document = null;
    (mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    }),
      (actions = {
        contractInfo: jest.fn(),
        uploadPhotoPet: jest.fn().mockReturnValue({
          contractInfo: {
            insCoverageInfo: {
              document: {
                docFileName:
                  '224a9f8afd234f8bb2b2e4bb0105e8f6_PPR00000832000_0.jpg',
              },
            },
          },
        }),
        s3download: jest.fn().mockReturnValue({ data: 'example' }),
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

    await wrapper.setData({
      btnHandleFileUpload: false,
      file: 'example',
      petFileName: '',
      petPhotoNumber: 0,
      url_list_img: 'url_list_img',
    });

    await wrapper.findAll('.page-button').at(1).find('.btn').trigger('click');

    expect(spyHandleFileUpload.mock.calls.length).toBe(1);
    await flushPromises();

    expect(wrapper.vm.petPhotoNumber).toBe(0);
    expect(wrapper.vm.petFileName).toBe(
      '224a9f8afd234f8bb2b2e4bb0105e8f6_PPR00000832000_0.jpg'
    );
    expect(wrapper.vm.url_list_img).toBe('data:image/jpeg;base64,example');
  });

  test('The second time Upload Photo: handleFileUpload success', async () => {
    let spyHandleFileUpload = jest.spyOn(Pet.methods, 'handleFileUpload');
    (mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    }),
      (actions = {
        contractInfo: jest.fn(),
        uploadPhotoPet: jest.fn().mockReturnValue({
          contractInfo: {
            insCoverageInfo: {
              document: {
                docFileName:
                  '224a9f8afd234f8bb2b2e4bb0105e8f6_PPR00000832000_1.jpg',
              },
            },
          },
        }),
        s3download: jest.fn().mockReturnValue({ data: 'example' }),
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

    await wrapper.setData({
      btnHandleFileUpload: false,
      file: 'example',
      petFileName: 'petFileName',
      petPhotoNumber: 0,
      url_list_img: 'url_list_img',
    });

    await wrapper.findAll('.page-button').at(1).find('.btn').trigger('click');
    await flushPromises();
    expect(spyHandleFileUpload.mock.calls.length).toBe(1);
    expect(wrapper.vm.petPhotoNumber).toBe(1);
    expect(wrapper.vm.petFileName).toBe(
      '224a9f8afd234f8bb2b2e4bb0105e8f6_PPR00000832000_1.jpg'
    );
    expect(wrapper.vm.url_list_img).toBe('data:image/jpeg;base64,example');
  });

  test('Pet Upload Photo: handleFileUpload fail', async () => {
    let contract = _.cloneDeep(listContractInfo);
    let spyHandleFileUpload = jest.spyOn(Pet.methods, 'handleFileUpload');
    contract.contractInfo[0].insCoverageInfo[0].document = null;

    (mutations = {
      setContractInfo: jest.fn(),
      setContractId: jest.fn(),
    }),
      (actions = {
        contractInfo: jest.fn(),
        uploadPhotoPet: jest.fn().mockReturnValue({
          contractInfo: {
            insCoverageInfo: {
              document: {
                docFileName:
                  '224a9f8afd234f8bb2b2e4bb0105e8f6_PPR00000832000_1.jpg',
              },
            },
          },
        }),
        s3download: jest.fn().mockReturnValue({ data: null }),
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

    await wrapper.setData({
      btnHandleFileUpload: false,
      file: 'example',
    });

    await wrapper.findAll('.page-button').at(0).find('.btn').trigger('click');
    await flushPromises();
    expect(spyHandleFileUpload.mock.calls.length).toBe(1);
    expect(wrapper.vm.url_list_img).toBe(null);
  });

  test('Test preventNav when edit', async () => {
    const spyPreventNav = jest.spyOn(Pet.methods, 'preventNav');
    wrapper = await factory({
      router,
      mocks: {
        $helpers,
        $store,
      },
    });

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
        uploadPhotoPet: jest.fn(),
        s3download: jest.fn().mockReturnValue({ data: null }),
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
