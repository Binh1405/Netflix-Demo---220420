import * as types from "../constants/products.constant";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { api_key } from "../../app/config";

const productAction = {};
const randomNum = Math.floor(Math.random() * 20);

productAction.getFeaturedMovie = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_FEATURED_MOVIE_REQUEST, payload: null });
      const res = await apiService.get(
        `/movie/now_playing?api_key=${api_key}&language=en-US`
      );
      dispatch({
        type: types.GET_FEATURED_MOVIE_SUCCESS,
        payload: res.data.results[randomNum],
      });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: types.GET_FEATURED_MOVIE_FAIL, payload: error.message });
    }
  };
};

productAction.getQuery = (searchQuery) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_QUERY, payload: searchQuery });
    } catch (error) {
      toast.error(error.message);
    }
  };
};
productAction.getMovieByQuery = (query) => {
  console.log("query", query);
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_MOVIEBYQUERY_REQUEST, payload: null });
      const res = await apiService.get(
        `/search/movie?api_key=${api_key}&query=${query}`
      );
      console.log("searchMovies", res);
      dispatch({
        type: types.GET_MOVIEBYQUERY_SUCCESS,
        payload: res.data.results,
      });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: types.GET_MOVIEBYQUERY_FAIL, payload: error.message });
    }
  };
};

productAction.getMovieTrailer = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_TRAILER_REQUEST, payload: null });
      const res = await apiService.get(
        `/movie/${id}/videos?api_key=${api_key}&append_to_response=videos`
      );
      dispatch({
        type: types.GET_TRAILER_SUCCESS,
        payload: res.data.results[0].key,
      });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: types.GET_TRAILER_FAIL, payload: error.message });
    }
  };
};

productAction.getAlternativeTitle = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_ALTERNATIVE_TITLE_REQUEST, isLoading: true });
      const res = await apiService.get(
        `/movie/${id}/alternative_titles?api_key=${api_key}`
      );
      dispatch({
        type: types.GET_ALTERNATIVE_TITLE_SUCCESS,
        payload: res.data.titles[0].title,
      });
    } catch (error) {
      toast.error(error.message);
      console.log("error", error);
      dispatch({
        type: types.GET_CATEGORY_MOVIES_FAIL,
        payload: error.message,
      });
    }
  };
};

productAction.getMoviesByCategory = (category) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_CATEGORY_MOVIES_REQUEST, isLoading: true });
      const res = await apiService.get(`/movie/${category}?api_key=${api_key}`);
      dispatch({
        type: types.GET_CATEGORY_MOVIES_SUCCESS,
        payload: { data: res.data.results, category },
      });
    } catch (error) {
      toast.error(error);
      dispatch({
        type: types.GET_CATEGORY_MOVIES_FAIL,
        payload: error.message,
      });
    }
  };
};

productAction.getSimilarMovies = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_SIMILAR_MOVIES_REQUEST, isLoading: true });
      const res = await apiService.get(
        `/movie/${id}/similar?api_key=${api_key}`
      );
      console.log("res", res);
      dispatch({
        type: types.GET_SIMILAR_MOVIES_SUCCESS,
        payload: res.data.results,
      });
    } catch (error) {
      toast.error(error);
      dispatch({ type: types.GET_SIMILAR_MOVIES_FAIL, payload: error.message });
    }
  };
};

productAction.getGenresMovie = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_GENRES_MOVIE_REQUEST, isLoading: true });
      const res = await apiService.get(
        `/genre/movie/list?api_key=${api_key}&language=en-US`
      );
      dispatch({
        type: types.GET_GENRES_MOVIE_SUCCESS,
        payload: res.data.genres,
      });
    } catch (error) {
      toast.error(error);
      dispatch({
        type: types.GET_GENRES_MOVIE_FAIL,
        payload: error.message,
      });
    }
  };
};
// productAction.getMoviesByGenre = (genres) =>{
//   return async (dispatch) =>{
//     try {
//       dispatch({type: types.GET_MOVIESBYGENRE_REQUEST, payload: null})
//       const res = await apiService.get(`/`)
//     } catch (error) {

//     }
//   }
// }

productAction.getSingleMovie = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_SINGLE_MOVIE_REQUEST, payload: null });
      const res = await apiService.get(
        `/movie/${id}?api_key=${api_key}&language=en-US`
      );
      console.log("res", res);
      dispatch({ type: types.GET_SINGLE_MOVIE_SUCCESS, payload: res.data });
    } catch (error) {
      toast.error(error);
      dispatch({ type: types.GET_SINGLE_MOVIE_FAIL, payload: error.message });
    }
  };
};

productAction.getRecommendationMovies = (id) => {
  console.log("id", id);
  return async (dispatch) => {
    try {
      dispatch({
        type: types.GET_RECOMMENDATION_MOVIES_REQUEST,
        isLoading: true,
      });
      const res = await apiService.get(
        `/movie/${id}/recommendations?api_key=${api_key}`
      );
      console.log("res", res);
      dispatch({
        type: types.GET_RECOMMENDATION_MOVIES_SUCCESS,
        payload: res.data.results,
      });
    } catch (error) {
      toast.error(error);
      dispatch({
        type: types.GET_RECOMMENDATION_MOVIES_FAIL,
        payload: error.message,
      });
    }
  };
};
export default productAction;
