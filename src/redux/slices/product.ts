import { createSlice } from '@reduxjs/toolkit';
// @types
import { GetProductsParamsType, ProductStateType, SearchProductsParamsType } from '_types/product';

// services
import * as services from 'services/product';
// redux
import { dispatch } from '../store';
// ----------------------------------------------------------------------

const initialState: ProductStateType = {
  isLoading: false,
  error: null,
  productList: null,
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    setProducts(state, action) {
      state.isLoading = false;
      state.productList = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
export const { actions } = slice;

// ----------------------------------------------------------------------

export function getProductList(
  params: GetProductsParamsType
) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      services
        .getProduct(params)
        .then((response: any) => {
          dispatch(slice.actions.setProducts(response));
        })
        .catch((error: any) => {
          dispatch(slice.actions.hasError(error?.message));
        });
    } catch (error) {
      dispatch(slice.actions.hasError(error?.message));
    }
  };
}

// ----------------------------------------------------------------------
export function searchProduct(
  params: SearchProductsParamsType
) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      services
        .searchProduct(params)
        .then((response: any) => {
          dispatch(slice.actions.setProducts(response));
        })
        .catch((error: any) => {
          dispatch(slice.actions.hasError(error?.message));
        });
    } catch (error) {
      dispatch(slice.actions.hasError(error?.message));
    }
  };
}

// ----------------------------------------------------------------------
