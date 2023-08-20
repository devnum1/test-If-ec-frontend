// 01EZTX9M3AWK0ZB16B6KYR56F1

import { shallowMount, mount, config, RouterLinkStub } from '@vue/test-utils';
import HomeHeader from '@/components/HomeHeader.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import listMenuHome from '@/constants/list_menu_home';

config.mocks.$t = (key) => key;

describe('HomeHeader', () => {
  window.open = jest.fn();
  let wrapper;

  const factory = () => {
    return shallowMount(HomeHeader, {
      // router,
      stubs: ['router-link', 'nuxt-link'],
    });
  };

  beforeEach(async () => {
    wrapper = await factory({});
  });

  afterEach(async () => {
    await wrapper.destroy();
    await jest.clearAllMocks();
  });

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test('Test handleNextChild', async () => {
    const spyPreventNext = jest.spyOn(HomeHeader.methods, 'handleNextChild');
    wrapper = await factory();

    wrapper.setData({
      listmenuHome: listMenuHome,
      listChildrenMenu: listMenuHome[0],
    });

    await wrapper.find('.nav-icon').trigger('click');
    await wrapper.findAll('.menu__body-row').at(1).trigger('click');

    expect(spyPreventNext.mock.calls.length).toBe(1);
  });

  test('Test handleBack', async () => {
    const spyPreventNext = jest.spyOn(HomeHeader.methods, 'handleBack');
    wrapper = await factory();

    await wrapper.find('.nav-icon').trigger('click');
    await wrapper.find('.menu__body-row').trigger('click');
    await wrapper.find('.menu__body-top').trigger('click');

    expect(spyPreventNext.mock.calls.length).toBe(1);
  });

  test('redirect link webcas', async () => {
    const spyRedirect = jest.spyOn(HomeHeader.methods, 'handleRedirectWebcas');
    wrapper = await factory();

    await wrapper
      .findAll('.dropdown-list')
      .at(1)
      .findAll('li')
      .at(2)
      .trigger('click');
    expect(spyRedirect.mock.calls.length).toBe(1);
  });
});
