import { shallowMount } from '@vue/test-utils';
import BaseLabelTooltip from '@/components/formItems/BaseLabelTooltip';

let wrapper;

const factory = () => {
  return shallowMount(BaseLabelTooltip, {
    propsData: {},
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

describe('BaseLabelTooltip', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BaseLabelTooltip);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match the snapshot', () => {
    expect(wrapper.vm).toMatchSnapshot();
  });
});
