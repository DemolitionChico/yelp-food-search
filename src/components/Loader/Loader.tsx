import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./Loader.module.css";
import { usePromiseTracker } from "react-promise-tracker";

export const Loader: React.FC<{ area?: string }> = ({ area }) => {
  const { promiseInProgress } = usePromiseTracker({
    ...(!!area && { area }),
    delay: 0
  });

  return promiseInProgress ? (
    <div className={styles.self} data-testid="Loader">
      <CircularProgress />
    </div>
  ) : (
    <></>
  );
};

export const promiseTrackerAreas = {
  pages: "PAGES",
  results: "RESULTS",
  reviews: "REVIEWS",
  details: "DETAILS"
}