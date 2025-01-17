import { GetProductsParamsType, SearchProductsParamsType } from '_types/product';
import * as endpoints from 'services/product/endpoints';
import * as api from 'utils/axios';

export const getProduct = ({ limit, skip }: GetProductsParamsType) =>
  api.sendGet(
    `${endpoints.GET_PRODUCT_LIST}?&limit=${limit}&skip=${skip}`,
    {
      headers: { 'Content-Type': 'application/json', accept: 'application/json' },
      data: {},
    }
  );

export const searchProduct = ({ searchKey }: SearchProductsParamsType) =>
  api.sendGet(
    `${endpoints.SEARCH_PRODUCT}?q=${searchKey}`,
    {
      headers: { 'Content-Type': 'application/json', accept: 'application/json' },
      data: {},
    }
  );