import { shallowMount } from '@vue/test-utils';
import InputImageClaimModal from '@/components/modals/InputImageClaimModal.vue';

describe('InputImageClaimModal', () => {
  let wrapper;

  const factory = (computed = {}) => {
    return shallowMount(InputImageClaimModal);
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

  test('Modal to display input exact text', () => {
    const button = wrapper.find('.input-text');

    expect(button.exists()).toBe(true);

    expect(button.text()).toBe('ライブラリから選択');
  });

  test('Click close icon to call CloseModal() method', () => {
    const closeBtn = wrapper.find('.icon-delete');
    wrapper.vm.closeModal = jest.fn();

    closeBtn.trigger('click');
    expect(wrapper.vm.closeModal).toHaveBeenCalled();
  });

  test('check closeModal() emits and sets value', () => {
    const closeBtn = wrapper.find('.icon-delete');

    closeBtn.trigger('click');

    expect(wrapper.emitted().input.length).toBe(1);
  });
});
