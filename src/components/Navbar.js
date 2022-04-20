import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MovieSearch from "./MovieSearch";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import logo from "../logo-netflix.svg";
import FadeMenu from "./MenuItems";
import "./style/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormProvider from "./form/FormProvider";
import SearchContent from "../layout/SearchContent";
import { Container } from "@mui/material";
import productAction from "../redux/actions/products.action";
import MainHeader from "../layout/MainHeader";
import MainContent from "../layout/MainContent";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false);
  const [scroll, setScroll] = useState(false);
  const movieGenres = useSelector((state) => state.products.genres);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productAction.getGenresMovie());
  }, [dispatch]);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleScroll = () => {
    if (window.scrollY > 128) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  window.addEventListener("scroll", handleScroll);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();
  const navigateHomepage = () => {
    navigate(`/`);
  };
  const navigateProductPage = () => {
    navigate(`/products`);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={1} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const allMovies = useSelector((state) => state.products.categoryMovies);
  const { now_playing } = allMovies;
  const { upcoming } = allMovies;
  const { popular } = allMovies;
  const { top_rated } = allMovies;
  let movies = now_playing.concat(upcoming).concat(popular).concat(top_rated);
  const defaultValues = { searchQuery: "" };
  const methods = useForm({ defaultValues });
  const { watch } = methods;
  const filters = watch();
  const searchMovies = applyFilter(movies, filters);

  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: "#524848" }}>
        <AppBar
          sx={
            !scroll
              ? {
                  position: "fixed",
                  background: "transparent",
                  transition: "0.3s ease-in-out",
                }
              : {
                  position: "fixed",
                  backgroundColor: "rgb(20, 20, 20)",
                  boxShadow: "5px -1px 12px -5px grey",
                }
          }
        >
          <Toolbar sx={{ backgroundColor: "transparent" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <FadeMenu />
            </IconButton>
            <Typography
              constiant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Box
                sx={{ mt: "10px", mr: "20px" }}
                onClick={() => navigate(`/`)}
                style={{ cursor: "pointer" }}
              >
                <img src={logo} alt="logo"></img>
              </Box>
            </Typography>
            <Box>
              <FormProvider methods={methods}>
                <MovieSearch />
              </FormProvider>
            </Box>
            <Box
              sx={{
                width: "auto",
                minWidth: "40vw",
                display: "flex",
                marginLeft: "3rem",
                justifyContent: "space-around",
                color: "white",
              }}
            >
              <span className="navbar-link" onClick={navigateHomepage}>
                Homepage
              </span>
              <span className="navbar-link" onClick={navigateProductPage}>
                Movies
              </span>
              <span className="navbar-link">TV series</span>
              <span className="navbar-link">Top trending</span>
              <span className="navbar-link">My list</span>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 1 new notifications"
                color="inherit"
              >
                <Badge badgeContent={1} color="error">
                  <NotificationsIcon style={{ color: "white" }} />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {/* <AccountCircle /> */}
                <img
                  src="https://occ-0-395-64.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
                  alt="avatar"
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      {searchMovies.length !== 0 ? (
        <Container sx={{ minHeight: "100vh", mt: "5rem", mb: "2rem" }}>
          <SearchContent
            searchMovies={searchMovies}
            movieGenres={movieGenres}
          />
        </Container>
      ) : (
        <>
          <MainHeader />
          <MainContent />
        </>
      )}
    </>
  );
}

const applyFilter = (products, filters) => {
  const { searchQuery } = filters;
  let filteredProducts = [];
  if (searchQuery && products.length) {
    filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return filteredProducts;
};
