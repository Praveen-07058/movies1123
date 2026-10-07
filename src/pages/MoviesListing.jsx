import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import GridShow from "../components/GridsShow/GridShow";
import useMovieSearch from "../hooks/useMovieSearch";

export default function MoviesListing() {
  const { data = {} } = useSelector((store) => store.movie);
  const [searchParams, setSearchParams] = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("q") || "batman");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [loading, error, searchMovie] = useMovieSearch();
  const totalPages = Math.min(100, Math.ceil((data.totalResults || 0) / 10));
  const currentPage = data.currentPage || 1;

  useEffect(() => {
    const query = searchParams.get("q") || "batman";
    const queryType = searchParams.get("type") || "";
    const page = Number(searchParams.get("page") || 1);
    setTerm(query);
    setType(queryType);
    searchMovie(query, "searchResult", page, queryType);
  }, [searchParams.toString()]);

  function submitSearch(event) {
    event.preventDefault();
    const cleanTerm = term.trim();
    if (!cleanTerm) return;
    setSearchParams({ q: cleanTerm, ...(type ? { type } : {}), page: "1" });
  }

  function changeType(event) {
    const nextType = event.target.value;
    setType(nextType);
    setSearchParams({ q: term.trim() || "batman", ...(nextType ? { type: nextType } : {}), page: "1" });
  }

  function changePage(page) {
    setSearchParams({ q: term.trim() || "batman", ...(type ? { type } : {}), page: String(page) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-4 sm:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
          <div>
            <p className="text-red-500 font-semibold uppercase tracking-widest">OMDB Movie Search</p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-2">Find your next movie</h1>
            <p className="text-gray-400 mt-2">Search movies, series and episodes, then open a movie for full details.</p>
          </div>
          <Link to="/favorites" className="rounded-lg bg-red-600 hover:bg-red-700 px-5 py-3 text-center font-semibold">
            My Favorites
          </Link>
        </div>

        <form onSubmit={submitSearch} className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Enter movie title or keyword..."
              className="w-full rounded-lg bg-gray-900 border border-gray-700 py-3 pl-11 pr-4 text-white outline-none focus:border-red-500"
            />
          </div>
          <select value={type} onChange={changeType} className="rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white outline-none focus:border-red-500">
            <option value="">All types</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
          <button type="submit" className="rounded-lg bg-red-600 hover:bg-red-700 px-7 py-3 font-semibold">Search</button>
        </form>

        {loading && <div className="py-16 text-center text-gray-300">Searching OMDB...</div>}
        {!loading && error && (
          <div className="rounded-lg border border-red-900 bg-red-950/50 p-5 text-red-200 mb-8">
            {error}. Try another title or keyword.
          </div>
        )}
        {!loading && !error && data.searchResult?.length === 0 && (
          <div className="py-16 text-center text-gray-400">No results found. Try a different search.</div>
        )}

        {!loading && data.searchResult?.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-semibold">Results for “{data.searchTerm}”</h2>
              <span className="text-sm text-gray-400">{data.totalResults} result(s)</span>
            </div>
            <GridShow data={data.searchResult} />

            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center gap-2 mt-10">
                <button disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} className="px-4 py-2 rounded bg-gray-800 disabled:opacity-40">Previous</button>
                <span className="px-4 py-2 rounded bg-gray-900">Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage >= totalPages} onClick={() => changePage(currentPage + 1)} className="px-4 py-2 rounded bg-gray-800 disabled:opacity-40">Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
