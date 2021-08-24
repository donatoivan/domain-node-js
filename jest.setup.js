import { jest } from "@jest/globals";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom";

global.console = {
  warn: jest.fn(),
  log: console.log,
};
