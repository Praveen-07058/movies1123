import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import useGetMovieById from "../hooks/useGetMovieById";
import { addFavorite, clearMovieDetails, removeFavorite } from "../store/slices/movie.slice";

export default function MovieDetails() {
  const dispatcher = useDispatch();
  const { movieId } = useParams();
  const [loading, error, getMovieById] = useGetMovieById();
  const { data = {}, favorites = [] } = useSelector((store) => store.movie);
  const movie = data.movieDetails;
  let isFavorite = false;

  for (let i = 0; i < favorites.length; i += 1) {
    if (favorites[i].imdbID === movieId) {
      isFavorite = true;
      break;
    }
  }

  useEffect(() => {
    getMovieById(movieId);
    return () => dispatcher(clearMovieDetails());
  }, [movieId]);

  function toggleFavorite() {
    if (!movie) return;
    if (isFavorite) {
      dispatcher(removeFavorite(movie.imdbID));
      toast.info("Removed from favorites");
    } else {
      dispatcher(addFavorite(movie));
      toast.success("Added to favorites");
    }
  }

  if (loading) return <main className="min-h-screen bg-black text-white flex items-center justify-center pt-16">Loading movie details...</main>;
  if (error) return <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4 pt-16"><p className="text-red-400">{error}</p><Link to="/" className="bg-red-600 px-5 py-2 rounded">Back to Search</Link></main>;
  if (!movie) return null;

  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/mg-film-load.gif";

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-4 sm:px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-red-400 hover:text-red-300">← Back to search</Link>
        <div className="mt-6 bg-gray-900 rounded-2xl overflow-hidden p-5 sm:p-8 flex flex-col lg:flex-row gap-8">
          <img src={poster} alt={movie.Title} className="w-full sm:w-80 lg:w-96 max-h-[560px] object-cover rounded-xl mx-auto lg:mx-0" />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold">{movie.Title}</h1>
                <p className="text-gray-400 mt-2">{movie.Year} • {movie.Runtime} • {movie.Rated}</p>
              </div>
              <button onClick={toggleFavorite} className="self-start rounded-lg bg-red-600 hover:bg-red-700 px-4 py-3 flex items-center gap-2">
                {isFavorite ? <FaHeart /> : <FaRegHeart />} {isFavorite ? "Remove Favorite" : "Add Favorite"}
              </button>
            </div>

            <div className="mt-7 grid sm:grid-cols-2 gap-5 text-sm">
              <Info label="Genre" value={movie.Genre} />
              <Info label="Director" value={movie.Director} />
              <Info label="Cast" value={movie.Actors} />
              <Info label="Released" value={movie.Released} />
              <Info label="Language" value={movie.Language} />
              <Info label="Awards" value={movie.Awards} />
            </div>

            <div className="mt-7">
              <h2 className="text-xl font-semibold mb-2">Plot</h2>
              <p className="text-gray-300 leading-7">{movie.Plot}</p>
            </div>

            <div className="mt-7">
              <h2 className="text-xl font-semibold mb-3">Ratings</h2>
              <div className="flex flex-wrap gap-3">
                {movie.Ratings?.length ? movie.Ratings.map((rating, index) => (
                  <div key={`${rating.Source}-${index}`} className="bg-gray-800 rounded-lg px-4 py-3">
                    <p className="text-gray-400 text-sm">{rating.Source}</p>
                    <p className="font-bold text-lg">{rating.Value}</p>
                  </div>
                )) : <p className="text-gray-400">Ratings unavailable.</p>}
              </div>
              <p className="text-yellow-400 mt-3">IMDb: {movie.imdbRating || "N/A"} / 10</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="text-gray-200 mt-1">{value || "N/A"}</p>
    </div>
  );
}
