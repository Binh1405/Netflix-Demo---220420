import React, { useEffect, useRef, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import "../layout/style/MainContent.css";
import { useDispatch, useSelector } from "react-redux";
import productAction from "../redux/actions/products.action";
import ProductCard from "./ProductCard";

const RowComponent = ({ index, category, allMovies, filterMovies }) => {
  const movieGenres = useSelector((state) => state.products.genres);
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const loading = useSelector((state) => state.products.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productAction.getGenresMovie());
  }, [dispatch]);
  const listRef = useRef();
  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 56;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${262 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 15) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-250 + distance}px)`;
    }
  };
  return allMovies ? (
    <div className="row-container" key={index}>
      <h1>{category}</h1>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
        onClick={() => handleClick("left")}
        style={{ display: !isMoved && "none" }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <div className="movie-poster" ref={listRef}>
        {allMovies[category].map((movie) => (
          <ProductCard movie={movie} index={index} movieGenres={movieGenres} />
        ))}
      </div>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
        onClick={() => handleClick("right")}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  ) : (
    <div className="row-container" key={index}>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
        onClick={() => handleClick("left")}
        style={{ display: !isMoved && "none" }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <div className="movie-poster" ref={listRef}>
        {filterMovies.map((movie) => (
          <ProductCard movie={movie} index={index} movieGenres={movieGenres} />
        ))}
      </div>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
        onClick={() => handleClick("right")}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
export default RowComponent;
