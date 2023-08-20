import { shallowMount, config } from '@vue/test-utils';
import stepProgress from '@/components/stepProgress/stepProgress.vue';

config.mocks.$t = (key) => key;

describe('stepProgress', () => {
  const stepList = [
    {
      index: '1',
      title: 'うちの子情報',
    },
    {
      index: '2',
      title: 'プラン選択',
    },
    {
      index: '3',
      title: '飼い主情報の入力',
    },
    {
      index: '4',
      title: 'うちの子情報',
    },
  ];

  let wrapper;

  const factory = () => {
    return shallowMount(stepProgress, {
      propsData: {
        stepList: stepList,
        current: 2,
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
    const wrapper = shallowMount(stepProgress);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match Snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
