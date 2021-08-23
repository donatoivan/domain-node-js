import { jest } from "@jest/globals";
import 'regenerator-runtime/runtime'

global.console = {
  warn: jest.fn(),
  log: console.log,
};
