

export type GetProductsParamsType = {
  limit: number;
  skip: number;
};
export type SearchProductsParamsType = {
  searchKey: string;
};

export type ProductStateType = {
  isLoading: boolean;
  error: Error | string | null;
  productList: ProductList | null;

}

export type ProjectType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string;
};

export type ProductList = {
  skip: number;
  limit: number;
  total: number;
  products: ProjectType[];
};
