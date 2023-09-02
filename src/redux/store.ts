import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";

import thunk, { ThunkAction } from "redux-thunk";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import collectionSlice from "./shopify-shop/collectionSlice";
import checkoutSlice from "./shopify-shop/checkoutSlice";
import productSlice from "./shopify-shop/productSlice";

const rootReducer = combineReducers({
  collection: collectionSlice.reducer,
  checkout: checkoutSlice.reducer,
  product: productSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
