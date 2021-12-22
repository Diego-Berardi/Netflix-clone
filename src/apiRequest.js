
const key = process.env.REACT_APP_API_KEY;
const requests = {
  api_key: `?api_key=${key}`,
  base_url: `https://api.themoviedb.org/3`,

  TrendingBase_url: `https://api.themoviedb.org/3/trending`,
  GenresBase_url: `https://api.themoviedb.org/3/discover`,

  imgBase_url: "https://image.tmdb.org/t/p/w500/",
};

export default requests;
