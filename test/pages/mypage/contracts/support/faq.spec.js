// 01EZTX9M3AWK0ZB16B6KYR56F1

import {
  shallowMount,
  config,
  RouterLinkStub,
  createLocalVue,
} from '@vue/test-utils';
import { VBToggle } from 'bootstrap-vue';
import Vue from 'vue';
import Support from '@/pages/mypage/contracts/support/faq.vue';
import constListFAQ from '@/constants/list_FAQ';
import BaseButton from '@/components/formItems/BaseButton';
import Header from '@/components/Header.vue';
import flushPromises from 'flush-promises';

Vue.config.ignoredElements = ['b-collapse'];
const localVue = createLocalVue();
config.mocks.$t = (key) => key;

const $router = {
  push: jest.fn(),
};

const $route = {
  query: { category: 1 },
};

describe('Support', () => {
  let wrapper;

  const factory = (options) =>
    shallowMount(Support, {
      localVue,
      data() {
        return {
          listFAQ: constListFAQ,
          listQuestionAnswer: null,
          showQuestion: false,
        };
      },
      mocks: {
        $router,
        $route,
      },
      stubs: {
        NuxtLink: RouterLinkStub,
        BaseButton,
        Header,
      },
      directives: {
        'b-toggle': VBToggle,
      },
      ...options,
    });

  const spy = jest.spyOn(Support.methods, 'handleNextCategory');

  beforeEach(() => {
    wrapper = factory();
  });

  afterEach(() => {
    wrapper.destroy();
    jest.clearAllMocks();
  });

  test('is a Vue instance', async () => {
    wrapper = await factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('DP0063: Test handle next category ', async () => {
    wrapper = await factory();
    const buttonNextCategory = wrapper.find('.category-row');
    expect(buttonNextCategory.isVisible()).toBe(true);
    expect(wrapper.find('.question-row').exists()).toBe(false);

    await buttonNextCategory.trigger('click');
    wrapper.vm.handleNextCategory(2);
    expect(spy.mock.calls.length).toBe(2);
  });

  // test('DP0063: Test go to mypage contracts ', async () => {
  //   wrapper = await factory();
  //   const button = wrapper.findComponent(BaseButton);
  //   expect(button.exists()).toBe(true);

  //   await button.trigger('click');
  //   expect($router.push.mock.calls[0][0]).toBe('/mypage/contracts/');
  // });

  test('DP0064: Test show question detail ', async () => {
    wrapper = await factory({
      mocks: {
        $router,
      },
    });

    await wrapper.setData({
      showQuestion: true,
      listQuestionAnswer: constListFAQ[0],
    });

    await flushPromises();
    expect(wrapper.find('.category-row').exists()).toBe(false);
    expect(wrapper.find('.question-row').exists()).toBe(true);
  });

  test('DP0064: Test handle cancel category', async () => {
    let spyCancel = jest.spyOn(Support.methods, 'handleCancelCategory');
    wrapper = await factory();

    await wrapper.setData({
      showQuestion: true,
      listQuestionAnswer: constListFAQ[0],
    });

    await flushPromises();
    await wrapper.findComponent(BaseButton).trigger('click');
    expect(spyCancel.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/mypage/contracts/');
  });

  test('DP0064: Test preventNav ', async () => {
    const spyPreventNav = jest.spyOn(Support.methods, 'preventNav');
    wrapper = await factory();
    await wrapper.setData({
      showQuestion: true,
      listQuestionAnswer: constListFAQ[0],
    });

    await flushPromises();
    await window.dispatchEvent(new Event('pagehide'));
    expect(spyPreventNav.mock.calls.length).toBe(1);
  });

  test('Test BeforeRouteEnter', async () => {
    wrapper = await factory();

    const spySubmit = jest.spyOn(Support, 'beforeRouteEnter');

    const next = jest.fn();
    const from = {
      name: '/',
    };

    Support.beforeRouteEnter.call(wrapper.vm, undefined, from, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
  });
});
