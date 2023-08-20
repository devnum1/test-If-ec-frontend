import { shallowMount, createLocalVue, config } from '@vue/test-utils';
import BaseSelect from '@/components/formItems/BaseSelect';
import Multiselect from 'vue-multiselect';
// import VeeValidate from 'vee-validate';

config.mocks.$t = (key) => key;
let wrapper;
const localVue = createLocalVue();
localVue.use(Multiselect);
// localVue.use(VeeValidate);
const factory = () => {
  return shallowMount(BaseSelect, {
    propsData: {
      value: 'test',
      options: [1, 2, 3],
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

describe('BaseSelect', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BaseSelect);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match the snapshot', () => {
    expect(wrapper.vm).toMatchSnapshot();
  });

  test('should call change when click select', () => {
    const select = wrapper.findComponent(Multiselect);
    expect(select.exists()).toBe(true);
  });
});
