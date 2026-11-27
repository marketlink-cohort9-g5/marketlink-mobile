import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SavedState {
  productIds: string[];
}

const initialState: SavedState = {
  productIds: [],
};

const savedSlice = createSlice({
  name: "saved",
  initialState,

  reducers: {
    setSavedProducts: (state, action: PayloadAction<string[]>) => {
      state.productIds = action.payload;
    },

    saveProduct: (state, action: PayloadAction<string>) => {
      if (!state.productIds.includes(action.payload)) {
        state.productIds.push(action.payload);
      }
    },

    unsaveProduct: (state, action: PayloadAction<string>) => {
      state.productIds = state.productIds.filter((id) => id !== action.payload);
    },

    toggleSavedProduct: (state, action: PayloadAction<string>) => {
      const productId = action.payload;

      if (state.productIds.includes(productId)) {
        state.productIds = state.productIds.filter((id) => id !== productId);
      } else {
        state.productIds.push(productId);
      }
    },

    clearSavedProducts: (state) => {
      state.productIds = [];
    },
  },
});

export const {
  setSavedProducts,
  saveProduct,
  unsaveProduct,
  toggleSavedProduct,
  clearSavedProducts,
} = savedSlice.actions;

export const selectSavedProductIds = (state: { saved: SavedState }) =>
  state.saved.productIds;

export const selectIsProductSaved = (
  state: { saved: SavedState },
  productId: string,
) => state.saved.productIds.includes(productId);

export default savedSlice.reducer;
