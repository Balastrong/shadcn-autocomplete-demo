import "@testing-library/jest-dom/vitest";

//ResizeObserv not defined -> https://github.com/jsdom/jsdom/issues/3368
import ResizeObserver from "resize-observer-polyfill";
global.ResizeObserver = ResizeObserver;
