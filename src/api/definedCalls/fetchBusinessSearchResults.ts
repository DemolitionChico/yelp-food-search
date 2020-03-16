import { callApi } from "../callApi";

const BUSINESS_SEARCH_ENDPOINT = "/v3/businesses/search";

export async function fetchBusinessSearchResults(
  searchQuery: string
): Promise<BusinessSearchResponse> {
  const result = await callApi<BusinessSearchResponse>({
    url: BUSINESS_SEARCH_ENDPOINT,
    queryString: searchQuery
  });
  return result.parsedBody || { total: 0, businesses: [] };
}

export interface BusinessSearchResponse {
  total: number;
  businesses: Array<{
    name: string;
    id: string;
    rating: number;
    url: string;
    image_url: string;
    is_closed: boolean;
    location: { display_address: string[] };
    phone: string;
    categories: {alias: string, title: string}[];
  }>;
}
