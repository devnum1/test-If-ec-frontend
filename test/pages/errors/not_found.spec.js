// 01EZTX9M3AWK0ZB16B6KYR56F1

import { mount, shallowMount, config, createLocalVue } from '@vue/test-utils';
import NotFound from '@/pages/errors/not_found.vue';
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

describe('NotFound', () => {
  let wrapper;
  const spy = jest.spyOn(NotFound.methods, 'goToTopPage');

  const factory = (computed = {}) => {
    return mount(NotFound, {
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

  test('Go to page button with access_insurance == mypage', async () => {
    localStorage.setItem('access_insurance', 'mypage');
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mock: {
        $router,
      },
    });

    const button = wrapper.findComponent(BaseButton);
    expect(button.exists()).toBe(true);

    await button.trigger('click');

    expect(spy.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/mypage/contracts/');
  });

  test('Go to page button with access_insurance == home_page', async () => {
    localStorage.setItem('access_insurance', 'home_page');
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mock: {
        $router,
      },
    });

    const button = wrapper.findComponent(BaseButton);
    expect(button.exists()).toBe(true);

    await button.trigger('click');

    expect(spy.mock.calls.length).toBe(2);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/corporate/');
  });
});

describe('NotFound function', () => {
  let wrapper;
  let pushSpy;
  let actions, mutations, store;

  const factory = (computed = {}) => {
    return shallowMount(NotFound, {
      propsData: {
        email: 'pet@sun-asterisk.com',
      },
      localVue,
      computed: {
        petInfo: () => petInfo,
        ngType: () => {},
      },
      mocks: {
        $route: $routeWithToken,
        $router: {
          push: pushSpy,
        },
        $store: $storeConfirmFail,
      },
      stubs: {
        PageTitle: PageTitle,
        BaseButton: BaseButton,
      },
    });
  };

  beforeEach(() => {
    pushSpy = jest.fn((route) => {});
  });

  // Test BeforeRouteEnter
  test('Test BeforeRouteEnter', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    mutations = {
      setNgType: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            ngType,
            petInfo,
          },
          actions,
          mutations,
        },
      },
    });

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
      store,
    });

    const spySubmit = jest.spyOn(NotFound, 'beforeRouteEnter');

    const next = jest.fn();
    const to = {
      name: 'solicitation-step2',
    };

    NotFound.beforeRouteEnter.call(wrapper.vm, to, undefined, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
  });

  test('Test BeforeRouteLeave with route solicitation-contracts-payment-new-confirm', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    mutations = {
      setNgType: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            ngType,
            petInfo,
          },
          actions,
          mutations,
        },
      },
    });

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
      store,
    });

    const spySubmit = jest.spyOn(NotFound, 'beforeRouteLeave');

    const next = jest.fn();
    const to = {
      name: 'solicitation-contracts-payment-new-confirm',
    };

    NotFound.beforeRouteLeave.call(wrapper.vm, to, undefined, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls[0][0]).toBe('/solicitation/contracts/complete/');
  });

  test('Test BeforeRouteLeave with route solicitation-additional_information-confirm', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    mutations = {
      setNgType: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            ngType,
            petInfo,
          },
          actions,
          mutations,
        },
      },
    });

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
      store,
    });

    const spySubmit = jest.spyOn(NotFound, 'beforeRouteLeave');

    const next = jest.fn();
    const to = {
      name: 'solicitation-step1',
    };

    NotFound.beforeRouteLeave.call(wrapper.vm, to, undefined, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls[0][0]).toBe('/solicitation/apologize/');
  });

  test('Test BeforeRouteLeave with next', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    mutations = {
      setNgType: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        contracts: {
          namespaced: true,
          state: {
            ngType,
            petInfo,
          },
          actions,
          mutations,
        },
      },
    });

    wrapper = await factory({
      mocks: {
        $helpers,
        $router,
      },
      store,
    });

    const spySubmit = jest.spyOn(NotFound, 'beforeRouteLeave');

    const next = jest.fn();
    const to = {
      name: '/',
    };

    NotFound.beforeRouteLeave.call(wrapper.vm, to, undefined, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
  });
});
