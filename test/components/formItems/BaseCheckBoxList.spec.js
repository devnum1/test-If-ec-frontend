import { shallowMount, createLocalVue } from '@vue/test-utils';
import BaseCheckBoxList from '@/components/formItems/BaseCheckBoxList';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';

let wrapper;
const localVue = createLocalVue();
localVue.use(VBTogglePlugin);
localVue.use(CollapsePlugin);
const factory = () => {
  return shallowMount(BaseCheckBoxList, {
    localVue,
    propsData: {
      title: 'Test title',
    },
  });
};

beforeEach(() => {
  wrapper = factory();
});

afterEach(() => {
  wrapper.destroy();
});

describe('BaseCheckBoxList', () => {
  test('match the snapshot', () => {
    expect(wrapper.vm).toMatchSnapshot();
  });
});
