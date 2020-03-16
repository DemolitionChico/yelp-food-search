import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styles from "./DetailsPage.module.css";
import { trackPromise } from "react-promise-tracker";
import { fetchBusinessDetails } from "../../api/definedCalls/fetchBusinessDetails";
import { openGlobalSnackBar } from "../../components/app/App";
import { promiseTrackerAreas, Loader } from "../../components/Loader/Loader";
import { Grid } from "@material-ui/core";
import { fetchBusinessReviews } from "../../api/definedCalls/fetchBusinessReviews";
import { CompanyBrief } from "../../components/CompanyBrief/CompanyBrief";
import { ReviewsPanel } from "./../../components/ReviewsPanel/ReviewsPanel";
import staticStringsProvider from './../../staticStrings/staticStringsProvider';

type CompanyDetails = {
  name: string;
  phone: string;
  image: string;
  address: string;
  rating: number;
  isOpen: boolean;
  url: string;
  categories: string[];
};

type Review = {
  text: string;
  rating: number;
  timestamp: Date;
  author: string;
  avatar: string;
};

type DetailsPageState = {
  companyDetails: CompanyDetails | undefined;
  reviews: Review[] | undefined;
};

class Details extends React.Component<
  RouteComponentProps<{ id: string }>,
  DetailsPageState
> {
  state: DetailsPageState = {
    companyDetails: undefined,
    reviews: undefined
  };

  componentDidMount() {
    this.fetchCompanyDetails(this.props.match.params.id);
    this.fetchCompanyReviews(this.props.match.params.id);
  }

  fetchCompanyDetails = (id: string) => {
    trackPromise(
      fetchBusinessDetails(id)
        .then(data =>
          this.setState({
            companyDetails: {
              ...data,
              phone: data.display_phone,
              address: data.location.display_address.join(),
              image: data.image_url,
              rating: data.rating,
              isOpen: !data.is_closed,
              categories: data.categories.map(c => c.title)
            }
          })
        )
        .catch(error => openGlobalSnackBar(staticStringsProvider["Results:RequestProcessingError"], "error")),
      promiseTrackerAreas.details
    );
  };

  fetchCompanyReviews = (id: string) => {
    trackPromise(
      fetchBusinessReviews(id)
        .then(data => 
          this.setState({
            reviews: data.reviews.map(r => ({
              ...r,
              author: r.user.name,
              avatar: r.user.image_url,
              timestamp: new Date(r.time_created)
            }))
          })
        )
        .catch(error => openGlobalSnackBar(staticStringsProvider["Results:RequestProcessingError"], "error")),
      promiseTrackerAreas.reviews
    );
  };

  render() {
    return (
      <div className={styles.self}>
        <Grid container justify="center" alignItems="flex-start" spacing={6}>
          <Grid item xs={12} md={6}>
            <Loader area={promiseTrackerAreas.details} />
            {this.state.companyDetails && (
              <CompanyBrief {...this.state.companyDetails} />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Loader area={promiseTrackerAreas.reviews} />
            {this.state.reviews && <ReviewsPanel overallRating={this.state.companyDetails?.rating || 0} reviews={this.state.reviews} />}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const DetailsPage = withRouter(Details);

export default DetailsPage;
