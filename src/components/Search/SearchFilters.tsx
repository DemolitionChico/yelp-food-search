import React, { useState } from "react";
import styles from "./SearchFilters.module.css";
import {
  Paper,
  Grid,
  TextField,
  FormControl,
  withStyles,
  Slider,
  FormHelperText,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControlLabel,
  Switch,
  Button
} from "@material-ui/core";
import staticStringsProvider from "../../staticStrings/staticStringsProvider";
import filterSettingsProvider from "./filterSettingsProvider";

type SearchFilterProps = {
  location: string;
  radius: number;
  selectedCategories: string[];
  isOpenNow: boolean;
};

type SearchFilterActions = {
  onLocationChange: (val: string) => void;
  onRadiusChange: (val: number) => void;
  onSelectedCategoriesChange: (val: string[]) => void;
  onIsOpenNowChange: (val: boolean) => void;
};

export const SearchFilters: React.FC<SearchFilterProps &
  SearchFilterActions> = ({
  location,
  radius,
  selectedCategories,
  isOpenNow,
  onLocationChange,
  onRadiusChange,
  onSelectedCategoriesChange,
  onIsOpenNowChange: onIsOpneNowChange
}) => {
  const [locationError, setLocationError] = useState(
    location === ""
      ? staticStringsProvider["Forms:RequiredFieldValidationError"]
      : ""
  );
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onLocationChange(event.target.value);
    setLocationError(
      event.target.value === ""
        ? staticStringsProvider["Forms:RequiredFieldValidationError"]
        : ""
    );
  };

  const handleRadiuChange = (event: object, value: number | number[]) => {
    onRadiusChange(value as number);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    onSelectedCategoriesChange(event.target.value as string[]);
  };

  const handleisOpenNowChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    onIsOpneNowChange(checked);
  };

  return (
    <Paper className={styles.self} data-testid="Filters:Container">
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!locationError}
              id="location-required"
              label={staticStringsProvider["Filters:Location"]}
              placeholder="type location"
              value={location}
              onChange={handleLocationChange}
              helperText={locationError}
            />
          </FormControl>
          <FormControl fullWidth className={styles.rangeContainer}>
            <FormHelperText>
              {staticStringsProvider["Filters:RangeLabel"]}
            </FormHelperText>
            <CustomizedSlider
              valueLabelDisplay="auto"
              aria-labelledby="discrete-slider"
              aria-label="distance slider"
              defaultValue={25}
              min={0}
              max={filterSettingsProvider.maxKmRange}
              value={radius}
              onChange={handleRadiuChange}
            />
          </FormControl>
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="tags-label">
              {staticStringsProvider["Filters:CategoriesLabel"]}
            </InputLabel>
            <Select
              labelId="tags-label"
              id="tags-mutiple-checkbox"
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
              input={<Input />}
              renderValue={selected => (selected as string[]).join(", ")}
            >
              {filterSettingsProvider.categories.map(category => (
                <MenuItem key={category.alias} value={category.alias}>
                  <Checkbox
                    checked={selectedCategories.indexOf(category.alias) > -1}
                  />
                  <ListItemText primary={category.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          lg={4}
          md={12}
          sm={12}
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <FormControlLabel
            label={staticStringsProvider["Filters:OpenNowLabel"]}
            labelPlacement="start"
            control={
              <Switch
                checked={isOpenNow}
                onChange={handleisOpenNowChange}
                value="isOpen"
                color="secondary"
              />
            }
          />
        </Grid>
        <Grid item itemScope xs={12} container justify="flex-end">
          <Button type="submit" variant="contained" color="primary">
            {staticStringsProvider["Filters:SearchBtnLabel"]}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

const CustomizedSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

type MenuItemProps = {
  checked: boolean;
  alias: string;
  title: string;
};
