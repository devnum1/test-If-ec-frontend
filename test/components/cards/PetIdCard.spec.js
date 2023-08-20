import { shallowMount, config, createLocalVue } from '@vue/test-utils';
import * as _ from 'lodash';

import PetIdCard from '@/components/cards/PetIdCard.vue';
import Vuex from 'vuex';
import VueMask from 'v-mask';

config.mocks.$t = (key) => key;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueMask);

Object.defineProperty(localVue.prototype, '_', { value: _ });

let $route = {
  hash: '',
};

const $router = {
  push: () => {},
};

let $store = {
  dispatch: () => {},
  commit: () => {},
};

const $storeReturnPromise = {
  dispatch: () => Promise.resolve(),
};

describe('PetIdCard', () => {
  const petInfo = {
    insCoverageId: 'P0002',
    insTargetProperty: {
      petName: 'ゆき',
      petType: {
        propVal: '01',
        propDispNm: '犬',
      },
      petBreed: {
        propVal: '052',
        propDispNm: '柴',
      },
      petSexCd: {
        propVal: '01',
        propDispNm: '男の子',
      },
      petWeight: 5,
      petBirthdayDiv: {
        propVal: '01',
        propDispNm: '確定',
      },
      petBirthday: '201801',
      petInsJoinFlg: {
        propVal: '01',
        propDispNm: '加入していない',
      },
    },
    document: null,
  };

  const productInfo = {
    compensRate: {
      propVal: 0.5,
      propDispNm: '50%\u88dc\u511f',
    },
  };

  let wrapper;

  const spy = jest.spyOn(PetIdCard.methods, 'handleClick');

  const factory = (computed) => {
    return shallowMount(PetIdCard, {
      propsData: {
        petInfo: petInfo,
        editCardPet: false,
        productInfo: productInfo,
      },
      mocks: {
        $store: $storeReturnPromise,
      },
      ...computed,
    });
  };

  beforeEach(() => {
    wrapper = factory();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
    const wrapper = shallowMount(PetIdCard);
    expect(wrapper.vm).toBeTruthy();
  });

  test('match Snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Card not display edit button', () => {
    const button = wrapper.find('.id-edit__button');

    expect(button.isVisible()).toBe(false);
  });

  test('Card display edit button', () => {
    const wrapper = shallowMount(PetIdCard, {
      propsData: {
        petInfo: petInfo,
        editCardPet: true,
      },
    });
    const button = wrapper.find('.id-edit__button');

    expect(button.isVisible()).toBe(true);
  });

  test('Test handle click', async () => {
    const wrapper = shallowMount(PetIdCard, {
      propsData: {
        petInfo: petInfo,
        editCardPet: true,
      },
      localVue,
      mocks: {
        $route,
        $router,
        $store,
      },
    });
    const button = wrapper.find('.id-edit__button');
    await button.trigger('click');
    wrapper.vm.handleClick();

    expect(wrapper.emitted().edit).toBeTruthy();
  });

  test('Test pet with photo ', async () => {
    $store = {
      ...$store,
      dispatch: jest.fn().mockReturnValueOnce({ data: 'example' }),
    };

    let pet = _.cloneDeep(petInfo);
    pet.document = {
      docFileName: 'example',
    };

    const wrapper = shallowMount(PetIdCard, {
      propsData: {
        petInfo: pet,
        editCardPet: true,
      },
      localVue,
      mocks: {
        $route,
        $router,
        $store,
      },
    });
    const button = wrapper.find('.id-edit__button');
    await button.trigger('click');
    wrapper.vm.handleClick();
    expect(wrapper.vm.petImage).toBe('data:image/jpeg;base64,example');
  });

  test('Test pet with no photo ', async () => {
    $store = {
      ...$store,
      dispatch: jest.fn().mockReturnValueOnce({ data: null }),
    };

    let pet = _.cloneDeep(petInfo);
    pet.document = {
      docFileName: 'example',
    };

    const wrapper = shallowMount(PetIdCard, {
      propsData: {
        petInfo: pet,
        editCardPet: true,
      },
      localVue,
      mocks: {
        $route,
        $router,
        $store,
      },
    });
    const button = wrapper.find('.id-edit__button');
    await button.trigger('click');
    wrapper.vm.handleClick();
    expect(wrapper.vm.petImage).toBe(null);
  });
});
