import { shallowMount, config } from '@vue/test-utils';
import PetIdModal from '@/components/modals/PetIdModal.vue';
import PetIdCard from '@/components/cards/PetIdCard.vue';
import BaseButton from '@/components/formItems/BaseButton.vue';

config.mocks.$t = (key) => key;

describe('PetIdModal', () => {
  const petInfo = {
    name: 'うめじまのうめ子',
    dob: '2018.01.01',
    type: 'スタッフォードシャーブルテリア',
    contraception: 'なし',
    contract: '70％補償プラン',
    image: '',
    species: 0, // 1 => いぬ, 0 => ねこ
    gender: 1, // 1 => 男の子, 0 => 女の子
  };

  let wrapper;

  const factory = (computed = {}) => {
    return shallowMount(PetIdModal, {
      propsData: {},
      mocks: {},
      stubs: {},
      methods: {},
      computed,
      stubs: {
        // used to register custom components
        PetIdCard: PetIdCard,
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

  test('to display PetIdCard exact', () => {
    const component = wrapper.findComponent(PetIdCard);
    expect(component.exists()).toBe(true);
  });

  // test xample: check trigger click item to run method
  test('Click close icon to call PetIdModal() method', () => {
    const closeBtn = wrapper.find('.icon-delete');
    wrapper.vm.closeModal = jest.fn();

    closeBtn.trigger('click');
    expect(wrapper.vm.closeModal).toHaveBeenCalled();
  });

  // test xample: check trigger click item to emit data value (this case: this.$emit('input', data))
  test('check closeModal() emits and sets value', () => {
    const closeBtn = wrapper.find('.icon-delete');

    closeBtn.trigger('click');

    expect(wrapper.emitted().input.length).toBe(1);
  });
});
