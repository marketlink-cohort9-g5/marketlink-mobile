import apiClient from "./client";

import type { Product, PackSize, Wholesaler, StoreProduct } from "../types";

export interface CatalogueResponse {
  products: Product[];
  packSizes: PackSize[];
  wholesalers: Wholesaler[];
  storeProducts: StoreProduct[];
}

export interface ProductSearchParams {
  query?: string;
  category?: string;
  wholesalerId?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Retrieve the complete catalogue.
export const getCatalogue = async (): Promise<CatalogueResponse> => {
  const response = await apiClient.get("/catalogue");

  return response.data;
};

// Search for products using optional filters.
export const searchCatalogue = async (
  params: ProductSearchParams,
): Promise<Product[]> => {
  const response = await apiClient.get("/catalogue/search", {
    params,
  });

  return response.data;
};

// Retrieve available wholesalers.
export const getWholesalers = async (): Promise<Wholesaler[]> => {
  const response = await apiClient.get("/wholesalers");

  return response.data;
};

// Retrieve products sold by a particular wholesaler.
export const getWholesalerProducts = async (
  wholesalerId: string,
): Promise<StoreProduct[]> => {
  const response = await apiClient.get(
    `/wholesalers/${encodeURIComponent(wholesalerId)}/products`,
  );

  return response.data;
};

// Retrieve price comparisons for a particular product.
export const getProductComparison = async (
  productId: string,
): Promise<StoreProduct[]> => {
  const response = await apiClient.get(
    `/catalogue/${encodeURIComponent(productId)}/compare`,
  );

  return response.data;
};
