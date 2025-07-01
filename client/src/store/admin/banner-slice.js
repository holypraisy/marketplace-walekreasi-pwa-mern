import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  banners: [],
  isLoading: false,
  error: null,
};

// Thunk untuk fetch semua banner
export const fetchBanners = createAsyncThunk(
  "banner/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/banner", {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Thunk untuk upload banner
export const uploadBanner = createAsyncThunk(
  "banner/uploadBanner",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/banner/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Thunk untuk delete banner
export const deleteBanner = createAsyncThunk(
  "banner/deleteBanner",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/banner/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Slice
const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(uploadBanner.fulfilled, (state, action) => {
        state.banners.unshift(action.payload);
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.banners = state.banners.filter((b) => b._id !== action.payload);
      });
  },
});

// Selectors
export const selectAllBanners = (state) => state.banner?.banners || [];

export const selectIntroBanners = createSelector(
  [selectAllBanners],
  (banners) => banners.filter((b) => b.type === "intro")
);

export const selectLandingBanners = createSelector(
  [selectAllBanners],
  (banners) => banners.filter((b) => b.type === "landing")
);

export const selectCustomerBanners = createSelector(
  [selectAllBanners],
  (banners) => banners.filter((b) => b.type === "customer")
);

export default bannerSlice.reducer;
