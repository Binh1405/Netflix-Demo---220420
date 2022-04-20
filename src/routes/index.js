import * as React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductPage from "../pages/ProductPage";
import SearchPage from "../pages/SearchPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/product/:movie_id" element={<DetailPage />} />
      <Route path="/search/:query" element={<SearchPage />} />
    </Routes>
  );
}

export default Router;
