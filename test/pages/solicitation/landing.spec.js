import { mount, config, createLocalVue } from '@vue/test-utils';
import Landing from '@/pages/solicitation/landing.vue';
import BaseButton from '@/components/formItems/BaseButton';
import PageTitle from '@/components/PageTitle.vue';
import { VBTogglePlugin, CollapsePlugin } from 'bootstrap-vue';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VBTogglePlugin);
localVue.use(CollapsePlugin);

let $router = {
  push: () => {},
};

config.mocks.$t = (key) => key;

describe('landing', () => {
  let wrapper;

  const factory = (options) =>
    mount(Landing, {
      localVue,
      stubs: {
        PageTitle,
        BaseButton,
      },
      mocks: {
        $router,
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
        $router,
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });

  test('Test click button', async () => {
    const spySubmit = jest.spyOn(Landing.methods, 'nextStep');

    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $router,
      },
    });

    await wrapper.find('.btn--icon-right').trigger('click');
    await flushPromises();

    expect(spySubmit.mock.calls.length).toBe(1);
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe(
      '/solicitation/additional_information/'
    );
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

    const spySubmit = jest.spyOn(Landing, 'beforeRouteEnter');

    const next = jest.fn();
    const from = {
      name: 'solicitation-confirm',
    };

    Landing.beforeRouteEnter.call(wrapper.vm, undefined, from, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
  });

  // Test BeforeRouteEnter with from name != solicitation-confirm
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

    const spySubmit = jest.spyOn(Landing, 'beforeRouteEnter');

    const from = {
      name: 'solicitation-step1',
    };

    Landing.beforeRouteEnter.call(wrapper.vm, undefined, from, (next) =>
      next(wrapper.vm)
    );

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/corporate/');
  });

  // test beforeRouteLeave
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

    const spySubmit = jest.spyOn(Landing, 'beforeRouteLeave');

    const next = jest.fn();
    const to = {
      name: 'solicitation-step2',
    };

    Landing.beforeRouteLeave.call(wrapper.vm, to, undefined, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
  });

  // Test beforeRouteLeave with to from == solicitation-confirm
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

    const spySubmit = jest.spyOn(Landing, 'beforeRouteLeave');

    const next = jest.fn();
    const to = {
      name: 'solicitation-confirm',
    };

    Landing.beforeRouteLeave.call(wrapper.vm, to, undefined, next);

    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls[0][0]).toBe('/solicitation/step1/');
  });
});
