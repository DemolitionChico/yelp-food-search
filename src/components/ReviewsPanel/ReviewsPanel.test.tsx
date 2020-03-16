import React from "react";
import ReactDOM from "react-dom";
import { ReviewsPanel, ReviewsPanelProps } from "./ReviewsPanel";

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  container !== null && document.body.removeChild(container);
});
const testData: ReviewsPanelProps = {
  overallRating: 6,
  reviews: [
    {
      author: "Fake Jane",
      avatar: "https://fake-avatars.com/gui-123-1.jpg",
      text: "this place is faketastic!",
      rating: 5,
      timestamp: new Date()
    },
    {
      author: "Fake Michael",
      avatar: "https://fake-avatars.com/gui-123-2.jpg",
      text: "worst place ever!",
      rating: 2,
      timestamp: new Date()
    },
    {
      author: "Mr. Zoob",
      avatar: "https://fake-avatars.com/gui-123-8.jpg",
      text: "never been here!",
      rating: 3,
      timestamp: new Date()
    }
  ]
};

describe("ReviewsPanel component", () => {
  test("should display exact same amount of expand panels as it has reviews", () => {
    ReactDOM.render(<ReviewsPanel {...testData} />, container);
    const expandPanels = container.getElementsByClassName(
      "MuiExpansionPanel-root"
    );
    expect(expandPanels.length).toEqual(testData.reviews.length);
  });
});
