import styles from "./SearchPage.module.css";
import staticStringsProvider from "../../staticStrings/staticStringsProvider";
import React from "react";
import img1 from "./assets/bg1.jpg";
import img2 from "./assets/bg2.jpg";
import img3 from "./assets/bg3.jpg";
import logo from "./assets/logo.png";
import {
  SearchBox,
  SearchData,
  defaultSearchData
} from "../../components/Search/SearchBox";
import { openGlobalSnackBar } from "./../../components/app/App";
import { withRouter, RouteComponentProps } from "react-router-dom";

type SearchPageState = SearchData & {
  backgroundImage: string;
};

/*
    IF THERE IS NO NEED TO USE RANDOM BACKGROUND, LIFECYCLE METHODS WILL NO LONGER BE NEEDED
    CHANGE COMPONENT TO FUNCTION COMPONENT IN THAT CASE
*/
class Search extends React.Component<RouteComponentProps, SearchPageState> {
  state: SearchPageState = {
    backgroundImage: "",
    ...defaultSearchData
  };

  componentDidMount() {
    const backgroundImage: string = [img1, img2, img3][
      Math.floor(Math.random() * 3)
    ];
    this.setState({ backgroundImage });
  }

  redirectToResults = () => {
    const { term, location, radius, categories, open } = this.state;
    if (!location) {
      openGlobalSnackBar(
        staticStringsProvider["Search:LocationRequiredError"],
        "warning"
      );
      return;
    }
    this.props.history.push(
      `/results/${location}/${radius}/${categories.join()}/${open}/${term}`
    );
  };

  handleLocationChange = (location: string) => {
    this.setState({ location });
  };

  handleRadiusChange = (radius: number) => {
    this.setState({ radius });
  };

  handleCategoriesChange = (categories: string[]) => {
    this.setState({ categories });
  };

  handleOpenChange = (open: boolean) => {
    this.setState({ open });
  };

  handleTermChange = (term: string) => {
    this.setState({ term });
  };

  render() {
    return (
      <div
        className={styles.self}
        style={{
          backgroundImage: `url(${this.state.backgroundImage})`
        }}
      >
        <div className={styles.bgCover}></div>
        <div className={styles.contentContainer}>
          <img src={logo} alt="YELP" className={styles.header} />
          <div className={styles.searchContainer}>
            <SearchBox
              {...this.state}
              onSubmit={this.redirectToResults}
              onLocationChange={this.handleLocationChange}
              onRadiusChange={this.handleRadiusChange}
              onCategoriesChange={this.handleCategoriesChange}
              onOpenChange={this.handleOpenChange}
              onTermChange={this.handleTermChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const SearchPage = withRouter(Search);

export default SearchPage;
