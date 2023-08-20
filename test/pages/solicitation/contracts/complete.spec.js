import { config, createLocalVue, mount } from '@vue/test-utils';
import VueMask from 'v-mask';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import * as _ from 'lodash';
import flushPromises from 'flush-promises';

import Complete from '@/pages/solicitation/contracts/complete';
import BaseButton from '@/components/formItems/BaseButton';
import PageTitle from '@/components/PageTitle';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';

config.mocks.$t = (key) => key;

const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(VueMask);
localVue.use(Vuex);
localVue.use(VBTogglePlugin);
localVue.use(CollapsePlugin);
Object.defineProperty(localVue.prototype, '_', { value: _ });

let $router = {
  push: () => {},
};

let $helpers = {
  setDataFromLocalToVuex: () => {},
  setDataFromVuexToLocal: (event) => {},
};

describe('complete', () => {
  let wrapper;

  const factory = (options) =>
    mount(Complete, {
      localVue,
      stubs: {
        PageTitle,
        BaseButton,
      },
      ...options,
    });

  afterEach(async () => {
    await wrapper.destroy();
    await jest.clearAllMocks();
  });

  test('is a Vue instance', async () => {
    wrapper = await factory({
      mocks: {
        $helpers,
      },
    });

    expect(wrapper.vm).toBeTruthy();
  });

  // Test BeforeRouteEnter
  test('Test BeforeRouteEnter', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $router,
      },
    });

    wrapper.setData({
      notiType: '01',
    });

    const spySubmit = jest.spyOn(Complete, 'beforeRouteEnter');

    const next = jest.fn();
    const from = {
      name: 'solicitation-contracts-payment-new-confirm',
    };
    localStorage.setItem('reload', false);

    Complete.beforeRouteEnter.call(wrapper.vm, undefined, from, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
  });

  // Test BeforeRouteEnter with from != accessToComplete
  test('Test BeforeRouteEnter with from != accessToComplete', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $router,
      },
    });

    const spySubmit = jest.spyOn(Complete, 'beforeRouteEnter');

    const from = {
      name: 'solicitation-step1',
    };

    Complete.beforeRouteEnter.call(wrapper.vm, undefined, from, (next) =>
      next(wrapper.vm)
    );
    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/corporate/');
  });

  // beforeRouteLeave
  test('Test beforeRouteLeave', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $router,
      },
    });

    const spySubmit = jest.spyOn(Complete, 'beforeRouteLeave');

    const next = jest.fn();
    const to = {
      name: 'solicitation-step2',
    };

    Complete.beforeRouteLeave.call(wrapper.vm, to, undefined, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
  });

  // beforeRouteLeave with to (Ex: solicitation-confirm)
  test('Test beforeRouteLeave with to solicitation-contracts-payment-new-confirm', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $router,
      },
    });

    const spySubmit = jest.spyOn(Complete, 'beforeRouteLeave');

    const next = jest.fn();
    const to = {
      name: 'solicitation-contracts-payment-new-confirm',
    };

    Complete.beforeRouteLeave.call(wrapper.vm, to, undefined, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls[0][0]).toBe('/errors/not_found/');
  });
});
