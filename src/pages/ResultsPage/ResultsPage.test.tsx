import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { getByTestId } from "@testing-library/react";
import ResultsPage from "./ResultsPage";
import { MemoryRouter } from "react-router-dom";
import { BusinessSearchResponse } from "../../api/definedCalls/fetchBusinessSearchResults";
import testSearchResults from '../../api/test_data/search-results.json';

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  container !== null && document.body.removeChild(container);
});
const routerWrappedResults = (
  <MemoryRouter>
    <ResultsPage />
  </MemoryRouter>
);
const fakeResponse: BusinessSearchResponse = testSearchResults;

describe("Results page", () => {
  test("should display search box", () => {
    act(() => {
      ReactDOM.render(routerWrappedResults, container);
    });
    const searchBox = getByTestId(container, "Search:SearchBox");
    expect(searchBox).toBeDefined;
  });
  test("should fetch search results on load", async () => {
    const fetchSpy = jest.spyOn(window, "fetch");
    await act(async () => {
      ReactDOM.render(routerWrappedResults, container);
    });
    expect(fetchSpy).toBeCalledTimes(1);
  });
  test("should display results when request finished", async () => {
    window.fetch = jest.fn().mockImplementation(
      () => {return { ok: true, json: () => fakeResponse }}
    );
    await act(async () => {
      ReactDOM.render(routerWrappedResults, container);
    });
      const businessCards = container.getElementsByClassName("MuiCard-root");
      expect(businessCards.length).toEqual(fakeResponse.total);
      window.fetch.mockClear();
  });
});

