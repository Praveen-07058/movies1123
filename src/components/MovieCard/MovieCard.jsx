import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/slices/movie.slice";
import { toast } from "react-toastify";

export default function MovieCard({ data = {}, showFavorite = true }) {
  const dispatcher = useDispatch();
  const favorites = useSelector((store) => store.movie.favorites || []);
  let isFavorite = false;

  for (let i = 0; i < favorites.length; i += 1) {
    if (favorites[i].imdbID === data.imdbID) {
      isFavorite = true;
      break;
    }
  }

  function toggleFavorite(event) {
    event.preventDefault();
    event.stopPropagation();
    if (isFavorite) {
      dispatcher(removeFavorite(data.imdbID));
      toast.info("Removed from favorites");
    } else {
      dispatcher(addFavorite(data));
      toast.success("Added to favorites");
    }
  }

  const poster = data.Poster && data.Poster !== "N/A" ? data.Poster : "/mg-film-load.gif";

  return (
    <div className="relative h-full bg-gray-900 rounded-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative h-[280px] bg-gray-800">
        <img src={poster} alt={data.Title || "Movie poster"} className="w-full h-full object-cover" />
        {showFavorite && (
          <button
            type="button"
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className="absolute top-3 right-3 bg-black/70 rounded-full p-2 text-red-400 hover:bg-black"
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}
      </div>
      <div className="p-3">
        <p className="text-white font-semibold truncate">{data.Title || "Unknown title"}</p>
        <p className="text-gray-400 text-sm mt-1">{data.Year || "Year unavailable"} • {data.Type || "movie"}</p>
      </div>
    </div>
  );
}
