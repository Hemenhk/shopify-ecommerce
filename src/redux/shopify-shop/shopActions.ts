import Client from "shopify-buy";
import { GraphQLClient } from "graphql-request";
import {
  setCheckout,
  setIsCartOpen,
  setProduct,
  setProducts,
} from "./shopSlice";

import { AppDispatch, AppThunk } from "../store";
import { CollectionItems, setCollection } from "./collectionSlice";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

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

const fetchProductMetafields = async (productHandle: string) => {
  const endpoint = `https://${process.env.REACT_APP_SHOPIFY_DOMAIN}/api/2021-07/graphql.json`;
  const storefrontAccessToken: string | undefined =
    process.env.REACT_APP_SHOPIFY_API;

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
const client = Client.buildClient({
  domain,
  storefrontAccessToken,
  apiVersion,
});

export const createCheckout = () => async (dispatch: AppDispatch) => {
  const checkout = await client.checkout.create();
  console.log("See the checkout complete", checkout);
  localStorage.setItem("checkout_id", checkout.id);
  dispatch(setCheckout({ checkout }));

  window.location.href = "https://hemenhk.github.io/demo-shopify/#/";
};

export const fetchCheckout =
  (checkoutId: string) => async (dispatch: AppDispatch) => {
    const checkout = await client.checkout.fetch(checkoutId);
    dispatch(setCheckout(checkout));
  };

export const addItemToCheckout =
  (variantId: string, quantity: number) =>
  async (dispatch: AppDispatch, getState: any) => {
    const lineItemsToAdd = [{ variantId, quantity }];
    const currentState = getState().shop;
    const newCheckout = await client.checkout.addLineItems(
      currentState.checkout.id,
      lineItemsToAdd
    );

    dispatch(setCheckout(newCheckout));
    dispatch(setIsCartOpen(true));
    setTimeout(() => {
      dispatch(setIsCartOpen(false));
    }, 2000);
  };

export const updateLineItem =
  (lineItemId: string, quantity: number) =>
  async (dispatch: AppDispatch, getState: any) => {
    const lineItemsToUpdate = [{ id: lineItemId, quantity }];
    const currentState = getState().shop;
    const newCheckout = await client.checkout.updateLineItems(
      currentState.checkout.id,
      lineItemsToUpdate
    );

    dispatch(setCheckout(newCheckout));
  };

export const removeLineItem =
  (lineItemIdsToRemove: string[]) =>
  async (dispatch: AppDispatch, getState: any) => {
    const currentState = getState().shop;
    const newCheckout = await client.checkout.removeLineItems(
      currentState.checkout.id,
      lineItemIdsToRemove
    );
    dispatch(setCheckout(newCheckout));
  };

export const fetchAllProducts = () => async (dispatch: AppDispatch) => {
  const products = await client.product.fetchAll();
  dispatch(setProducts(products));
};

export const fetchProductWithHandle =
  (handle: string) => async (dispatch: AppDispatch) => {
    try {
      const product = await client.product.fetchByHandle(handle);
      // console.log(product);

      // Fetch metafields with the given handle
      const metafields = await fetchProductMetafields(handle);
      // console.log("Metafields:", metafields);

      dispatch(setProduct({ ...product, metafields }));
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

export const fetchCollectionWithHandle = createAsyncThunk(
  "collection/withHandle",
  async (handle: string, { rejectWithValue }) => {
    try {
      const collection = await client.collection.fetchByHandle(handle);
      console.log("Collection in Actions", collection);
      return collection.products;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// export const fetchCollectionWithHandle =
//   (handle: string) => async (dispatch: AppDispatch) => {
//     try {
//       const collection: CollectionItems[] =
//         await client.collection.fetchByHandle(handle);
//       dispatch(setCollection(collection));
//       console.log("Collection", collection);
//     } catch (error) {
//       console.log(error);
//     }
//   };

export const fetchCollections = () => async (dispatch: AppDispatch) => {
  try {
    const collection: CollectionItems[] = await client.collection.fetchAll();
    dispatch(setCollection(collection));
  } catch (error) {}
};
