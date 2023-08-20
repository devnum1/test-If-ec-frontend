import { shallowMount, config } from '@vue/test-utils';
import PageTitle from '@/components/PageTitle.vue';

config.mocks.$t = (key) => key;

describe('PageTitle', () => {
  let wrapper;

  const factory = () => {
    return shallowMount(PageTitle, {
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

  test('is a Vue instance', () => {
    const wrapper = shallowMount(PageTitle);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match Snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('match the title', () => {
    expect(wrapper.find('.page-title__text').text()).toEqual('Test title');
  });
});
