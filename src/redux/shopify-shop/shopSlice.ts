import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Metafield {
  // Define your metafield properties here
}

interface Product {
  metafields: Metafield[];
}

interface Checkout {
  // Define your checkout properties here
}

interface ShopState {
  product: Product;
  products: Product[];
  collection: CollectionItems[];
  checkout: Checkout;
  isCartOpen: boolean;
}

const initialState: ShopState = {
  product: {
    metafields: [],
  },
  products: [],
  collection: [],
  checkout: {},
  isCartOpen: false,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<Product>) {
      state.product = {
        ...action.payload,
        metafields: action.payload.metafields,
      };
      // console.log(state.product.metafields);
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },

    setCheckout(state, action: PayloadAction<Checkout>) {
      console.log("Setting checkout in state:", action.payload);
      state.checkout = {
        ...state.checkout,
        ...action.payload,
      };
    },
    setIsCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
  },
});

export const {
  setProduct,
  setProducts,
  setCheckout,
  setIsCartOpen,
} = shopSlice.actions;
export default shopSlice;
