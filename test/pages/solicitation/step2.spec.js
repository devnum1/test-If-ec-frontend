import { shallowMount, mount, config, createLocalVue } from '@vue/test-utils';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import VueMask from 'v-mask';
import Vuex from 'vuex';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';
import { Auth } from 'aws-amplify';

// components
import Step2 from '@/pages/solicitation/step2.vue';
import BaseButton from '@/components/formItems/BaseButton';
import PageTitle from '@/components/PageTitle.vue';
import StepProgress from '@/components/stepProgress/stepProgress';

// store
import storeMock from '@/test/mocks/store';

// sample data
import listProductInfo from '@/test/data/listProductInfo.js';
import petInfoData from '@/test/data/petInfoData';

config.mocks.$t = (key) => key;
const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(VueMask);
localVue.use(Vuex);
localVue.use(VBTogglePlugin);
localVue.use(CollapsePlugin);
localVue.filter('formatPrice', jest.fn());
Object.defineProperty(localVue.prototype, '_', { value: _ });

let $router = {
  push: () => {},
};

let $route = {
  hash: '',
};

let $helpers = {
  setDataFromLocalToVuex: () => {},
  setDataFromVuexToLocal: (event) => {},
};

let $store = {
  dispatch: () => {},
  getters: {
    'auth/isAuthenticated': false,
  },
};

