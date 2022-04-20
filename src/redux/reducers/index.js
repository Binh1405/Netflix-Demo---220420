import { combineReducers } from "redux";
import productReducer from "./products.reducer";

export default combineReducers({
  products: productReducer,
});
