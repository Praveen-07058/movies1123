import { configureStore } from "@reduxjs/toolkit";
import MovieSlice from "./slices/movie.slice";

export default configureStore({
  reducer: {
    movie: MovieSlice,
  },
});
