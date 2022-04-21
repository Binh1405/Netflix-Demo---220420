import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import FTextField from "./form/FTextField";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";

const useStyles = makeStyles({
  root: {
    width: "15rem",
    height: "2.3rem",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: "none",
    display: "inline-block",
    lineHeight: "1rem",
    textShadow: "0 1px 1px rgb(0 0 0 / 30%)",
    opacity: "0.8",
    borderRadius: "4px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginLeft: "1rem",
  },
  close: {
    width: 0,
    visibility: "none",
  },
  input: {
    color: "white",
  },
});
const MovieSearch = () => {
  const [open, setOpen] = useState(false);
  const handleInput = () => {
    setOpen(!open);
  };
  const classes = useStyles();
  return (
    <FTextField
      variant="standard"
      placeholder="Search…"
      inputProps={{ "aria-label": "search" }}
      name="searchQuery"
      className={open ? classes.root : classes.close}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon onClick={handleInput} style={{ color: "white" }} />
            </IconButton>
          </InputAdornment>
        ),
        className: classes.input,
      }}
    />
  );
};

export default MovieSearch;
