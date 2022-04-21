import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import SearchContent from "../layout/SearchContent";

const SearchPage = () => {
  const queryMovies = useSelector((state) => state.products.searchMovies);
  return (
    <>
      <Navbar />
      <SearchContent queryMovies={queryMovies} />
    </>
  );
};

export default SearchPage;
