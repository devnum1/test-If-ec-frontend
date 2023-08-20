// 01EZTX9M3AWK0ZB16B6KYR56F1

import { shallowMount, config, RouterLinkStub } from '@vue/test-utils';
import Header from '@/components/Header.vue';
import PageTitle from '@/components/PageTitle.vue';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

config.mocks.$t = (key) => key;

const $storeReturnPromise = {
  dispatch: () => Promise.resolve(),
};

describe('Header', () => {
  let wrapper;

  let $router = {
    push: () => {},
  };

  let $route = {
    hash: '',
  };

  let $store = {
    dispatch: () => {},
    state: {
      contracts: {},
    },
  };

  const factory = () => {
    return shallowMount(Header, {
      propsData: {
        stubs: {
          PageTitle: PageTitle,
        },
      },
    });
  };

  beforeEach(async () => {
    wrapper = await factory({
      mocks: {
        $store,
        $route,
      },
    });
  });

  afterEach(async () => {
    await wrapper.destroy();
    await jest.clearAllMocks();
  });

  test('is a Vue instance', () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.vm).toBeTruthy();
  });
});

describe('Logout', () => {
  let wrapper;

  let $router = {
    push: jest.fn(),
  };

  let $route = {
    hash: '',
  };

  const spy = jest.spyOn(Header.methods, 'handleLogout');

  const factory = (computed = {}) => {
    return shallowMount(Header, {
      mocks: {
        $route,
        $router,
        $store: $storeReturnPromise,
      },
      stubs: {
        NuxtLink: RouterLinkStub,
      },
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

  test('Test click button logout', async () => {
    const menuButton = wrapper.find('.header__icon-menu');
    await menuButton.trigger('click');

    localStorage.clear();

    const menu = wrapper.find('.menu__body');
    const menuItem = wrapper.findAll('.menu__info-label');

    const logoutItem = menuItem.at(menuItem.length - 1);

    await logoutItem.trigger('click');

    expect(spy.mock.calls.length).toBe(1);
    expect($router.push).toHaveBeenCalledWith('/login/');
  });

  test('Test click redirect to step1', async () => {
    const spyRedirect = jest.spyOn(Header.methods, 'handleRedirectStep1');
    wrapper = await factory();
    const menuButton = wrapper.find('.header__icon-menu');
    await menuButton.trigger('click');

    await wrapper.find('.cursor-pointer').trigger('click');
    await flushPromises();

    expect(spyRedirect.mock.calls.length).toBe(1);
    expect($router.push).toHaveBeenCalledWith('/solicitation/step1/');
  });
});
