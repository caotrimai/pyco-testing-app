const GIPHY_DOMAIN = process.env.REACT_APP_GIPHY_DOMAIN;
const apiKey = process.env.REACT_APP_GIPHY_API_KEY;
/*
input: params {
        limit: integer (int32),
        offset: integer (int32),
        rating: string
       }
output: string url
 */
export const getTrendingGifsURL = (params) => {
  const {limit, offset, rating} = params;
  const trendingURL = "/v1/gifs/trending";
  return `${GIPHY_DOMAIN}${trendingURL}?api_key=${apiKey}&limit=${limit ? limit : 20}&offset=${offset && offset > 0 && offset <= 4999 ? offset : 0}${rating ? '&rating=' + rating : ''}`;
};
