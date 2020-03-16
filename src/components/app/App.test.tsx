import React, { Suspense } from "react";
import App, { openGlobalSnackBar } from "./App";
import ReactDOM from "react-dom";
import { getByTestId } from "@testing-library/react";
import SearchPage from "../../pages/SearchPage/SearchPage";
import ResultsPage from "../../pages/ResultsPage/ResultsPage";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";
import { Loader } from "./../Loader/Loader";
import { act } from "react-dom/test-utils";

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  container !== null && document.body.removeChild(container);
});

describe("App component", () => {
  test("sould display snackbar when openGlobalSnackBar is invoked", async () => {
    await act(async () => {
      ReactDOM.render(
        <Suspense fallback={<div>loading</div>}>
          <App />
        </Suspense>,
        container
      );
      await SearchPage;
      await ResultsPage;
      await DetailsPage;
      await Loader;
      openGlobalSnackBar("TEST MESSAGE");
    });
    const snackbar = getByTestId(container, "App:Snackbar");
    expect(snackbar).toBeDefined();
  });
});
