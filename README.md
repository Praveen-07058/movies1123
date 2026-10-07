# MovieZZZ - OMDB Movie Search Application

A React movie search application built with React, React Router, Redux Toolkit, Tailwind CSS, and the OMDB API.

## Features

- Search OMDB by movie title or keyword.
- Filter by Movie, Series, or Episode using OMDB's `type` API parameter.
- Pagination for search results.
- Detailed movie page with poster, title, release year, genre, plot, ratings, director, and cast.
- Add/remove movies from Favorites.
- Favorites are persisted in browser localStorage.
- React Router navigation between Search, Details, and Favorites pages.
- User-friendly loading, error, and no-results states.
- Responsive Tailwind CSS layout.
- API service functions are separated from React hooks.
- The application does not use `array.filter()` for type filtering; type filtering is performed by OMDB through the API request.

## Setup

1. Open the project in VS Code.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

4. Optional: create a `.env` file in the project root and add your OMDB key:

```env
VITE_OMDB_API_KEY=your_omdb_api_key
```

The project currently has a fallback API key so it can run without this variable, but using your own OMDB API key is recommended.

5. Start the development server:

```bash
npm run dev
```

6. Open the local URL shown by Vite in your browser.

## Production build

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project structure

- `src/services/omdbApi.js` - OMDB API service functions.
- `src/hooks/` - React hooks for search and movie details.
- `src/store/` - Redux store and movie/favorites state.
- `src/pages/MoviesListing.jsx` - Search, type filter, results, and pagination.
- `src/pages/MovieDetails.jsx` - Detailed movie information.
- `src/pages/Favorites.jsx` - Saved favorite movies.
- `src/components/` - Reusable UI components.
