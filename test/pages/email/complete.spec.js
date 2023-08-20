// 01EZTX9M3AWK0ZB16B6KYR56F1

import { mount, config, createLocalVue } from '@vue/test-utils';
import EmailComplete from '@/pages/email/complete.vue';
import PageTitle from '@/components/PageTitle.vue';
import flushPromises from 'flush-promises';

config.mocks.$t = (key) => key;
const localVue = createLocalVue();

let $router = {
  push: () => {},
};

describe('EmailComplete', () => {
  let wrapper;

  const factory = (options) =>
    mount(EmailComplete, {
      localVue,
      stubs: {
        PageTitle,
      },
      ...options,
    });

  afterEach(async () => {
    wrapper.destroy();
    await jest.clearAllMocks();
  });

  test('is a Vue instance', async () => {
    wrapper = await factory();

    expect(wrapper.vm).toBeTruthy();
  });

  // Test refresh browser
  test('Test preventNav', async () => {
    const spyPreventNav = jest.spyOn(EmailComplete.methods, 'preventNav');
    wrapper = await factory();

    await window.dispatchEvent(new Event('pagehide'));

    expect(spyPreventNav).toBeCalled();
  });

  // Test BeforeRouteEnter
  test('Test BeforeRouteEnter', async () => {
    wrapper = await factory();

    const spySubmit = jest.spyOn(EmailComplete, 'beforeRouteEnter');

    const next = jest.fn();
    localStorage.setItem('reload', false);

    EmailComplete.beforeRouteEnter.call(wrapper.vm, undefined, undefined, next);
    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
  });

  // Test BeforeRouteEnter with reload
  test('Test BeforeRouteEnter with reload', async () => {
    $router = {
      ...$router,
      push: jest.fn(),
    };

    wrapper = await factory({
      mocks: {
        $router,
      },
    });

    const spySubmit = jest.spyOn(EmailComplete, 'beforeRouteEnter');

    localStorage.setItem('reload', true);

    EmailComplete.beforeRouteEnter.call(
      wrapper.vm,
      undefined,
      undefined,
      (next) => next(wrapper.vm)
    );
    await flushPromises();

    expect(spySubmit).toHaveBeenCalled();
    expect($router.push.mock.calls.length).toBe(1);
    expect($router.push.mock.calls[0][0]).toBe('/errors/not_found/');
  });
});
