import styles from "./NotFoundPage.module.css";
import staticStringsProvider from "../../staticStrings/staticStringsProvider";
import React from "react";
import { Button } from "@material-ui/core";

export const NotFoundPage: React.FunctionComponent = props => {
  return (
    <div className={styles.self}>
      <div className={styles.container}>
        <h1 className={styles.header}>{staticStringsProvider["NotFound:Title"]}</h1>
        <strong className={styles.tip}>
          {staticStringsProvider["NotFound:Tip"]}
        </strong>
        <Button variant="contained" color="secondary" href="/search">
          {staticStringsProvider["NotFound:BtnTxt"]}
        </Button>
      </div>
    </div>
  );
};
