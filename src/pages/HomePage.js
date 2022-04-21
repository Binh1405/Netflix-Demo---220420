import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainContent from "../layout/MainContent";

import productAction from "../redux/actions/products.action";

const HomePage = () => {
  const movieGenres = useSelector((state) => state.products.genres);
  const dispatch = useDispatch();
  const query = useSelector((state) => state.products.searchQuery);
  useEffect(() => {
    productAction.getGenresMovie();
  }, [dispatch]);
  console.log("query", query);
  const allMovies = useSelector((state) => state.products.categoryMovies);
  const { now_playing } = allMovies;
  const { upcoming } = allMovies;
  const { popular } = allMovies;
  const { top_rated } = allMovies;
  let movies = now_playing.concat(upcoming).concat(popular).concat(top_rated);
  const searchMovies = applyFilter(movies, query);
  console.log("searchMovies", searchMovies);
  return <MainContent searchMovies={searchMovies} movieGenres={movieGenres} />;
};

const applyFilter = (movies, filters) => {
  const query = filters;
  let filteredMovies = [];
  if (query && movies.length) {
    filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  }
  return filteredMovies;
};

export default HomePage;
