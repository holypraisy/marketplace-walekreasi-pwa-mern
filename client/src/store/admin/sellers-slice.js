import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ State Awal
const initialState = {
  sellers: [],
  selectedSeller: null,
  isLoading: false,
  error: null,
};

// ✅ Fetch semua seller
export const fetchAllSellers = createAsyncThunk(
  "admin/fetchAllSellers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/info/sellers",
        { withCredentials: true }
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Fetch seller by ID
export const fetchSellerById = createAsyncThunk(
  "admin/fetchSellerById",
  async (sellerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/info/seller/${sellerId}`,
        { withCredentials: true }
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Slice
const sellersInfoSlice = createSlice({
  name: "sellersInfo",
  initialState,
  reducers: {
    clearSelectedSeller: (state) => {
      state.selectedSeller = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔻 FETCH ALL
      .addCase(fetchAllSellers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔻 FETCH BY ID
      .addCase(fetchSellerById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedSeller = action.payload;
      })
      .addCase(fetchSellerById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedSeller } = sellersInfoSlice.actions;
export default sellersInfoSlice.reducer;