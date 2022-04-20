import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import productAction from "../redux/actions/products.action";
import { useDispatch, useSelector } from "react-redux";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "./DetailPage.css";
import LoadingScreen from "../components/LoadingScreen";
import Recommendations from "../components/Recommendations";
import ReactPlayer from "react-player";
import CloseIcon from "@mui/icons-material/Close";

const DetailPage = () => {
  const params = useParams();
  const { movie_id } = params;
  const id = parseInt(movie_id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productAction.getSingleMovie(id));
    dispatch(productAction.getMovieTrailer(id));
    dispatch(productAction.getSimilarMovies(id));
  }, [dispatch, id]);
  const movie = useSelector((state) => state.products.singleMovie);
  const loading = useSelector((state) => state.products.isLoading);
  const trailer = useSelector((state) => state.products.movieTrailer);
  const similarMovies = useSelector((state) => state.products.similar);
  console.log("similar movies", similarMovies);
  const playerRef = useRef();
  const [showTrailer, setShowTrailer] = useState(false);
  const playTrailer = () => {
    setShowTrailer(true);
  };
  const closeTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <div className="product-detail-page">
      <Navbar />
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="main-container">
          <div className="left-content">
            <div className="movie-backdrop">
              {showTrailer ? (
                <div className="player-wrapper">
                  <ReactPlayer
                    className="react-player"
                    url={`https://www.youtube.com/watch?v=${trailer}`}
                    width="100%"
                    height="100%"
                    playing={true}
                    volume={1}
                    muted={false}
                    ref={playerRef}
                    loop={false}
                    fluid={false}
                    playsInline
                    config={{
                      youtube: {
                        playerVars: { showinfo: 0 },
                      },
                    }}
                    onReady={() => playerRef.current?.seekTo(0, "seconds")}
                  />
                </div>
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt="movieImage"
                  className="image-layer"
                  width="100%"
                  height="auto"
                />
              )}

              {!showTrailer ? (
                <div className="text-and-logo">
                  <div className="left-container">
                    <div className="main-title">{movie.title}</div>
                    <div className="buttons-group">
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#fff",
                          color: "#000",
                          fontWeight: "bolder",
                        }}
                        onClick={() => playTrailer()}
                      >
                        <PlayArrowIcon />
                        Trailer
                      </Button>
                      <AddIcon
                        className="round-border"
                        style={{
                          margin: "1rem",
                          color: "white",
                          width: "2rem",
                          height: "2rem",
                          cursor: "pointer",
                        }}
                      />
                      <ThumbUpIcon
                        className="round-border"
                        style={{
                          color: "white",
                          width: "2rem",
                          height: "2rem",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                  <div className="tagline">{movie.tagline}</div>
                </div>
              ) : (
                <>
                  <CloseIcon
                    className="close-button-detail-movie"
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      fontWeight: "bolder",
                      position: "relative",
                      left: "48%",
                      cursor: "pointer",
                      bottom: "20%",
                    }}
                    onClick={closeTrailer}
                  />
                </>
              )}
            </div>
            <div className="movie-info">
              <div className="overview">{movie.overview}</div>
              <ul className="right-info">
                <li className="duration">Duration: {movie.runtime} mins</li>
                <li className="genres">Vote: {movie.vote_average}*</li>
                <li className="release">Release date: {movie.release_date}</li>
              </ul>
            </div>
          </div>
          <div className="other-movies">
            <div className="title">Similar movies:</div>
            {!similarMovies ? (
              <LoadingScreen />
            ) : (
              <Recommendations movies={similarMovies} loading={loading} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
