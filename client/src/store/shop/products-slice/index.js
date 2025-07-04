import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  latestProducts: [],
  productDetails: null,
};

// Ambil semua produk dengan filter & sort
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );

    return result?.data;
  }
);

// Ambil 12 produk terbaru
export const fetchLatestProducts = createAsyncThunk(
  "/products/fetchLatestProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/shop/products/get?sortBy=newest&limit=12"
    );
    return result?.data;
  }
);

// Ambil detail satu produk
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );
    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Semua produk dengan filter (listing)
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })

      // Produk terbaru (untuk homepage)
      .addCase(fetchLatestProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLatestProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.latestProducts = action.payload.data;
      })
      .addCase(fetchLatestProducts.rejected, (state) => {
        state.isLoading = false;
        state.latestProducts = [];
      })

      // Detail produk
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;