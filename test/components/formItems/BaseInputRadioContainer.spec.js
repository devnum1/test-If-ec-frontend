import { shallowMount } from '@vue/test-utils';
import BaseInputRadioContainer from '@/components/formItems/BaseInputRadioContainer';

let wrapper;
const factory = () => {
  return shallowMount(BaseInputRadioContainer, {
    propsData: {
      error: 'test',
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

describe('BaseInputRadioContainer', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BaseInputRadioContainer);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match the snapshot', () => {
    expect(wrapper.vm).toMatchSnapshot();
  });

  test('match the snapshot', () => {
    expect(wrapper.html()).toContain(
      ' <span class="input-radio-container__error">test</span>'
    );
  });
});
