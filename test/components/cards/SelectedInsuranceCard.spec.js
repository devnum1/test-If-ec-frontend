import { shallowMount, config } from '@vue/test-utils';
import SelectedInsuranceCard from '@/components/cards/SelectedInsuranceCard.vue';
import Vue from 'vue';
import { promisify } from 'util';

config.mocks.$t = (key) => key;

describe('SelectedInsuranceCard', () => {
  const compensation = 52;
  const price = 3725600;
  const sleep = promisify(setTimeout);

  const flushPromises = () => new Promise(setImmediate);
  let wrapper;

  const factory = (computed = {}) => {
    return shallowMount(SelectedInsuranceCard, {
      propsData: {
        compensation: compensation.toString(),
        price: price.toString(),
      },
      mocks: {
        $t: () => {}, // erase all $(t) to test (ignore i18n)
      },
    });
  };

  beforeEach(() => {
    Vue.filter('formatPrice', function formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');

      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
    wrapper = factory();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test('match Snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Card to display right compensation', async () => {
    await flushPromises();

    expect(wrapper.find('.insurance-head__inner').exists()).toBe(true);
    const compensationText = wrapper.find('.insurance-head__inner');
    expect(compensationText.text()).toBe(compensation + '');
  });
});
