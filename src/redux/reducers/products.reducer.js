import * as types from "../constants/products.constant";

const initialState = {
  featuredMovie: {},
  categoryMovies: {
    now_playing: [],
    upcoming: [],
    top_rated: [],
    popular: [],
  },

  isLoading: false,
  singleMovie: {},
  errorMessage: "",
  movieTrailer: {},
  alternativeTitle: {},
  genres: [],
  recommendationMovies: [],
  searchMovies: [],
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log("payload", payload);
  switch (type) {
    case types.GET_FEATURED_MOVIE_REQUEST:
    case types.GET_TRAILER_REQUEST:
    case types.GET_ALTERNATIVE_TITLE_REQUEST:
    case types.GET_CATEGORY_MOVIES_REQUEST:
    case types.GET_GENRES_MOVIE_REQUEST:
    case types.GET_SINGLE_MOVIE_REQUEST:
    case types.GET_RECOMMENDATION_MOVIES_REQUEST:
    case types.GET_SIMILAR_MOVIES_REQUEST:
    case types.GET_MOVIEBYQUERY_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_FEATURED_MOVIE_SUCCESS:
      return { ...state, featuredMovie: payload, isLoading: false };
    case types.GET_TRAILER_SUCCESS:
      return { ...state, movieTrailer: payload, isLoading: false };
    case types.GET_ALTERNATIVE_TITLE_SUCCESS:
      return { ...state, alternativeTitle: payload, isLoading: false };
    case types.GET_CATEGORY_MOVIES_SUCCESS:
      const { data, category } = payload;
      const temp = { ...state };
      temp.categoryMovies[category] = data;
      return temp;
    case types.GET_GENRES_MOVIE_SUCCESS:
      return { ...state, genres: payload, isLoading: false };
    case types.GET_SINGLE_MOVIE_SUCCESS:
      return { ...state, singleMovie: payload, isLoading: false };
    case types.GET_RECOMMENDATION_MOVIES_SUCCESS:
      return { ...state, recommendationMovies: payload, isLoading: false };
    case types.GET_SIMILAR_MOVIES_SUCCESS:
      return { ...state, similar: payload, isLoading: false };
    case types.GET_MOVIEBYQUERY_SUCCESS:
      return { ...state, searchMovies: payload, isLoading: false };
    case types.GET_FEATURED_MOVIE_FAIL:
    case types.GET_TRAILER_FAIL:
    case types.GET_ALTERNATIVE_TITLE_FAIL:
    case types.GET_CATEGORY_MOVIES_FAIL:
    case types.GET_GENRES_MOVIE_FAIL:
    case types.GET_SINGLE_MOVIE_FAIL:
    case types.GET_RECOMMENDATION_MOVIES_FAIL:
    case types.GET_SIMILAR_MOVIES_FAIL:
    case types.GET_MOVIEBYQUERY_FAIL:
      return { ...state, isLoading: false, errorMessage: payload };
    default:
      return state;
  }
};

export default productReducer;
