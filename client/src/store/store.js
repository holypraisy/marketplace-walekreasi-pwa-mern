import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";

import sellerOrderSlice from "./seller/order-slice";
import sellerProductsSlice from "./seller/products-slice";
import sellerProfileSlice from "./seller/profile-slice";
import shopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import shopStoreSlice from "./shop/store-slice"; 
import commonFeatureSlice from "./common-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    sellerProducts: sellerProductsSlice,
    sellerOrder: sellerOrderSlice,
    sellerProfile: sellerProfileSlice,

    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    shopStore: shopStoreSlice,

    commonFeature: commonFeatureSlice,
  },
});

export default store;