describe('step2', () => {
  let wrapper;

  const factory = (options) =>
    mount(Step2, {
      localVue,
      stubs: {
        PageTitle,
        BaseButton,
        StepProgress,
      },
      mocks: {
        $helpers,
        $store,
        $route,
        $router,
      },
      computed: {
        petInfo: () => petInfoData,
        listProductInfo: () => listProductInfo,
      },
      ...options,
    });

  afterEach(async () => {
    await wrapper.destroy();
    await jest.clearAllMocks();
  });

  test('is vue instance', async () => {
    wrapper = await factory();

    await Step2.asyncData({
      store: $store,
    });

    expect(wrapper.vm).toBeTruthy();
  });

  test('normal case: cat', async () => {
    const dispatchSpy = jest.fn();
    const $store = {
      dispatch: dispatchSpy,
    };

    wrapper = await factory({
      mocks: {
        $helpers,
        $store,
        $route,
      },
    });

    await Step2.asyncData({
      store: $store,
    });

    expect(wrapper.vm).toBeTruthy();
    expect(dispatchSpy.mock.calls.length).toBe(3);
  });

  test('normal case: dog', async () => {
    const dispatchSpy = jest.fn();
    const $store = {
      dispatch: dispatchSpy,
    };

    const _petInfoData = _.cloneDeep(petInfoData);
    _petInfoData.petType = '01';
    _petInfoData.petBreed = '001';
    _petInfoData.petWeight = '1.1';

    wrapper = await factory({
      mocks: {
        $helpers,
        $store,
        $route,
      },
      computed: {
        petInfo: () => _petInfoData,
        listProductInfo: () => listProductInfo,
      },
    });

    await Step2.asyncData({
      store: $store,
    });

    expect(wrapper.vm).toBeTruthy();
    expect(dispatchSpy.mock.calls.length).toBe(3);
  });

  test('Test handleNextStep unauthenticated', async () => {
    const spyNextStep = jest.spyOn(Step2.methods, 'handleNextStep');
    const push = jest.fn();

    wrapper = await factory({
      mocks: {
        $helpers,
        $router: {
          push,
        },
        $route,
      },
      store: storeMock,
    });

    const spyAuthLoad = jest
      .spyOn(Auth, 'currentUserInfo')
      .mockReturnValue(false);

    await wrapper.findAllComponents(BaseButton).at(0).trigger('click');
    await flushPromises();

    expect(spyNextStep.mock.calls.length).toBe(1);
    expect(spyAuthLoad.mock.calls.length).toBe(1);
    expect(push.mock.calls.length).toBe(1);
    expect(push.mock.calls[0][0]).toBe('/solicitation/step3/');
  });

  test('Test handleNextStep authenticated', async () => {
    const spyHandleBack = jest.spyOn(Step2.methods, 'handleNextStep');
    const push = jest.fn();

    wrapper = await factory({
      mocks: {
        $helpers,
        $router: {
          push,
        },
        $route,
      },
      store: storeMock,
    });

    const spyAuthLoad = jest
      .spyOn(Auth, 'currentUserInfo')
      .mockReturnValue(true);

    await wrapper.findAllComponents(BaseButton).at(0).trigger('click');
    await flushPromises();

    expect(spyHandleBack.mock.calls.length).toBe(1);
    expect(spyAuthLoad.mock.calls.length).toBe(1);
    expect(push.mock.calls.length).toBe(1);
    expect(push.mock.calls[0][0]).toBe('/solicitation/step4/');
  });

  test('Test handleNextStep authenticated with #edit', async () => {
    const spyHandleBack = jest.spyOn(Step2.methods, 'handleNextStep');
    const push = jest.fn();

    wrapper = await factory({
      mocks: {
        $helpers,
        $router: {
          push,
        },
        $route: {
          hash: '#edit',
        },
      },
      store: storeMock,
    });

    const spyAuthLoad = jest
      .spyOn(Auth, 'currentUserInfo')
      .mockReturnValue(true);

    await wrapper.findAllComponents(BaseButton).at(0).trigger('click');
    await flushPromises();

    expect(spyHandleBack.mock.calls.length).toBe(1);
    expect(spyAuthLoad.mock.calls.length).toBe(1);
    expect(push.mock.calls.length).toBe(1);
    expect(push.mock.calls[0][0]).toBe('/solicitation/confirm/');
  });

  // test('Test handleBack', async () => {
  //   const spyHandleBack = jest.spyOn(Step2.methods, 'handleBack');
  //   const push = jest.fn();

  //   wrapper = await factory({
  //     mocks: {
  //       $helpers,
  //       $store,
  //       $router: {
  //         push,
  //       },
  //       $route,
  //     },
  //   });

  //   await wrapper.find('.back-text-link').trigger('click');

  //   expect(spyHandleBack.mock.calls.length).toBe(1);
  //   expect(push.mock.calls.length).toBe(1);
  //   expect(push.mock.calls[0][0]).toBe('/solicitation/step1/');
  // });

  // test('Test handleBack when edit', async () => {
  //   const spyHandleBack = jest.spyOn(Step2.methods, 'handleBack');
  //   const push = jest.fn();

  //   wrapper = await factory({
  //     mocks: {
  //       $helpers,
  //       $store,
  //       $router: {
  //         push,
  //       },
  //       $route: {
  //         hash: '#edit',
  //       },
  //     },
  //   });

  //   await wrapper.find('.back-text-link').trigger('click');

  //   expect(spyHandleBack.mock.calls.length).toBe(1);
  //   expect(push.mock.calls.length).toBe(1);
  //   expect(push.mock.calls[0][0]).toBe('/solicitation/confirm/');
  // });

  test('Test preventNav', async () => {
    const spyPreventNav = jest.spyOn(Step2.methods, 'preventNav');
    wrapper = await factory();

    const spy = jest.spyOn(wrapper.vm.$helpers, 'setDataFromVuexToLocal');

    await window.dispatchEvent(new Event('pagehide'));

    expect(spyPreventNav.mock.calls.length).toBe(1);
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0]).toEqual(expect.arrayContaining(['petInfo']));
  });

  test('Test preventNav when edit', async () => {
    const spyPreventNav = jest.spyOn(Step2.methods, 'preventNav');

    wrapper = await factory({
      mocks: {
        $helpers,
        $store,
        $route: {
          hash: '#edit',
        },
      },
    });

    const spy = jest.spyOn(wrapper.vm.$helpers, 'setDataFromVuexToLocal');

    await window.dispatchEvent(new Event('pagehide'));

    expect(spyPreventNav.mock.calls.length).toBe(1);
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0]).toEqual(
      expect.arrayContaining([
        'petInfo',
        'productCd',
        'customerInfo',
        'contract_duplicate',
      ])
    );
  });
});
