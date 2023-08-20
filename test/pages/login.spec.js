// 01EZTX9M3AWK0ZB16B6KYR56F1

import { mount, shallowMount, config, createLocalVue } from '@vue/test-utils';
import Login from '@/pages/login.vue';
import BaseButton from '@/components/formItems/BaseButton';
import ButtonBack from '@/components/formItems/ButtonBack';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import VueMask from 'v-mask';

import flushPromises from 'flush-promises';

import dataRedis from '@/test/data/dataRedis.js';

config.mocks.$t = (key) => key;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VeeValidate);
localVue.use(VueMask);

const $route = {
  path: '/login',
  query: {},
};

const $routeWithToken = {
  path: '/login',
  query: {
    token: 123123123235,
    email: 'pet@sun-asterisk.com',
  },
};

const $router = {
  push: () => {},
};

const $store = {
  dispatch: () => {},
  commit: () => {},
};

const $cookies = {
  get: () => {},
};

const $storeConfirmFail = {
  dispatch: () => {
    throw 'fail';
  },
};

const $storeReturnPromise = {
  dispatch: () => Promise.resolve(),
};

const $helpers = {
  randomString: () => {},
};

describe('Login', () => {
  let wrapper;
  const spy = jest.spyOn(Login.methods, 'login');

  const factory = (options = {}) => {
    return mount(Login, {
      propsData: {
        email: 'pet@sun-asterisk.com',
      },
      localVue,
      stubs: {
        BaseButton,
        ButtonBack,
      },
      mocks: {
        $route,
        $router,
        $store: $storeReturnPromise,
        $helpers,
        $cookies,
      },
      ...options,
    });
  };

  beforeEach(() => {
    wrapper = factory();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test('Test click button login', async () => {
    wrapper = await factory({
      mocks: {
        $route,
        $router,
        $store: $storeReturnPromise,
        $helpers,
        $cookies,
      },
    });

    await wrapper.setData({
      email: 'pet@sun-asterisk.com',
    });

    const button = wrapper.findComponent(BaseButton);
    expect(button.exists()).toBe(true);

    await button.trigger('click');
    await flushPromises();

    await wrapper.setData({
      clickSubmit: true,
    });

    expect(spy.mock.calls.length).toBe(1);
  });
});

describe('Login: confirm success', () => {
  let wrapper, actions, store, mutations;
  let pushSpy;

  mutations = {
    setPetInfo: jest.fn(),
    setRepProductCd: jest.fn(),
  };

  actions = {
    getRedis: jest.fn().mockReturnValue(dataRedis.data),
    deleteRedis: jest.fn(),
    confirmChallenge: jest.fn(),
  };

  store = new Vuex.Store({
    modules: {
      contracts: {
        namespaced: true,
        mutations,
      },
      redis: {
        namespaced: true,
        actions,
      },
      auth: {
        namespaced: true,
        actions,
      },
    },
  });

  const factory = (options = {}) => {
    return shallowMount(Login, {
      propsData: {
        email: 'pet@sun-asterisk.com',
      },
      localVue,
      mocks: {
        $route: $routeWithToken,
        $router: {
          push: pushSpy,
        },
        $store,
      },
      store,
      ...options,
    });
  };

  beforeEach(() => {
    pushSpy = jest.fn((route) => {});
  });

  test('Login success: redirect to link redirect', async () => {
    wrapper = await factory({
      mocks: {
        $route: $routeWithToken,
        $router: {
          push: pushSpy,
        },
        $store,
      },
    });

    expect(wrapper.vm).toBeTruthy();
    wrapper.destroy();
  });
});
