// 01EZTX9M3AWK0ZB16B6KYR56F1

import { shallowMount, mount, config, RouterLinkStub } from '@vue/test-utils';
import HomeFooter from '@/components/HomeFooter.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

config.mocks.$t = (key) => key;

describe('HomeFooter', () => {
  let wrapper;

  const factory = () => {
    return shallowMount(HomeFooter, {
      // router,
      stubs: ['router-link'],
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

  test('redirect link webcas', async () => {
    const spyRedirect = jest.spyOn(HomeFooter.methods, 'handleRedirectWebcas');
    wrapper = await factory();

    await wrapper.findAll('.cursor-pointer').at(2).trigger('click');
    expect(spyRedirect.mock.calls.length).toBe(1);
  });
});
