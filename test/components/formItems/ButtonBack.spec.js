import { shallowMount } from '@vue/test-utils';
import ButtonBack from '@/components/formItems/ButtonBack';

let wrapper;
const factory = () => {
  return shallowMount(ButtonBack, {
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

describe('ButtonBack', () => {
  test('should call callback when click button', async () => {
    const event = await wrapper.find('div');
    event.trigger('click');
    expect(wrapper.emitted().click.length).toBe(1);
  });
});
