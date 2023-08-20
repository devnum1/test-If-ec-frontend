import { shallowMount, config } from '@vue/test-utils';
import InsurancePaymentCard from '@/components/cards/InsurancePaymentCard.vue';
import flushPromises from 'flush-promises';

config.mocks.$t = (key) => key;

describe('InsurancePaymentCard', () => {
  let wrapper;

  const factory = (computed = {}) => {
    return shallowMount(InsurancePaymentCard);
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

  test('match Snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Card input keyup to call function formated price', async () => {
    wrapper = await factory();
    wrapper.setData({
      insuranceValue: '3725600',
    });

    await flushPromises();

    const input = wrapper.find('input');

    input.trigger('keyup');
    await flushPromises();
    expect(wrapper.vm.insuranceValue).toEqual('3,725,600');
  });
});
