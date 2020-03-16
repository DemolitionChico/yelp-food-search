import React from "react";
import ReactDOM from "react-dom";
import {act} from 'react-dom/test-utils';
import { SearchBoxActions, SearchBoxProps, SearchBox } from "./SearchBox";
import { getByTestId, fireEvent } from "@testing-library/react";

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  container !== null && document.body.removeChild(container);
});

const testData: SearchBoxProps & SearchBoxActions = {
    term: "test term",
    location: "washington DC",
    radius: 13,
    categories: ['test', 'category'],
    open: true,
    onSubmit: jest.fn(),
    onLocationChange: jest.fn(),
    onRadiusChange: jest.fn(),
    onCategoriesChange: jest.fn(),
    onOpenChange: jest.fn(),
    onTermChange: jest.fn(),
  };

describe("Search box component", () => {
    test("should display proper number of categories", () => {
      act(() => {
        ReactDOM.render(<SearchBox {...testData} />, container);
      });
      const openFiltersBtn = getByTestId(container, "Search:OpenFiltersBtn");
      act(() => {
          openFiltersBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      const filters = getByTestId(container, "Filters:Container");
      expect(filters).toBeDefined;
    });
    test("should invoke onSubmit when search button is clicked", () => {
        act(() => {
          ReactDOM.render(<SearchBox {...testData} />, container);
        });
        const searchBtn = getByTestId(container, "Search:SearchBtn");
        act(() => {
            searchBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(testData.onSubmit).toBeCalledTimes(1);
      });
      test("should invoke onTermChange when the term is changed", () => {
        act(() => {
            ReactDOM.render(<SearchBox {...testData} />, container);
          });
          const termInput = getByTestId(container, "Search:TermInput").getElementsByTagName("input")[0];
          act(() => {
            fireEvent.change(termInput, { target: { value: 'testValue' } });
        });
        expect(testData.onTermChange).toBeCalledWith('testValue');
      });
  });  