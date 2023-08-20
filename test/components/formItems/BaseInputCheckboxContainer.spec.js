import { shallowMount } from '@vue/test-utils';
import BaseInputCheckboxContainer from '@/components/formItems/BaseInputCheckboxContainer';

let wrapper;
const factory = () => {
  return shallowMount(BaseInputCheckboxContainer, {
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

describe('BaseInputCheckboxContainer', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BaseInputCheckboxContainer);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match the snapshot', () => {
    expect(wrapper.vm).toMatchSnapshot();
  });

  test('match the snapshot', () => {
    expect(wrapper.html()).toContain(
      ' <span class="input-checkbox-container__error">test</span>'
    );
  });
});
