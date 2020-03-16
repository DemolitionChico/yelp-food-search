import { callApi } from "../callApi";

const BUSINESS_REVIEWS_ENDPOINT = (id: string) => `/v3/businesses/${id}/reviews`;

export async function fetchBusinessReviews(
  id: string
): Promise<BusinessReviewsResponse> {
  const result = await callApi<BusinessReviewsResponse>({
    url: BUSINESS_REVIEWS_ENDPOINT(id)
  });
  return result.parsedBody as BusinessReviewsResponse || { reviews: [] };
}

export interface BusinessReviewsResponse {
  reviews: Array<BusinessReviewItem>;
}

interface BusinessReviewItem {
    text: string;
    rating: number;
    time_created: string;
    user: {
      image_url: string;
      name: string;
    }
}
