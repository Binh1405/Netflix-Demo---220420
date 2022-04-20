import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "../components/ProductCard";

const SearchContent = ({ searchMovies, movieGenres }) => {
  console.log("searchMovies", searchMovies);
  return (
    <Grid container spacing={1} mt={1}>
      {searchMovies?.map((movie, index) => (
        <Grid key={movie.index} item xs={6} lg={4}>
          <ProductCard movie={movie} movieGenres={movieGenres} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchContent;
