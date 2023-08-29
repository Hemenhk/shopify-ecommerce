import { createSlice } from "@reduxjs/toolkit";
import { Checkout } from "shopify-buy";
import {
  createCheckout,
  fetchCheckout,
  addItemToCheckout,
} from "./shopActions";

interface CheckoutState {
  checkout: Checkout;
  status: "loading" | "idle";
}

const initialState = {
  checkout: {},
  status: "idle",
} as CheckoutState;

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckout: (state, action) => {
      state.checkout = {
        ...state.checkout,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCheckout.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(createCheckout.fulfilled, (state, action) => {
        state.checkout = {
          ...state.checkout,
          ...action.payload,
        };
      }),
      builder.addCase(createCheckout.rejected, (state) => {
        state.status = "idle";
      }),
      builder.addCase(fetchCheckout.pending, (state) => {
        state.status = "loading";
      }),
      builder.addCase(fetchCheckout.fulfilled, (state, action) => {
        state.checkout = {
          ...state.checkout,
          ...action.payload,
        };
      }),
      builder.addCase(fetchCheckout.rejected, (state) => {
        state.status = "idle";
      });
   
  },
});

export default checkoutSlice;
