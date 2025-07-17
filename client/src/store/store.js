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
import payoutSlice from "./admin/payout-slice" ;
import adminDashboardSlice from "./admin/dashboard-slice";
import sellersInfoSlice from "./admin/sellers-slice";
import customersSlice from "./admin/customers-slice";
import transactionsSlice from "./admin/trasactions-slice";
import bannerSlice from "./admin/banner-slice";
import notificationSlice from "./admin/notification-slice";
import customerSlice from "./shop/customer-slice";

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
    shopCustomer: customerSlice,

    payout: payoutSlice,
    commonFeature: commonFeatureSlice,
    adminDashboard : adminDashboardSlice,
    sellersInfo : sellersInfoSlice,
    customersInfo : customersSlice,
    transactionsInfo : transactionsSlice, 
    banner : bannerSlice,
    sendNotification : notificationSlice
  },
});

export default store;
