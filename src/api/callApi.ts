export function buildSearchQuery(params: Object): URLSearchParams {
  const queryParams = new URLSearchParams();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key as keyof Object];
      queryParams.append(key, value.toString());
    }
  }
  return queryParams;
}

//TODO: usuń komentarze
/* 
  NOTE: consider using axios library for more advanced requests
*/
export async function callApi<T>(
  requestData: HttpRequestData
): Promise<HttpResponse<T>> {
  let url = new URL(`${requestData.url}`, `${process.env.REACT_APP_URL}`);
  if (requestData.queryString) {
    url.search = requestData.queryString;
  } else if (requestData.queryParams) {
    const queryParams = buildSearchQuery(requestData.queryParams);
    url.search = queryParams.toString();
  }
  const request = new Request(url.toString(), {
    method: requestData.method || "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": requestData.contentType || "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
    }
  });
  const response: HttpResponse<T> = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  response.parsedBody = await response.json();
  return response;
}

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

interface HttpRequestData {
  url: string;
  method?: string;
  queryString?: string;
  queryParams?: Object;
  contentType?: string;
}
