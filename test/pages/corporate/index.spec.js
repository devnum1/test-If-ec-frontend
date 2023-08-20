// 01EZTX9M3AWK0ZB16B6KYR56F1

import { shallowMount, config, RouterLinkStub } from '@vue/test-utils';
import Index from '@/pages/corporate/index.vue';

config.mocks.$t = (key) => key;

const $storeReturnPromise = {
  dispatch: () => Promise.resolve(),
};

describe('Index', () => {
  let wrapper;

  let $router = {
    push: jest.fn(),
  };

  const factory = (computed = {}) => {
    return shallowMount(Index, {
      stubs: ['router-link'],
      propsData: {
        email: 'pet@sun-asterisk.com',
      },
      mocks: {
        $store: $storeReturnPromise,
        $router,
      },
    });
  };

  beforeEach(() => {
    wrapper = factory();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  jest.useFakeTimers();

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test('redirect my page', async () => {
    const spy = jest.spyOn(Index.methods, 'handleRedirectMyPage');
    await wrapper.find('.btn--default').trigger('click');
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/mypage/contracts/');
  });
});
