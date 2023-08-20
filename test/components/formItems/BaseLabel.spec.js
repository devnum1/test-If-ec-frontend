import { shallowMount } from '@vue/test-utils';
import BaseLabel from '@/components/formItems/BaseLabel';

let wrapper;
const radioProps = {
  name: 'うめじまのうめ子',
  label: 'うめじまのうめ子',
  checked: true,
  value: 'test',
};
const factory = () => {
  return shallowMount(BaseLabel, {
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

describe('BaseLabel', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BaseLabel);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match the snapshot', () => {
    expect(wrapper.vm).toMatchSnapshot();
  });
});
