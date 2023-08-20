// 01EZTX9M3AWK0ZB16B6KYR56F1

import { mount, config, createLocalVue } from '@vue/test-utils';
import InfoBox from '@/components/cards/InfoBox.vue';
import Header from '@/components/Header.vue';
import BaseButton from '@/components/formItems/BaseButton';
import ButtonBack from '@/components/formItems/ButtonBack';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Me from '@/pages/mypage/me.vue';
import VueMask from 'v-mask';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';

import customerData from '@/test/data/customerData.js';

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

let InfoBoxData = [
  {
    title: 'common.dob.birthday',
    text: '1970/12/01',
  },
  {
    title: 'common.gender.gender_title',
    text: '男性',
  },
  {
    title: 'common.postal_code',
    text: '173-0001',
  },
  {
    title: 'common.phone',
    text: '09099999999',
  },
  {
    title: 'common.contact_email',
    text: 'test001@gmail.com',
  },
];

describe('Mypage me', () => {
  let wrapper;
  let actions, store;

  actions = {
    customerInfo: jest.fn().mockReturnValue(customerData),
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
    mount(Me, {
      localVue,
      stubs: {
        InfoBox,
        Header,
        BaseButton,
        ButtonBack,
      },
      mocks: {
        $helpers,
      },
      store,
      router,
      ...options,
    });

  afterEach(async () => {
    await wrapper.destroy();
    await jest.clearAllMocks();
  });

  test('is a Vue instance', async () => {
    wrapper = await factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('Male customer gender', async () => {
    wrapper = await factory();

    await flushPromises();
    expect(wrapper.vm.dataInfo).toEqual(InfoBoxData);
  });

  test('Female customer gender', async () => {
    let customer = _.cloneDeep(customerData);
    customer.customerInfo.customer.sexCd = '02';

    let customerFemale = _.cloneDeep(InfoBoxData);
    customerFemale[1] = {
      title: 'common.gender.gender_title',
      text: '女性',
    };

    actions = {
      customerInfo: jest.fn().mockReturnValue(customer),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          actions,
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
    expect(wrapper.vm.dataInfo).toEqual(customerFemale);
  });
});
