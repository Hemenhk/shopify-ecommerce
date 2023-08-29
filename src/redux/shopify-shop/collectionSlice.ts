import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCollectionWithHandle } from "./shopActions";
import { Product, Collection } from "shopify-buy";

interface CollectionState {
  collection: Product[];
  status: "loading" | "idle"
}

const initialState: CollectionState = {
  collection: [],
  status: "idle"
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCollectionWithHandle.pending, (state) => {
      state.status = "loading"
    }),
    builder.addCase(fetchCollectionWithHandle.fulfilled, (state, action) => {
      state.collection = action.payload 
      state.status = "idle"
    }),
    builder.addCase(fetchCollectionWithHandle.rejected, (state) => {
      state.status = "idle"
    })
  }
});

export default collectionSlice;
