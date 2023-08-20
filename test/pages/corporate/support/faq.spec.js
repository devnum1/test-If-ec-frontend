// 01EZTX9M3AWK0ZB16B6KYR56F1

import {
  shallowMount,
  config,
  RouterLinkStub,
  createLocalVue,
} from '@vue/test-utils';
import { VBToggle } from 'bootstrap-vue';
import Vue from 'vue';
import Index from '@/pages/corporate/support/faq.vue';
import constListFAQ from '@/constants/list_FAQ';
import VueMeta from 'vue-meta';

Vue.config.ignoredElements = ['b-collapse'];
config.mocks.$t = (key) => key;
const localVue = createLocalVue();
localVue.use(VueMeta, { keyName: 'head' });

const $router = {
  push: jest.fn(),
};

const $route = {
  query: { category: 1 },
};

describe('Index', () => {
  let wrapper;

  const factory = (computed = {}) => {
    return shallowMount(Index, {
      data() {
        return {
          listFAQ: constListFAQ,
          listQuestionAnswer: null,
          showQuestion: false,
        };
      },
      mocks: {
        $router,
      },
      stubs: {
        NuxtLink: RouterLinkStub,
      },
      directives: {
        'b-toggle': VBToggle,
      },
      localVue,
    });
  };

  const spy = jest.spyOn(Index.methods, 'handleNextCategory');

  beforeEach(() => {
    wrapper = factory();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
    const factory = (computed = {}) => {
      return shallowMount(Index, {
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
        },
        directives: {
          'b-toggle': VBToggle,
        },
        localVue,
      });
    };
    beforeEach(() => {
      wrapper = factory();
    });
    expect(wrapper.vm).toBeTruthy();
  });

  test('Test handle next category', async () => {
    const button = wrapper.find('.category-row');
    expect(button.isVisible()).toBe(true);

    await button.trigger('click');
    wrapper.vm.handleNextCategory(2);
    expect(spy.mock.calls.length).toBe(2);
  });

  test('Test head() title function', () => {
    expect(wrapper.vm.$metaInfo.title).toBe(
      'リトルファミリー少額短期保険株式会社｜カスタマーサポート'
    );
  });

  test('Watch $route function', () => {
    wrapper.vm.$options.watch.$route.call(wrapper.vm);
    wrapper.vm.checkRoute();
    expect(spy.mock.calls.length).toBe(2);
  });
});
