// 01EZTX9M3AWK0ZB16B6KYR56F1

import {
  shallowMount,
  config,
  RouterLinkStub,
  createLocalVue,
} from '@vue/test-utils';
import InsuranceProduct from '@/pages/corporate/insurance_product.vue';
import VueSlickCarousel from 'vue-slick-carousel';
import VBTogglePlugin from 'bootstrap-vue';
import VueMeta from 'vue-meta';

config.mocks.$t = (key) => key;

const localVue = createLocalVue();
localVue.use(VueMeta, { keyName: 'head' });
localVue.use(VBTogglePlugin);

describe('InsuranceProduct', () => {
  let wrapper;

  const factory = (computed = {}) => {
    return shallowMount(InsuranceProduct, {
      stubs: {
        'router-link': RouterLinkStub,
        NuxtLink: RouterLinkStub,
      },
      localVue,
    });
  };

  const spy = jest.spyOn(InsuranceProduct.methods, 'handlePdf');

  beforeEach(() => {
    wrapper = factory();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test('Test handle open PDF', async () => {
    const button = wrapper.find('.button-pdf');

    await button.trigger('click');
    wrapper.vm.handlePdf();
    expect(global.open).toBeCalled();
  });

  test('Test head() title function', () => {
    expect(wrapper.vm.$metaInfo.title).toBe(
      'リトルファミリー少額短期保険株式会社｜大切な小さな家族を守るために生まれた保険「わんデイズ／にゃんデイズ」'
    );
  });
});
