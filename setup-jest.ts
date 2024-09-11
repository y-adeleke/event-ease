import "jest-preset-angular/setup-jest";

import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

declare module "@angular/core" {
  interface DebugElement {
    getText?(): string;
    getDebugEl?(datatestAttribute: string): DebugElement;
    getDebugElArray?(datatestAttribute: string): DebugElement[];
  }
}

DebugElement.prototype.getText = function () {
  return this.nativeElement.textContent.trim();
};

DebugElement.prototype.getDebugEl = function (datatestAttribute: string) {
  return this.query(By.css(`[data-test="${datatestAttribute}"]`));
};

DebugElement.prototype.getDebugElArray = function (datatestAttribute: string) {
  return this.queryAll(By.css(`[data-test="${datatestAttribute}"]`));
};

Object.defineProperty(window, "CSS", { value: null });
Object.defineProperty(document, "doctype", {
  value: "<!DOCTYPE html>",
});

/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, "transform", {
  value: () => ({
    enumerable: true,
    configurable: true,
  }),
});

Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    display: "none",
    appearance: ["-webkit-appearance"],
    getPropertyValue: () => "",
  }),
});
