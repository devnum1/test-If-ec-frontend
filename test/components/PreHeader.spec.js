// 01EZTX9M3AWK0ZB16B6KYR56F1

import { shallowMount, config, RouterLinkStub } from '@vue/test-utils';
import PreHeader from '@/components/PreHeader.vue';
import Vuex from 'vuex';

config.mocks.$t = (key) => key;

describe('PreHeader', () => {
  let wrapper;

  const factory = () => {
    return shallowMount(PreHeader, {
      propsData: {},
      stubs: {
        NuxtLink: RouterLinkStub,
      },
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
    const wrapper = shallowMount(PreHeader);
    expect(wrapper.vm).toBeTruthy();
  });
});
