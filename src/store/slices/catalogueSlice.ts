import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Product, Wholesaler, StoreProduct } from "../../types";

interface CatalogueState {
  products: Product[];
  wholesalers: Wholesaler[];
  storeProducts: StoreProduct[];
  isLoading: boolean;
  error: string | null;
  lastSyncedAt: string | null;
}

const initialState: CatalogueState = {
  products: [],
  wholesalers: [],
  storeProducts: [],
  isLoading: false,
  error: null,
  lastSyncedAt: null,
};

const catalogueSlice = createSlice({
  name: "catalogue",
  initialState,

  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    setWholesalers: (state, action: PayloadAction<Wholesaler[]>) => {
      state.wholesalers = action.payload;
    },

    setStoreProducts: (state, action: PayloadAction<StoreProduct[]>) => {
      state.storeProducts = action.payload;
    },

    setCatalogue: (
      state,
      action: PayloadAction<{
        products: Product[];
        wholesalers: Wholesaler[];
        storeProducts: StoreProduct[];
      }>,
    ) => {
      state.products = action.payload.products;
      state.wholesalers = action.payload.wholesalers;
      state.storeProducts = action.payload.storeProducts;
      state.error = null;
    },

    setCatalogueLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setCatalogueError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setLastSyncedAt: (state, action: PayloadAction<string | null>) => {
      state.lastSyncedAt = action.payload;
    },

    clearCatalogueError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setProducts,
  setWholesalers,
  setStoreProducts,
  setCatalogue,
  setCatalogueLoading,
  setCatalogueError,
  setLastSyncedAt,
  clearCatalogueError,
} = catalogueSlice.actions;

export const selectProducts = (state: { catalogue: CatalogueState }) =>
  state.catalogue.products;

export const selectWholesalers = (state: { catalogue: CatalogueState }) =>
  state.catalogue.wholesalers;

export const selectStoreProducts = (state: { catalogue: CatalogueState }) =>
  state.catalogue.storeProducts;

export const selectCatalogueLoading = (state: { catalogue: CatalogueState }) =>
  state.catalogue.isLoading;

export const selectCatalogueError = (state: { catalogue: CatalogueState }) =>
  state.catalogue.error;

export const selectLastSyncedAt = (state: { catalogue: CatalogueState }) =>
  state.catalogue.lastSyncedAt;

export default catalogueSlice.reducer;
