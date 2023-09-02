import { createSlice } from "@reduxjs/toolkit";
import { HasMetafields, Product, Metafield } from "shopify-buy";
import { fetchProductWithHandle } from "./shopActions";



interface ProductInterface {
  metafields: Metafield[];
}

interface ProductState {
  product: Product;
  products: Product[];
  status: "loading" | "idle";
}

const initialState: ProductState = {
  product: {
    metafields: [],
  },
  products: [],
  status: "idle",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductWithHandle.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchProductWithHandle.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = {
          ...action.payload,
          metafields: action.payload?.metafields,
        };
      });
  },
});

export default productSlice;
