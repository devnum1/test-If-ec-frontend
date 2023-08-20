import { shallowMount } from '@vue/test-utils';
import BaseNotice from '@/components/formItems/BaseNotice';

let wrapper;
const factory = () => {
  return shallowMount(BaseNotice, {
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

describe('BaseNotice', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BaseNotice);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match the snapshot', () => {
    expect(wrapper.vm).toMatchSnapshot();
  });
});
