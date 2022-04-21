import React from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import "./style/Recommendations.css";

const Recommendations = ({ movies, loading }) => {
  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="movies_container">
          {movies?.splice(0, 6).map((movie, index) => (
            <div className="movie" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt="movie poster"
                width={200}
                onClick={() => navigate(`/product/${movie.id}`)}
              />
              <div className="itemInfo">
                <div className="itemInfoTop">
                  <span className="title"> {movie.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Recommendations;
