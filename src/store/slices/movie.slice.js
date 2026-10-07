import { createSlice } from "@reduxjs/toolkit";

const savedFavorites = localStorage.getItem("movieFavorites");

const initialState = {
  data: {
    fastandfurious: [],
    ironman: [],
    searchResult: [],
    movieDetails: null,
    totalResults: 0,
    searchTerm: "",
    selectedType: "",
    currentPage: 1,
  },
  favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
};

export const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    saveMovie: (state, action) => {
      state.data[action.payload.key] = action.payload.value;
    },
    clearMovieDetails: (state) => {
      state.data.movieDetails = null;
    },
    addFavorite: (state, action) => {
      let exists = false;
      for (let i = 0; i < state.favorites.length; i += 1) {
        if (state.favorites[i].imdbID === action.payload.imdbID) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        state.favorites.push(action.payload);
        localStorage.setItem("movieFavorites", JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      const updatedFavorites = [];
      for (let i = 0; i < state.favorites.length; i += 1) {
        if (state.favorites[i].imdbID !== action.payload) {
          updatedFavorites.push(state.favorites[i]);
        }
      }
      state.favorites = updatedFavorites;
      localStorage.setItem("movieFavorites", JSON.stringify(updatedFavorites));
    },
  },
});

export const {
  saveMovie,
  clearMovieDetails,
  addFavorite,
  removeFavorite,
} = MovieSlice.actions;

export default MovieSlice.reducer;
