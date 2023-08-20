// 01EZTX9M3AWK0ZB16B6KYR56F1

import { mount, shallowMount, config } from '@vue/test-utils';
import Logout from '@/pages/logout.vue';

config.mocks.$t = (key) => key;

const $storeReturnPromise = {
  dispatch: () => Promise.resolve(),
};

describe('Logout', () => {
  let wrapper;

  let $router = {
    push: jest.fn(),
  };

  const factory = (computed = {}) => {
    return shallowMount(Logout, {
      propsData: {
        email: 'pet@sun-asterisk.com',
      },
      mocks: {
        $store: $storeReturnPromise,
        $router,
      },
    });
  };

  const spy = jest.spyOn(Logout.methods, 'logout');
  const spyPush = jest.spyOn(Logout.methods, 'logout');

  beforeEach(() => {
    wrapper = factory();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  jest.useFakeTimers();

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });
});
