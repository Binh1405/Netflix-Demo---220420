import { Container } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Navigate, useNavigate } from "react-router-dom";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

const SearchContent = ({ queryMovies }) => {
  const navigate = useNavigate();
  console.log("queryMovies", queryMovies);
  return (
    <Container fixed sx={{ mt: "6rem" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {queryMovies?.map((movie, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              bgcolor: "text.primary",
              overflow: "hidden",
              borderRadius: "12px",
              boxShadow: 1,
              fontWeight: "bold",
              padding: "1rem",
              margin: "1rem",
            }}
            key={index}
            onClick={() => navigate(`/product/${movie.id}`)}
          >
            <Box
              component="img"
              sx={{
                height: "auto",
                width: "100",
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                m: 3,
                minWidth: { md: 350 },
              }}
            >
              <Box
                component="span"
                sx={{ fontSize: 15, mt: 1, color: "primary.main" }}
              >
                {movie.title}
              </Box>
              <Box
                component="span"
                sx={{ color: "primary.main", fontSize: 12 }}
              >
                {movie.overview}
              </Box>
              <Box
                sx={{
                  mt: 1.5,
                  p: 0.5,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                  borderRadius: "5px",
                  color: "primary.main",
                  fontWeight: "medium",
                  display: "flex",
                  fontSize: 12,
                  alignItems: "center",
                  "& svg": {
                    fontSize: 21,
                    mr: 0.5,
                  },
                }}
              >
                <ThumbUpOffAltIcon />
                {movie.vote_average}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default SearchContent;
