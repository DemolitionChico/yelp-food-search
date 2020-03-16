import React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import styles from "./ResultsPage.module.css";
import { fetchBusinessSearchResults } from "../../api/definedCalls/fetchBusinessSearchResults";
import { openGlobalSnackBar } from "./../../components/app/App";
import { trackPromise } from "react-promise-tracker";
import { promiseTrackerAreas, Loader } from "../../components/Loader/Loader";
import staticStringsProvider from "./../../staticStrings/staticStringsProvider";
import { SearchData } from "../../components/Search/SearchBox";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { CompanyBrief } from "../../components/CompanyBrief/CompanyBrief";
import filterSettingsProvider from "../../components/Search/filterSettingsProvider";
import { APISearchParams } from "../../setup-api/apiTypes";
import { buildSearchQuery } from "./../../api/callApi";
import TopSearch from "./ResultsTopSearch";

const itemsLimit: number = filterSettingsProvider.defaultLimit;

type BusinessItem = {
  name: string;
  phone: string;
  image: string;
  address: string;
  rating: number;
  isOpen: boolean;
  url: string;
  categories: string[];
};

type BusinessCardData = BusinessItem & {
  detailsHref: string;
};

type ResultsPageState = {
  totalItems: number;
  businesses: BusinessCardData[] | undefined;
  currentPage: number;
};

type RouteProps = {
  term: string;
  location: string;
  radius: string;
  categories: string;
  open: string;
  page: string;
};

class Results extends React.Component<
  RouteComponentProps<RouteProps>,
  ResultsPageState
> {
  state: ResultsPageState = {
    totalItems: 0,
    businesses: undefined,
    currentPage: 1
  };

  componentDidMount() {
    this.fetchCompanies();
  }

  componentDidUpdate(prevProps: RouteComponentProps<RouteProps>) {
    //For most cases this should be in component did mount, or invoked on demand
    //Here it uses router params, and their change does not remount the whole component
    if (prevProps.match.params !== this.props.match.params) {
      this.fetchCompanies();
    }
  }

  handlePageChange = (event: any, page: number) => {
    this.setState({ currentPage: page });
    this.fetchCompanies((page - 1) * itemsLimit);
  };

  fetchCompanies = (itemsOffset: number = 0) => {
    const searchQuery = getApiSearchQuery(this.props.match.params, itemsOffset);
    this.setState({ businesses: undefined });
    trackPromise(
      fetchBusinessSearchResults(searchQuery)
        .then(data =>
          this.setState({
            totalItems: Math.min(data.total, 1000),
            businesses: data.businesses.map(b => ({
              ...b,
              image: b.image_url,
              address: b.location.display_address.join(),
              isOpen: !b.is_closed,
              categories: b.categories.map(x => x.title),
              detailsHref: `/details/${b.id}`
            }))
          })
        )
        .catch(error => 
          openGlobalSnackBar(
            staticStringsProvider["Results:RequestProcessingError"],
            "error"
        )),
      promiseTrackerAreas.results
    );
  };

  render() {
    return (
      <div className={styles.self}>
        <div className={styles.searchContainer}>
          <TopSearch />
        </div>
        <div className={styles.resultsContainer}>
          <Grid
            container
            direction="row"
            alignContent="center"
            justify="center"
            spacing={4}
          >
            <Loader area={promiseTrackerAreas.results} />
            {this.state.businesses !== undefined &&
              this.state.businesses.map((b, i) => (
                <Grid key={i} item xs={12} md={6} lg={4} xl={3}>
                  <CompanyBrief {...b} />
                </Grid>
              ))}
            {this.state.businesses !== undefined &&
              this.state.businesses.length === 0 && (
                <Typography
                  component="div"
                  variant="h5"
                  className={styles.noResults}
                >
                  {staticStringsProvider["Search:NoResults"]}
                </Typography>
              )}
          </Grid>
        </div>
        <AppBar
          position="fixed"
          color="secondary"
          className={styles.paginationAppBar}
        >
          {this.state.totalItems > itemsLimit && (
            <Toolbar variant="dense">
              <Pagination
                count={Math.ceil(this.state.totalItems / itemsLimit)}
                page={this.state.currentPage}
                onChange={this.handlePageChange}
              />
            </Toolbar>
          )}
        </AppBar>
      </div>
    );
  }
}

function getApiSearchQuery(urlData: RouteProps, offset: number = 0): string {
  const searchData: SearchData = {
    term: urlData.term || "",
    categories:
      urlData.categories === undefined ? [] : urlData.categories.split(","),
    location: urlData.location || "",
    radius: urlData.radius === undefined ? 0 : Number.parseInt(urlData.radius),
    open: urlData.open !== undefined && urlData.open.toLowerCase() === "true"
  };
  return buildSearchQuery(
    mapToApiSpec(searchData, itemsLimit, offset)
  ).toString();
}

function mapToApiSpec(
  searchData: SearchData,
  maxResults: number,
  offset: number
): APISearchParams {
  const validLimit = offset + maxResults > 1000 ? 1000 - offset : maxResults;
  let searchParams: APISearchParams = {
    location: searchData.location,
    radius: searchData.radius * 1000,
    limit: validLimit,
    categories:
      searchData.categories.length > 0
        ? searchData.categories.join()
        : filterSettingsProvider.defaultCategory,
    ...(searchData.term.length > 0 && { term: searchData.term }),
    ...(searchData.open && { open_now: searchData.open }),
    ...(offset > 0 && { offset })
  };
  return searchParams;
}

const ResultsPage = withRouter(Results);

export default ResultsPage;
