"use client";

import Client from "shopify-buy";
import { GraphQLClient } from "graphql-request";
import { setCheckout, setIsCartOpen } from "./checkoutSlice";

import { AppDispatch } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface ProductMetafieldsData {
  productByHandle: {
    usageMetafield: {
      key: string;
      value: string;
    };
    fragranceMetafield: {
      key: string;
      value: string;
    };
    ingredientsMetafield: {
      key: string;
      value: string;
    };
    descMetafield: {
      key: string;
      value: string;
    };
  };
}

export const fetchProductMetafields = async (productHandle: string) => {
  const endpoint = "https://hemen-dev.myshopify.com/api/2021-07/graphql.json";
  const storefrontAccessToken: string | undefined =
    "95de33e587cd2baf92b82488c3347725";

  const query = `
    query getProductMetafields($handle: String!) {
      productByHandle(handle: $handle) {
        usageMetafield: metafield(namespace: "my_fields", key: "Usage") {
          key
          value
        }fragranceMetafield: metafield(namespace: "my_fields", key: "Fragrance") {
          key
          value
        }
        ingredientsMetafield: metafield(namespace: "my_fields", key: "ingredients") {
          key
          value
        } descMetafield: metafield(namespace: "my_fields", key: "Description") {
          key
          value
        }
      }
    }
  `;

  const variables = {
    handle: productHandle,
  };

  const headers: Record<string, string> = {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken || "",
  };

  const client = new GraphQLClient(endpoint, {
    headers,
  });

  try {
    const data: ProductMetafieldsData = await client.request(query, variables);
    const fragranceMetafield = data.productByHandle.fragranceMetafield;
    const descMetafield = data.productByHandle.descMetafield;
    const usageMetafield = data.productByHandle.usageMetafield;
    const ingredientMetafield = data.productByHandle.ingredientsMetafield;

    return [
      usageMetafield,
      fragranceMetafield,
      ingredientMetafield,
      descMetafield,
    ];
  } catch (error) {
    console.log("Error fetching metafields:", error);
    return [];
  }
};

const domain: string | undefined = "hemen-dev.myshopify.com";
const storefrontAccessToken: string | undefined =
  "95de33e587cd2baf92b82488c3347725";
const apiVersion = "2023-07";

if (storefrontAccessToken === undefined) {
  throw new Error("REACT_APP_SHOPIFY_API is not defined");
}

if (domain === undefined) {
  throw new Error("REACT_APP_SHOPIFY_DOMAIN is not defined");
}
export const client = Client.buildClient({
  domain,
  storefrontAccessToken,
  apiVersion,
});

export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async () => {
    try {
      const checkout = await client.checkout.create();
      console.log("See the checkout complete", checkout);
      localStorage.setItem("checkout_id", checkout.id);

      return checkout;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const fetchCheckout = createAsyncThunk(
  "checkout/fetchCheckout",
  async (checkoutId: string) => {
    const checkout = await client.checkout.fetch(checkoutId);
    console.log(checkout);
    return checkout;
  }
);

export const addItemToCheckout =
  (variantId: string, quantity: number) =>
  async (dispatch: AppDispatch, getState: any) => {
    try {
      const lineItemsToAdd = [{ variantId, quantity }];
      const currentState = getState().checkout;
      const newCheckout = await client.checkout.addLineItems(
        currentState.checkout.id,
        lineItemsToAdd
      );

      dispatch(setCheckout(newCheckout));
      dispatch(setIsCartOpen(true));
      setTimeout(() => {
        dispatch(setIsCartOpen(false));
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

export const updateLineItem =
  (lineItemId: string, quantity: number) =>
  async (dispatch: AppDispatch, getState: any) => {
    const lineItemsToUpdate = [{ id: lineItemId, quantity }];
    const currentState = getState().checkout;
    const newCheckout = await client.checkout.updateLineItems(
      currentState.checkout.id,
      lineItemsToUpdate
    );

    dispatch(setCheckout(newCheckout));
  };

export const removeLineItem =
  (lineItemIdsToRemove: string[]) =>
  async (dispatch: AppDispatch, getState: any) => {
    const currentState = getState().checkout;
    const newCheckout = await client.checkout.removeLineItems(
      currentState.checkout.id,
      lineItemIdsToRemove
    );
    dispatch(setCheckout(newCheckout));
  };

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const products = await client.product.fetchAll();
    return products;
  }
);

export const fetchProductWithHandle = createAsyncThunk(
  "product/fetchProductWithHandle",
  async (handle: string, { rejectWithValue }) => {
    try {
      const product = await client.product.fetchByHandle(handle);
      const metafields = await fetchProductMetafields(handle);

      return { ...product, metafields };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCollectionWithHandle = createAsyncThunk(
  "collection/withHandle",
  async (handle: string, { rejectWithValue }) => {
    try {
      const collection = await client.collection.fetchByHandle(handle);
      console.log("Collection in Actions", collection);
      return collection;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCollections = createAsyncThunk(
  "collection/fetchCollections",
  async () => {
    try {
      const collection = await client.collection.fetchAll();
      return collection;
    } catch (error: any) {
      console.log(error);
    }
  }
);
