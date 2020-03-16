import React from "react";
import ReactDOM from "react-dom";
import {act} from 'react-dom/test-utils';
import { Loader } from "./Loader";
import { getByTestId, queryByTestId } from "@testing-library/react";
import { trackPromise } from 'react-promise-tracker';

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  container !== null && document.body.removeChild(container);
});

const fakePromise = new Promise(() => {
    setTimeout(() => {}, 2000);
})

describe("Loader component", () => {
  test("should display when promise of tracked area is in progress", () => {
    act(() => {
      ReactDOM.render(<Loader area="test" />, container);
      trackPromise(fakePromise, "test");
    });
    const loader = getByTestId(container, "Loader")
    expect(loader).toBeDefined();
  });
  test("should not display loader when promise of untracked area is in progress", () => {
    act(() => {
        ReactDOM.render(<Loader area="test1" />, container);
        trackPromise(fakePromise, "test2");
      });
      expect(queryByTestId(container, "Loader")).toEqual(null);
  })
});
