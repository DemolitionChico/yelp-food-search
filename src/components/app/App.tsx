import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import AppBar from "@material-ui/core/AppBar";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";
import { Loader, promiseTrackerAreas } from "../Loader/Loader";
import styles from "./App.module.css";
import Toolbar from "@material-ui/core/Toolbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { CssBaseline, Snackbar } from "@material-ui/core";
import logo from "./assets/logo.png";
import { trackPromise } from "react-promise-tracker";

const SearchPage = React.lazy(() =>
  trackPromise(
    import("../../pages/SearchPage/SearchPage"),
    promiseTrackerAreas.pages
  )
);
const ResultsPage = React.lazy(() =>
  trackPromise(
    import("../../pages/ResultsPage/ResultsPage"),
    promiseTrackerAreas.pages
  )
);
const DetailsPage = React.lazy(() =>
  trackPromise(
    import("../../pages/DetailsPage/DetailsPage"),
    promiseTrackerAreas.pages
  )
);

type MsgType = "error" | "info" | "warning" | "success";
let openSnachbarFn: ((message: string, type: MsgType) => void) | null;
type GlobalSnackbarState = {
  open: boolean;
  message: string;
  type: MsgType;
};

type ApplicationState = {
  globalSnackbar: GlobalSnackbarState;
};

class App extends React.Component<{}, ApplicationState> {
  state: ApplicationState = {
    globalSnackbar: {
      open: false,
      message: "",
      type: "success"
    }
  };

  componentDidMount() {
    openSnachbarFn = this.openSnackbar;
  }

  componentWillUnmount() {
    openSnachbarFn = null;
  }

  openSnackbar = (
    message: string,
    type: "error" | "info" | "warning" | "success"
  ) => {
    this.setState({
      ...this.state,
      globalSnackbar: {
        open: true,
        message,
        type
      }
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      ...this.state,
      globalSnackbar: {
        ...this.state.globalSnackbar,
        open: false
      }
    });
  };

  theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: red,
      secondary: blue
    }
  });

  render() {
    const { open, message, type } = this.state.globalSnackbar;
    return (
      <ThemeProvider theme={this.theme}>
        <CssBaseline />
        <Snackbar
          data-testid="App:Snackbar"
          open={open}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
        >
          <Alert onClose={this.handleSnackbarClose} severity={type}>
            {message}
          </Alert>
        </Snackbar>
        <Router>
          <AppBar>
            <Toolbar>
              <Link to="/search"><img src={logo} alt="YELP" className={styles.logo} /></Link>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path="/">
              <Suspense fallback={<Loader area={promiseTrackerAreas.pages} />}>
                <SearchPage />
              </Suspense>
            </Route>
            <Route path="/search">
              <Redirect to="/" />
            </Route>
            {/* NOTE: can use parameters separately if any validation is needed on the results page itself, but since for the moment it's just
                API specific query, it can be handled by search component only. There is no need to store every search param separately. */}
            {/* NOTE: these params are embedded in the route, not in local states or stores, so that user can save a page with the query and reuse it directly */}
            {/* <Route path="/results/:searchQuery/:page?">
              <Suspense fallback={<Loader area={promiseTrackerAreas.pages} />}>
                <ResultsPage />
              </Suspense>
            </Route> */}
            <Route path="/results/:location/:radius?/:categories?/:open?/:term?">
              <Suspense fallback={<Loader area={promiseTrackerAreas.pages} />}>
                <ResultsPage />
              </Suspense>
            </Route>
            <Route path="/details/:id">
              <Suspense fallback={<Loader area={promiseTrackerAreas.pages} />}>
                <DetailsPage />
              </Suspense>
            </Route>
            <Route path="/404-not-found">
              <NotFoundPage />
            </Route>
            <Route path="*">
              <Redirect to="/404-not-found" />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function openGlobalSnackBar(message: string, type: MsgType = "success") {
  if (openSnachbarFn) {
    openSnachbarFn(message, type);
  }
}

export default App;
