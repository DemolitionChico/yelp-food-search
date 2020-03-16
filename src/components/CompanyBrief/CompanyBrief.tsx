import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Rating from "@material-ui/lab/Rating";
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from "@material-ui/icons/Link";
import BlockIcon from "@material-ui/icons/Block";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import {
  Grid,
  Typography,
  Box,
  Avatar,
  Chip,
  Button,
  Divider
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import styles from "./CompanyBrief.module.css";
import staticStringsProvider from "./../../staticStrings/staticStringsProvider";

export interface CompanyBriefProps {
  name: string;
  phone: string;
  image: string;
  address: string;
  rating: number;
  isOpen: boolean;
  url: string;
  categories: string[];
  detailsHref?: string;
  dataTestId?: string
};

export const CompanyBrief: React.FC<CompanyBriefProps> = ({
  name,
  phone,
  image,
  address,
  rating,
  isOpen,
  url,
  categories,
  detailsHref,
  dataTestId
}) => {
  return (
    <Card elevation={3} data-testid={dataTestId || "Company:Card"}>
      <CardHeader
        avatar={
          <Avatar>
            <RestaurantIcon />
          </Avatar>
        }
        className={styles.cardHeading}
        title={name}
        subheader={phone ? phone : staticStringsProvider["Company:NoPhone"]}
      />
      {image !== "" ? (
        <CardMedia className={styles.cardMedia} image={image} title={name} />
      ) : (
        <div className={styles.noMedia}>
          {staticStringsProvider["Results:NoImage"]}
        </div>
      )}
      <CardContent>
        <Box component="div" mb={3} borderColor="transparent">
          <Typography component="legend">
            {staticStringsProvider["Company:Categories"]}
          </Typography>
          {categories.map((x, i) => (
            <Chip
              key={i}
              className={styles.chip}
              size="small"
              label={x}
              color="secondary"
            />
          ))}
        </Box>
        <Box component="div" mb={3} borderColor="transparent">
          <Typography component="legend">Is open</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {isOpen ? (
              <CheckCircleOutlineOutlinedIcon style={{ color: green[500] }} />
            ) : (
              <BlockIcon style={{ color: red[500] }} />
            )}
          </Typography>
        </Box>
        <Box component="div" mb={3} borderColor="transparent">
          <Typography component="legend">
            {staticStringsProvider["Company:Address"]}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {address}
          </Typography>
        </Box>
        <Box component="div" mb={3} borderColor="transparent">
          <Typography component="legend">
            {staticStringsProvider["Company:Rating"]}
          </Typography>
          <Rating name="read-only" value={rating} readOnly />
        </Box>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
        <Grid container justify="space-between" alignContent="center">
          {detailsHref && (
            <Button variant="contained" color="primary" href={detailsHref}>
              {staticStringsProvider["Company:DetailsLinkLabel"]}
            </Button>
          )}
          <IconButton href={url}>
            <LinkIcon />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
};
