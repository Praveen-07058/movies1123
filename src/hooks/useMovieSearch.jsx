import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveMovie } from "../store/slices/movie.slice";
import { searchMovies } from "../services/omdbApi";

export default function useMovieSearch() {
  const dispatcher = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function searchMovie(searchParam = "", keyToStore = "searchResult", page = 1, type = "") {
    const search = searchParam.trim();
    if (!search) {
      setError("Please enter a movie title or keyword.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await searchMovies({ search, page, type });
      dispatcher(saveMovie({ key: keyToStore, value: result.Search || [] }));
      dispatcher(saveMovie({ key: "totalResults", value: Number(result.totalResults || 0) }));
      dispatcher(saveMovie({ key: "searchTerm", value: search }));
      dispatcher(saveMovie({ key: "selectedType", value: type }));
      dispatcher(saveMovie({ key: "currentPage", value: page }));
      localStorage.setItem(keyToStore, JSON.stringify(result.Search || []));
    } catch (err) {
      dispatcher(saveMovie({ key: keyToStore, value: [] }));
      dispatcher(saveMovie({ key: "totalResults", value: 0 }));
      setError(err.message || "Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  }

  return [loading, error, searchMovie];
}
