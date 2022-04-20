import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import MainHeader from "./MainHeader";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <MainHeader />
      <Outlet />
    </>
  );
};

export default MainLayout;
