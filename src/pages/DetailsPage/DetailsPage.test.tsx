import React from "react";
import DetailsPage from "./DetailsPage";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { getByTestId, findByTestId } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { BusinessSearchResponse } from "../../api/definedCalls/fetchBusinessSearchResults";
import testDetails from "../../api/test_data/business-details.json";
import testReviews from "../../api/test_data/business-reviews.json";
import { BusinessDetailsResponse } from "../../api/definedCalls/fetchBusinessDetails";
import { BusinessReviewsResponse } from "../../api/definedCalls/fetchBusinessReviews";

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
    <DetailsPage />
  </MemoryRouter>
);
const fakeDetailsResponse: BusinessDetailsResponse = testDetails;
const fakeReviewsResponse: BusinessReviewsResponse = testReviews;

describe("Details page", () => {
  test("should display details and reviews when requests are finished", async () => {
    window.fetch = jest
      .fn()
      .mockImplementationOnce(() => {
        return { ok: true, json: () => fakeDetailsResponse };
      })
      .mockImplementationOnce(() => {
        return { ok: true, json: () => fakeReviewsResponse };
      });
    await act(async () => {
      ReactDOM.render(routerWrappedResults, container);
    });
    const detailsCard = findByTestId(container, "Details:Card");
    const reviewsCard = findByTestId(container, "Reviews:Card");
    expect(detailsCard).toBeDefined()
    expect(reviewsCard).toBeDefined()
  });
});
