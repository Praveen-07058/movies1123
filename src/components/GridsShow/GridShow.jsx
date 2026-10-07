import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";

export default function GridShow({ data = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {data.map((movie, index) => (
        <Link to={`/moviedetails/${movie.imdbID}`} key={`${movie.imdbID}-${index}`}>
          <MovieCard data={movie} />
        </Link>
      ))}
    </div>
  );
}
