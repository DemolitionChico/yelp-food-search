import React, { useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Grid
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StarsIcon from "@material-ui/icons/Stars";
import styles from "./ReviewsPanel.module.css";
import Rating from "@material-ui/lab/Rating";
import staticStringsProvider from './../../staticStrings/staticStringsProvider';

export interface ReviewsPanelProps {
  overallRating: number;
  reviews: ReviewItem[];
  dataTestId?: string;
};

interface ReviewItem {
  author: string;
  avatar: string;
  text: string;
  rating: number;
  timestamp: Date;
};

export const ReviewsPanel: React.FunctionComponent<ReviewsPanelProps> = ({
  reviews,
  overallRating,
  dataTestId
}) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  return (
    <Card elevation={3} data-testid={dataTestId || "Reviews:Card"}>
      <CardHeader
        avatar={
          <Avatar>
            <StarsIcon />
          </Avatar>
        }
        className={styles.cardHeading}
        title={staticStringsProvider["Details:ReviewsLabel"]}
      />
      {reviews.map((r, i) => (
        <ExpansionPanel
          key={i}
          expanded={expandedIndex === i}
          onChange={(e, value) =>
            setExpandedIndex(expandedIndex === i ? -1 : i)
          }
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Grid container justify="flex-start" alignItems="center">
              <Grid item xs={4} md={1}>
                <Avatar alt={r.author} src={r.avatar} />
              </Grid>
              <Grid item sm={8} md={5}>
                <Typography className={styles.text}>
                  {r.author}
                </Typography>
                <Typography color="textSecondary" className={styles.text}>
                  {r.timestamp.toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Rating readOnly value={r.rating} />
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className={styles.text}>
                {r.text}
         </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Card>
  );
};
