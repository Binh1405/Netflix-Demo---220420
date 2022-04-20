import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import MovieSort from "../components/MovieSort";
import MainContent from "../layout/MainContent";
import productAction from "../redux/actions/products.action";
import { Stack } from "@mui/material";
import FormProvider from "../components/form/FormProvider";

const ProductPage = () => {
  const movieGenres = useSelector((state) => state.products.genres);
  const allMovies = useSelector((state) => state.products.categoryMovies);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productAction.getGenresMovie());
  }, [dispatch]);
  const { now_playing, upcoming, popular, top_rated } = allMovies;
  let movies = [now_playing.concat(upcoming).concat(popular).concat(top_rated)];
  const defaultValues = { sortBy: "" };
  const methods = useForm({ defaultValues });
  const { watch } = methods;
  const filters = watch();
  console.log("filters", filters);
  const filterMovies = applyFilter(movies, filters);
  console.log("filterMovies", filterMovies);
  return (
    <>
      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            ml={6}
          >
            <MovieSort genres={movieGenres} />
          </Stack>
        </FormProvider>
        <MainContent filterMovies={filterMovies} />
      </Stack>
    </>
  );
};

const applyFilter = (products, filters) => {
  const { sortBy } = filters;
  let filteredProducts = [];
  filteredProducts = products[0].filter((product) =>
    product.genre_ids.find((id) => id == sortBy)
  );
  return filteredProducts;
};

export default ProductPage;
