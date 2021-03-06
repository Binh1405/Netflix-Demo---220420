import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryMovies from "../components/RowComponent";
import productAction from "../redux/actions/products.action";
import "./style/MainContent.css";

const MainContent = ({ searchMovies, filterMovies }) => {
  const categories = ["now_playing", "popular", "top_rated", "upcoming"];
  const allMovies = useSelector((state) => state.products.categoryMovies);
  console.log("searchMovies", searchMovies);
  console.log("allMovies", allMovies);
  const dispatch = useDispatch();
  useEffect(() => {
    categories.map((category) =>
      dispatch(productAction.getMoviesByCategory(category), [
        dispatch,
        category,
      ])
    );
  });
  return searchMovies?.length ? (
    <div className="main-content">
      <CategoryMovies searchMovies={searchMovies} />
    </div>
  ) : filterMovies?.length ? (
    <div className="main-content">
      <CategoryMovies filterMovies={filterMovies} />
    </div>
  ) : (
    <div className="main-content">
      {categories.map((category, index) => (
        <CategoryMovies
          index={index}
          allMovies={allMovies}
          category={category}
        />
      ))}
    </div>
  );
};

export default MainContent;
