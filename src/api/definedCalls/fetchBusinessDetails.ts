import { callApi } from "../callApi";

const BUSINESS_DETAILS_ENDPOINT = "/v3/businesses";

export async function fetchBusinessDetails(
  id: string
): Promise<BusinessDetailsResponse> {
  const result = await callApi<BusinessDetailsResponse>({
    url: `${BUSINESS_DETAILS_ENDPOINT}/${id}`
  });
  return (
    result.parsedBody || {
      id: "",
      name: "",
      image_url: "",
      is_closed: false,
      display_phone: "",
      rating: 0,
      photos: [],
      location: { display_address: [] },
      categories: [],
      review_count: 0,
      url: ""
    }
  );
}

export interface BusinessDetailsResponse {
  id: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  display_phone: string;
  rating: number;
  photos: string[];
  location: { display_address: string[] };
  categories: { alias: string; title: string }[];
  review_count: number;
  url: string;
}
