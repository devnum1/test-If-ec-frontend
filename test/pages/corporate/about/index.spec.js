// 01EZTX9M3AWK0ZB16B6KYR56F1

import {
  shallowMount,
  config,
  RouterLinkStub,
  createLocalVue,
} from '@vue/test-utils';
import Index from '@/pages/corporate/about/index.vue';
import VueSlickCarousel from 'vue-slick-carousel';
import VueMeta from 'vue-meta';

config.mocks.$t = (key) => key;

const localVue = createLocalVue();
localVue.use(VueMeta, { keyName: 'head' });

describe('Index', () => {
  let wrapper;

  const factory = (computed = {}) => {
    return shallowMount(Index, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
      localVue,
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

  test('Test head() title function', () => {
    expect(wrapper.vm.$metaInfo.title).toBe(
      'リトルファミリー少額短期保険株式会社｜会社情報'
    );
  });
});
