import { Route, Routes } from "react-router-dom";
import MoviesListing from "./pages/MoviesListing";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Appbar from "./components/Appbar/Appbar";

function App() {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path="/" element={<MoviesListing />} />
        <Route path="/moviedetails/:movieId" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
