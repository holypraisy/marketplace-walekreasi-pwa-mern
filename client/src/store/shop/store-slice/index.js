import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk untuk fetch data toko dari API
export const fetchStoreBySellerId = createAsyncThunk(
  "store/fetchStoreBySellerId",
  async (sellerId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/shop/store/${sellerId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data toko."
      );
    }
  }
);

const storeSlice = createSlice({
  name: "store",
  initialState: {
    store: null,
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearStore: (state) => {
      state.store = null;
      state.products = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreBySellerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreBySellerId.fulfilled, (state, action) => {
        state.loading = false;

        // Simpan informasi toko
        state.store = {
          sellerId: action.payload.sellerId,
          storeName: action.payload.storeName,
          storeLogoUrl: action.payload.storeLogoUrl,
          storeBannerUrl: action.payload.storeBannerUrl,
          storeDescription: action.payload.storeDescription,
          productionAddress: action.payload.productionAddress,
        };

        // Simpan produk dengan proteksi terhadap kemungkinan undefined
        state.products = Array.isArray(action.payload.products)
          ? action.payload.products.map((product) => ({
              ...product,
              sellerId: product.sellerId,
              storeName: product.storeName,
            }))
          : [];
      })
      .addCase(fetchStoreBySellerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal memuat data toko.";
      });
  },
});

export const { clearStore } = storeSlice.actions;
export default storeSlice.reducer;
