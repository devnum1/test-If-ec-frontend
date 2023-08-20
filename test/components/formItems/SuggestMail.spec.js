import { shallowMount, createLocalVue } from '@vue/test-utils';
import SuggestMail from '@/components/formItems/SuggestMail';
import BaseInput from '@/components/formItems/BaseInput';
import VeeValidate from 'vee-validate';
import vClickOutside from 'v-click-outside';

const $t = () => {};
let wrapper;
const localVue = createLocalVue();
localVue.use(BaseInput);
localVue.use(VeeValidate);

const factory = () => {
  return shallowMount(SuggestMail, {
    propsData: {
      name: 'test',
    },
    mocks: {
      $t,
      email: 'peco@hmail.com',
    },
    stubs: { 'base-input': BaseInput },
    methods: {},
    localVue,
    directives: {
      vClickOutside,
      clickOutside: vClickOutside.directive,
    },
  });
};

beforeEach(() => {
  wrapper = factory();
});

afterEach(() => {
  wrapper.destroy();
});

jest.useFakeTimers();

describe('SuggestMail', () => {
  const spySelection = jest.spyOn(SuggestMail.methods, 'handleOptionSelection');

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test('match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('emits input event when email changes', () => {
    wrapper.vm.$options.watch.email.call(wrapper.vm, 'peco@hmail.com');
    expect(wrapper.emitted('input')[0][0]).toBe('peco@hmail.com');
  });

  test('emits input event when email changes hide list', () => {
    wrapper.vm.$options.watch.email.call(wrapper.vm, 'peco');
    expect(wrapper.emitted('input')[0][0]).toBe('peco');
  });

  test('Check validate when input email', () => {
    wrapper.vm.handleValidate = jest.fn();
    wrapper.vm.$options.watch.isActive.call(wrapper.vm, true);
    expect(wrapper.vm.handleValidate).toHaveBeenCalled();
  });

  test('Test handle option select function', async () => {
    const emailButton = wrapper.find('.email-dropdown__item');
    await emailButton.trigger('click');

    expect(spySelection).toHaveBeenCalled();
  });
});
