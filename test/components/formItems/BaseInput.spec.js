import { shallowMount, createLocalVue } from '@vue/test-utils';
import BaseInput from '@/components/formItems/BaseInput';
import VeeValidate from 'vee-validate';
import VueMask from 'v-mask';

let wrapper;
const localVue = createLocalVue();
localVue.use(VueMask);
localVue.use(VeeValidate);
const factory = () => {
  return shallowMount(BaseInput, {
    propsData: {
      mask: '',
      value: 'test',
      error: 'This is error message',
    },
    mocks: {},
    stubs: {},
    methods: {},
    localVue,
  });
};

beforeEach(() => {
  wrapper = factory();
});

afterEach(() => {
  wrapper.destroy();
});

jest.useFakeTimers();

describe('BaseInput', () => {
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test('match the snapshot', () => {
    expect(wrapper.vm).toMatchSnapshot();
  });

  test('has base-input class', () => {
    expect(wrapper.classes('base-input')).toBe(true);
  });

  test('match the value', () => {
    const input = wrapper.find('input');
    expect(input.element.value).toBe('test');
  });

  test('match messages error', () => {
    expect(wrapper.text()).toBe('This is error message');
  });

  test('should call handleKeyup when keyup', () => {
    const input = wrapper.find('input');
    input.trigger('keyup');
    expect(wrapper.emitted().keyup.length).toBe(1);
  });

  test('should call handleKeyup when click input', () => {
    const input = wrapper.find('input');
    input.trigger('input');
    expect(wrapper.emitted().input.length).toBe(1);
  });

  test('should call handleKeyup when blur input', () => {
    const input = wrapper.find('input');
    input.trigger('blur');
    expect(wrapper.emitted().blur.length).toBe(1);
  });
});
