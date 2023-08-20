import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/formItems/BaseButton';

let wrapper;
const factory = () => {
  return shallowMount(BaseButton, {
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

describe('BaseButton', () => {
  test('match the snapshot', () => {
    expect(wrapper.vm).toMatchSnapshot();
  });

  test('should call callback when click button', () => {
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.emitted().click.length).toBe(1);
  });
});
