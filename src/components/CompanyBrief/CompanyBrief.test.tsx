import React from "react";
import ReactDOM from "react-dom";
import { CompanyBrief, CompanyBriefProps } from "./CompanyBrief";
import {act} from 'react-dom/test-utils';

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  container !== null && document.body.removeChild(container);
});

const testData: CompanyBriefProps = {
  name: "test name",
  phone: "test phone",
  image: "https://test-image.com/url.jpg",
  address: "test address street",
  rating: 6,
  isOpen: true,
  url: "https://test-page.io/test-name/",
  categories: ["test", "category"],
  detailsHref: "/goto/details/test-name"
};

describe("Company brief component", () => {
  test("should display proper number of categories", () => {
    act(() => {
      ReactDOM.render(<CompanyBrief {...testData} />, container);
    });
    const chips = container.getElementsByClassName("MuiChip-root");
    expect(chips.length).toEqual(2);
  });
  test("should display link button when detailsHref exists", () => {
    act(() => {
      ReactDOM.render(<CompanyBrief {...testData} />, container);
    });
    const btnLink = container.getElementsByClassName("MuiButtonBase-root")[0];
    expect(btnLink).toBeDefined();
  });
});
