global.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
});

global.open = jest.fn();

const nativeConsoleWarn = global.console.warn;

global.console.warn = (...args) => {
  if (args.join('').includes('[BootstrapVue warn]')) {
    return;
  }

  return nativeConsoleWarn(...args);
};
