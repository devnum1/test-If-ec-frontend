import { shallowMount, createLocalVue } from '@vue/test-utils';
import BaseInputRadio from '@/components/formItems/BaseInputRadio';
import VeeValidate from 'vee-validate';

let wrapper;
const localVue = createLocalVue();
localVue.use(VeeValidate);
const radioProps = {
  name: 'うめじまのうめ子',
  label: 'うめじまのうめ子',
  checked: true,
  value: 'test',
  valueInput: 'test2',
};
const factory = () => {
  return shallowMount(BaseInputRadio, {
    localVue,
    propsData: {
      radioProps,
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

describe('BaseInputRadio', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BaseInputRadio);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match the snapshot', () => {
    expect(wrapper.vm).toMatchSnapshot();
  });

  test('should call onchange when click input radio', () => {
    const radio = wrapper.find('input');
    radio.trigger('click');
    expect(wrapper.emitted().input.length).toBe(1);
  });

  test('Disabled radio button', () => {
    const wrapper = shallowMount(BaseInputRadio, {
      propsData: {
        disabled: true,
      },
    });
    const radio = wrapper.find('input');
    const isDisabled = radio.element.disabled === true;
    expect(isDisabled).toBe(true);
  });
});
