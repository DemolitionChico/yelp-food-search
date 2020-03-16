import React, { useState } from "react";
import staticStringsProvider from "../../staticStrings/staticStringsProvider";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import { ThemeProvider, createMuiTheme, Divider } from "@material-ui/core";
import styles from "./SearchBox.module.css";
import { SearchFilters } from "./SearchFilters";
import filterSettingsProvider from "./filterSettingsProvider";

export interface SearchData {
  term: string;
  location: string;
  radius: number;
  categories: string[];
  open: boolean;
}

export const defaultSearchData: SearchData = {
  term: "",
  location: filterSettingsProvider.defaultLocation,
  radius: filterSettingsProvider.defaultRadius,
  categories: [],
  open: false
};

export interface SearchBoxProps extends SearchData { };
export interface SearchBoxActions {
  onSubmit: () => void;
  onLocationChange: (location: string) => void;
  onRadiusChange: (radius: number) => void;
  onCategoriesChange: (categories: string[]) => void;
  onOpenChange: (open: boolean) => void;
  onTermChange: (term: string) => void;
};

export const SearchBox: React.FC<SearchBoxProps & SearchBoxActions> = ({
  term,
  location,
  radius,
  categories,
  open,
  onSubmit,
  onLocationChange,
  onRadiusChange,
  onCategoriesChange,
  onOpenChange,
  onTermChange
}) => {
  const searchTheme = createMuiTheme({
    palette: {
      type: "light"
    }
  });

  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleLocationChange = (location: string) => {
    onLocationChange(location);
  };

  const handleRadiusChange = (radius: number) => {
    onRadiusChange(radius);
  };

  const handleSelectedCategoriesChange = (selectedCategories: string[]) => {
    onCategoriesChange(selectedCategories);
  };

  const handleIsOpenNowChange = (isOpenNow: boolean) => {
    onOpenChange(isOpenNow);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onTermChange(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    onSubmit();
    event.preventDefault();
  };

  return (
    <form className={styles.self} onSubmit={handleSubmit} data-testid="Search:SearchBox">
      <ThemeProvider theme={searchTheme}>
        <Paper className={styles.searchInputContainer}>
          <InputBase
            className={styles.searchInput}
            placeholder={
              filtersOpen
                ? staticStringsProvider["Search:PlaceholderAlt"]
                : `${staticStringsProvider["Search:Placeholder"]} ${location}`
            }
            onChange={handleSearchTermChange}
            inputProps={{ "aria-label": "search places to eat" }}
            data-testid="Search:TermInput"
          />
          <IconButton type="submit" aria-label="search" data-testid="Search:SearchBtn">
            <SearchIcon />
          </IconButton>
          <Divider className={styles.divider} orientation="vertical" />
          <IconButton
            aria-label="filters"
            onClick={() => setFiltersOpen(!filtersOpen)}
            data-testid="Search:OpenFiltersBtn"
          >
            <FilterListIcon />
          </IconButton>
        </Paper>
        <div className={styles.filtersContainer}>
          {filtersOpen && (
            <SearchFilters
              location={location}
              radius={radius}
              selectedCategories={categories}
              isOpenNow={open}
              onLocationChange={handleLocationChange}
              onRadiusChange={handleRadiusChange}
              onSelectedCategoriesChange={handleSelectedCategoriesChange}
              onIsOpenNowChange={handleIsOpenNowChange}
            />
          )}
        </div>
      </ThemeProvider>
    </form>
  );
};
