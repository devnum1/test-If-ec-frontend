import { shallowMount } from '@vue/test-utils';
import BaseInputCheckbox from '@/components/formItems/BaseInputCheckbox';

let wrapper;
const factory = () => {
  return shallowMount(BaseInputCheckbox, {
    propsData: {
      value: true,
    },
    mocks: {},
    stubs: {},
    methods: {},
  });
};

beforeEach(() => {
  wrapper = factory();
});

afterEach(() => {
  wrapper.destroy();
});

jest.useFakeTimers();

describe('BaseInputCheckbox', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BaseInputCheckbox);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match the snapshot', () => {
    expect(wrapper.vm).toMatchSnapshot();
  });

  test('should call onchange when click input checkbox', () => {
    const checkbox = wrapper.find('input');
    checkbox.trigger('click');
    expect(wrapper.emitted().input.length).toBe(1);
  });

  test('match value checked', () => {
    const checkbox = wrapper.find('input');
    checkbox.setChecked(true);
    expect(checkbox.element.checked).toBeTruthy();
  });

  test('match value disabled', () => {
    const wrapper = shallowMount(BaseInputCheckbox, {
      propsData: {
        checkDisease: true,
      },
    });
    const checkbox = wrapper.find('input');
    checkbox.trigger('click');

    expect(wrapper.emitted().input.length).toBe(1);
  });

  test('match value disabled', () => {
    const wrapper = shallowMount(BaseInputCheckbox, {
      propsData: {
        checkDisease: true,
        value: ['1'],
      },
    });

    const checkbox = wrapper.find('input');
    checkbox.trigger('click');
    checkbox.trigger('click');

    expect(wrapper.emitted().input.length).toBe(2);
  });
});
