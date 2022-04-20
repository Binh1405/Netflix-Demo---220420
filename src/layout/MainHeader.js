import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productAction from "../redux/actions/products.action";
import "./style/MainHeader.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ReactPlayer from "react-player";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router-dom";

const MainHeader = () => {
  const featuredMovie = useSelector((state) => state.products.featuredMovie);
  const movieTrailer = useSelector((state) => state.products.movieTrailer);
  const [state, setState] = useState({
    playing: false,
    muted: false,
    videoPaused: "",
    ready: false,
    image: false,
  });
  const { playing, muted, videoPaused, ready, image } = state;
  const { id } = featuredMovie;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productAction.getFeaturedMovie());
    dispatch(productAction.getMovieTrailer(id));
  }, [dispatch, id]);
  const turnOnTrailer = () => {
    if (!muted) setState({ ...state, muted: true });
    else {
      setState({ ...state, muted: false });
    }
  };
  const navigate = useNavigate();
  const playerRef = useRef();
  const replay = () => {
    playerRef.current?.seekTo(0, "seconds");
    setState({
      ...state,
      videoPaused: false,
      image: false,
      ready: true,
    });
  };
  const playMovie = () => {
    window.location.href = `https://www.netflix.com/watch/${id}/`;
  };
  const handleReady = () => {
    setState({ ...state, ready: true });
  };
  const showMovieBackdrop = () => {
    setState({ ...state, image: true });
  };

  return (
    <span className="volatile-billboard-animations-container">
      <div
        className="billboard-row"
        onMouseMove={() => {
          if (ready) setState({ ...state, playing: true });
        }}
        onMouseLeave={() => {
          if (ready) setState({ ...state, playing: false });
        }}
      >
        <div className="hero-image-wrapper">
          {!image ? (
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url={`https://www.youtube.com/watch?v=${movieTrailer}`}
                width="100%"
                height="100%"
                playing={playing}
                volume={1}
                muted={muted}
                ref={playerRef}
                onPaused={videoPaused}
                loop={false}
                onReady={handleReady}
                onEnded={showMovieBackdrop}
              />
            </div>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
              alt="movieImage"
              className="static-img image-layer"
              width="100%"
              height="auto"
            />
          )}
          <div className="trailer-vignette"></div>
          <div className="hero-vignette vignette-layer"></div>
        </div>
        <div className="fill-container">
          <div className="info">
            <div className="logo-and-text">
              <div className="titleWrapper">
                <div className="billboard-title">
                  <div className="title-logo">{featuredMovie.title}</div>
                </div>
              </div>
              <div className="info-wrapper">
                <div className="info-wrapper-fade">
                  <div className="synopsis no-supplemental">
                    {featuredMovie.overview}
                  </div>
                </div>
              </div>

              <div className="billboard-links button-layer">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    fontWeight: "bolder",
                  }}
                  onClick={playMovie}
                >
                  <PlayArrowIcon />
                  Play
                </Button>

                <Button
                  variant="contained"
                  style={{
                    margin: 0,
                    padding: "0.3rem",
                    flexShrink: 0,
                    backgroundColor: "rgba(109, 109, 110, 0.7)",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "10rem",
                    marginLeft: "0.5rem",
                  }}
                  onClick={() => navigate(`/product/${id}`)}
                >
                  <HelpOutlineIcon />
                  <div>Information</div>
                </Button>
                <RestartAltIcon
                  style={{
                    color: "white",
                    position: "absolute",
                    right: "-45vw",
                    width: "2.3rem",
                    height: "2.3rem",
                    padding: "0.3rem",
                    borderRadius: "50%",
                    border: "1px solid white",
                    cursor: "pointer",
                  }}
                  onClick={replay}
                />
                {muted ? (
                  <VolumeOffIcon
                    style={{
                      color: "white",
                      position: "absolute",
                      right: "-50vw",
                      width: "2.3rem",
                      height: "2.3rem",
                      padding: "0.3rem",
                      borderRadius: "50%",
                      border: "1px solid white",
                      cursor: "pointer",
                    }}
                    onClick={turnOnTrailer}
                  />
                ) : (
                  <VolumeUpIcon
                    style={{
                      color: "white",
                      position: "absolute",
                      right: "-50vw",
                      width: "2.3rem",
                      height: "2.3rem",
                      padding: "0.3rem",
                      borderRadius: "50%",
                      border: "1px solid white",
                      cursor: "pointer",
                    }}
                    onClick={turnOnTrailer}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
};

export default MainHeader;
