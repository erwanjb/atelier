import "@testing-library/jest-dom";
global.console = {
    log: console.log,
    error: jest.fn(),
    warn: jest.fn(),
    info: console.info,
    debug: console.debug,
  };
  