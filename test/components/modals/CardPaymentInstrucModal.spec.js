import { shallowMount, config } from '@vue/test-utils';
import CardPaymentInstrucModal from '@/components/modals/CardPaymentInstrucModal.vue';

config.mocks.$t = (key) => key;

describe('CardPaymentInstrucModal', () => {
  let wrapper;

  const factory = (computed = {}) => {
    return shallowMount(CardPaymentInstrucModal);
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

  test('Click close icon to call closeModal() method', () => {
    const closeBtn = wrapper.find('.icon-delete');
    wrapper.vm.closeModal = jest.fn();

    closeBtn.trigger('click');
    expect(wrapper.vm.closeModal).toHaveBeenCalled();
  });

  test('check closeModal() emits and sets value', () => {
    const closeBtn = wrapper.find('.icon-delete');

    closeBtn.trigger('click');

    expect(wrapper.emitted().input.length).toBe(2);
  });
});
