import filterSettingsProvider from "./../../components/Search/filterSettingsProvider";
import React from "react";
import { SearchBox } from "../../components/Search/SearchBox";
import { useState } from "react";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";

type SearchPropsInRoute = {
  term: string;
  location: string;
  radius: string;
  categories: string;
  open: string;
};

/*
  SEPARATED COMPONENT from Results page to avoid maintaining search state in results page
  This is search wrapper with injected router dunctionality
*/
const TopSearch: React.FunctionComponent<RouteComponentProps<
  SearchPropsInRoute
>> = props => {
  const { location, radius, categories, open, term } = props.match.params;

  const history = useHistory();
  const [filterLocation, setLocation] = useState(location);
  const [filterRadius, setRadius] = useState(
    Number.parseInt(radius) || filterSettingsProvider.defaultRadius
  );
  const [filterCategories, setCategories] = useState(
    categories === undefined ? [] : categories.split(",")
  );
  const [filterOpen, setOpen] = useState(
    open !== undefined && open.toLowerCase() === "true"
  );
  const [filterTerm, setTerm] = useState(term || "");

  const redirectToResults = () => {
    history.push(
      `/results/${filterLocation}/${filterRadius}/${filterCategories.join()}/${filterOpen}/${filterTerm}`
    );
  };

  return (
    <SearchBox
      location={filterLocation}
      radius={filterRadius}
      categories={filterCategories}
      open={filterOpen}
      term={filterTerm}
      onLocationChange={setLocation}
      onRadiusChange={setRadius}
      onCategoriesChange={setCategories}
      onOpenChange={setOpen}
      onTermChange={setTerm}
      onSubmit={redirectToResults}
    />
  );
};

const ResultsTopSearch = withRouter(TopSearch);

export default ResultsTopSearch;
