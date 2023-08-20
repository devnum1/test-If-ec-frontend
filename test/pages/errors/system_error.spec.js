// 01EZTX9M3AWK0ZB16B6KYR56F1

import { mount, shallowMount, config, createLocalVue } from '@vue/test-utils';
import SystemError from '@/pages/errors/system_error.vue';
import PageTitle from '@/components/PageTitle.vue';
import BaseButton from '@/components/formItems/BaseButton';
import flushPromises from 'flush-promises';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import VueMask from 'v-mask';
import petInfo from '@/test/data/petInfo';
import ngType from '@/test/data/ngType';

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
  },
};

let $router = {
  push: () => {},
};

let $store = {
  dispatch: () => {},
  state: {
    ngType: '',
  },
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

describe('SystemError', () => {
  let wrapper;
  const spy = jest.spyOn(SystemError.methods, 'goToTopPage');

  const factory = (computed = {}) => {
    return mount(SystemError, {
      stubs: {
        PageTitle: PageTitle,
        BaseButton: BaseButton,
      },
      propsData: {
        email: 'pet@sun-asterisk.com',
      },
      localVue,
      mocks: {
        $route,
        $router,
        $store: $storeReturnPromise,
        $helpers,
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

  test('Go to page button', async () => {
    const button = wrapper.findComponent(BaseButton);
    expect(button.exists()).toBe(true);

    await button.trigger('click');

    expect(spy.mock.calls.length).toBe(1);
  });
});
