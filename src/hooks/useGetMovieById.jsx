import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveMovie } from "../store/slices/movie.slice";
import { getMovieDetails } from "../services/omdbApi";


export default function useGetMovieById() {
  const dispatcher = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getMovieById(movieId = "") {
    if (!movieId) return;

    setLoading(true);
    setError(null);
    try {
      const result = await getMovieDetails(movieId);
      localStorage.setItem("movieDetails", JSON.stringify(result));
      dispatcher(saveMovie({ key: "movieDetails", value: result }));
    } catch (err) {
      dispatcher(saveMovie({ key: "movieDetails", value: null }));
      setError(err.message || "Unable to load movie details.");
    } finally {
      setLoading(false);
    }
  }

  return [loading, error, getMovieById];
}
