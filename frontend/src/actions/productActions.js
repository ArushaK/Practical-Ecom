import {
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(`/api/products?keyword=${keyword}`);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);
    console.log(data);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
