import { shallowMount, config } from '@vue/test-utils';
import PetInfoCard from '@/components/cards/PetInfoCard.vue';

config.mocks.$t = (key) => key;

describe('PetInfoCard', () => {
  const petInfo = {
    name: 'うめじまのうめ子',
    dob: '2018.01.01',
    type: 'スタッフォードシャーブルテリア',
    contraception: 'なし',
    contract: '70％補償プラン',
    image: '',
    species: 0, // 1 => いぬ, 0 => ねこ
    gender: 1, // 1 => 男の子, 0 => 女の子
  };

  const flushPromises = () => new Promise(setImmediate);
  let wrapper;

  const factory = (computed = {}) => {
    return shallowMount(PetInfoCard, {
      propsData: {
        petInfo: petInfo,
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
    const wrapper = shallowMount(PetInfoCard);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match Snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Pet Info card to display info', async () => {
    await flushPromises();

    expect(wrapper.find('.pet-info__name').exists()).toBe(true);
    const name = wrapper.find('.pet-info__name');
    expect(name.text()).toBe('“' + petInfo.name + '”');

    expect(wrapper.find('.pet-info.info-row').exists()).toBe(true);

    expect(wrapper.findAll('.info-description').at(1).text()).toBe(
      petInfo.contraception
    );
  });
});
