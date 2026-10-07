"use client";

import { Modal, ModalBody, Spinner, TextInput } from "flowbite-react";
import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import Icons from "../../icons";
import useMovieSearch from "../../hooks/useMovieSearch";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function SearchMovieModal({ open, toggle }) {
  const searchString = useRef(null);
  const { data = {} } = useSelector((store) => store.movie);
  const [loading, error, searchMovie] = useMovieSearch();
  const errorFetchingMovie = (message) => toast(message, { type: "error" });

  if (error) {
    errorFetchingMovie(error);
  }

  useEffect(() => {}, []);

  function handleSearch(e) {
    if (e.charCode === 0 && e.code === "Enter") {
      console.log("Search movie", searchString.current.value);
      searchMovie(searchString.current.value, "searchResult");
    }
  }

  return (
    <>
      <Modal size="7xl" show={open} onClose={() => toggle(false)}>
        <ModalBody className="h-screen bg-gray-800">
          <div
            className="w-full p-2 flex justify-end cursor-pointer mb-3"
            onClick={() => toggle(false)}
          >
            <Icons.Close className="text-white text-4xl" />
          </div>
          <div className="h-screen rounded-2xl">
            <div id="search-bar" className="mb-5">
              <TextInput
                ref={searchString}
                placeholder="Search movie...."
                onKeyDown={handleSearch}
              />
            </div>

            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 gap-2 lg:grid-cols-6 gap-3">
                {data["searchResult"]?.map((_m, index) => {
                  return <MovieCard key={`${index} - ${_m.Title}`} data={_m} />;
                })}
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
