const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "2c7c92b";
const BASE_URL = "https://www.omdbapi.com/";

async function request(params) {
  const url = new URL(BASE_URL);
  url.searchParams.set("apikey", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable to connect to the movie service. Please try again.");
  }

  const result = await response.json();
  if (result.Response === "False") {
    throw new Error(result.Error || "The movie service returned an error.");
  }

  return result;
}

export function searchMovies({ search, page = 1, type = "" }) {
  return request({ s: search, page, type });
}

export function getMovieDetails(imdbId) {
  return request({ i: imdbId, plot: "full" });
}
