import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GridShow from "../components/GridsShow/GridShow";

export default function Favorites() {
  const favorites = useSelector((store) => store.movie.favorites || []);

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-4 sm:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Favorites</h1>
            <p className="text-gray-400 mt-2">Your saved movies are kept in this browser.</p>
          </div>
          <Link to="/" className="rounded-lg bg-red-600 hover:bg-red-700 px-5 py-3 font-semibold">Search Movies</Link>
        </div>
        {favorites.length === 0 ? (
          <div className="text-center py-20 text-gray-400">You have no favorite movies yet.</div>
        ) : (
          <GridShow data={favorites} />
        )}
      </div>
    </main>
  );
}
