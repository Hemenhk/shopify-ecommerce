import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";

import shopSlice from "./shopify-shop/shopSlice";
import thunk, { ThunkAction } from "redux-thunk";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import collectionSlice from "./shopify-shop/collectionSlice";

const rootReducer = combineReducers({
  shop: shopSlice.reducer,
  collection: collectionSlice.reducer
});

const store = configureStore({ reducer: rootReducer });


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export default store;
