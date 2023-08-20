import { shallowMount, config } from '@vue/test-utils';
import ClaimItemModal from '@/components/modals/ClaimItemModal.vue';
import BaseButton from '@/components/formItems/BaseButton.vue';

config.mocks.$t = (key) => key;

describe('ClaimItemModal', () => {
  let wrapper;

  const factory = (computed = {}) => {
    return shallowMount(ClaimItemModal, {
      stubs: {
        // used to register custom components
        BaseButton: BaseButton,
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

  test('match Snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Modal to display exact title', () => {
    const title = wrapper.find('.claim-title');

    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('お手元にご用意いただくもの');
  });

  test('Modal to display exact 2 step', () => {
    const items = wrapper.findAll('.claim-row');
    expect(items).toHaveLength(2);
  });

  test('Modal to display button exact text', () => {
    const component = wrapper.findComponent(BaseButton);
    expect(component.exists()).toBe(true);
  });
});
