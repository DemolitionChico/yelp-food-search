import apiCategories from '../../setup-api/apiCategories.json';
import defaultSettings from '../../setup-api/searchSettings.json';

const filterSettingsProvider: FilterSettings = {
  ...defaultSettings,
  defaultCategory: defaultSettings.categoriesFilter,
  categories: apiCategories.filter(c => c.parents.includes(defaultSettings.categoriesFilter))
};

type FilterSettings = {
  maxKmRange: number;
  defaultRadius: number;
  defaultLocation: string;
  defaultCategory: string;
  categories: Category[];
  defaultLimit: number;
};

type Category = {
  title: string;
  alias: string;
}

export default filterSettingsProvider;