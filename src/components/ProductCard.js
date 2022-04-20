import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ movie, movieGenres, index }) => {
  const navigate = useNavigate();
  const { id } = movie;
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
      key={index}
    >
      <div className="carousel-inner">
        <div className="carousel-item active poster">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="movie poster"
            width={250}
            onClick={() => navigate(`/product/${id}`)}
          />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrowIcon />
              <AddIcon />
              <ThumbUpIcon />
              <KeyboardArrowDownSharpIcon />
            </div>
            <div className="itemInfoTop">
              <span className="title">{movie.title}</span>
            </div>
            <div className="desc">{movie.overview}</div>
            <div className="genre">
              Genres:{" "}
              {movieGenres?.map((genre) => {
                if (
                  genre.id === movie.genre_ids[0] ||
                  genre.id === movie.genre_ids[1] ||
                  genre.id === movie.genre_ids[2]
                ) {
                  return genre.name + ", ";
                }
                return true;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
