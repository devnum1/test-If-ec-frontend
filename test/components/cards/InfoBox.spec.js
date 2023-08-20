import { shallowMount } from '@vue/test-utils';
import InfoBox from '@/components/cards/InfoBox.vue';

describe('InfoBox', () => {
  const petInfo = [
    {
      title: '誕生日',
      text: '1990/07/25',
    },
    {
      title: '性別',
      text: '女',
    },
    {
      title: '郵便番号',
      text: '150-0046',
    },
    {
      title: '電話番号',
      text: '08012345678',
    },
    {
      title: '連絡用メールアドレス',
      text: 'y.hanako12@peco-japan.com',
    },
    {
      title: 'PECOからのお知らせ',
      text: '受け取る',
    },
  ];

  const flushPromises = () => new Promise(setImmediate);
  let wrapper;

  const factory = (computed = {}) => {
    return shallowMount(InfoBox, {
      propsData: {
        dataInfo: petInfo,
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
    const wrapper = shallowMount(InfoBox);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match Snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  // for each item display key - value
  test('List.vue to display list', async () => {
    await flushPromises();

    expect(wrapper.find('.info-box__item').exists()).toBe(true);

    const items = wrapper.findAll('.info-box__item');
    items.wrappers.forEach((wrapper, i) => {
      let title = wrapper.find('.info-box__title');
      expect(title.exists()).toBe(true);
      expect(title.text()).toBe(petInfo[i].title);

      let infotext = wrapper.find('.info-box__text');
      expect(infotext.exists()).toBe(true);
      expect(infotext.text()).toBe(petInfo[i].text);
    });
  });
});
