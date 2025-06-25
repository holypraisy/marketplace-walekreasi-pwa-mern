import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminStats = createAsyncThunk(
  "adminDashboard/fetchStats",
  async () => {
    const res = await axios.get("http://localhost:5000/api/admin/dashboard/stats", {
      withCredentials: true,
    });
    return res.data.data;
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    sellerCount: 0,
    customerCount: 0,
    weeklyPerformance: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.sellerCount = action.payload.sellerCount;
        state.customerCount = action.payload.customerCount;
        state.weeklyPerformance = action.payload.weeklyPerformance;
        state.loading = false;
      })
      .addCase(fetchAdminStats.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default adminDashboardSlice.reducer;
