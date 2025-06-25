import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Ambil pesanan yang belum dibayar ke seller
export const fetchUnpaidOrders = createAsyncThunk(
  "payout/fetchUnpaidOrders",
  async () => {
    const res = await axios.get("http://localhost:5000/api/payout/unpaid", { withCredentials: true });
    return res.data.data;
  }
);

// Tandai pesanan seller sebagai sudah dibayar
export const markOrdersAsPaid = createAsyncThunk(
  "payout/markOrdersAsPaid",
  async (sellerId) => {
    const res = await axios.post(
      "http://localhost:5000/api/payout/mark-paid",
      { sellerId },
      { withCredentials: true }
    );
    return res.data;
  }
);

// (Opsional) Ambil histori payout jika dibutuhkan nanti
export const fetchPayoutHistory = createAsyncThunk(
  "payout/fetchPayoutHistory",
  async () => {
    const res = await axios.get("http://localhost:5000/api/payout/history", { withCredentials: true });
    return res.data.data;
  }
);

// Slice utama
const payoutSlice = createSlice({
  name: "payout",
  initialState: {
    unpaidOrders: {},
    payoutHistory: [],
    loading: false,
    error: null,
    payoutSuccess: null, // untuk pesan sukses
  },
  reducers: {
    // Untuk mereset status sukses setelah beberapa detik
    clearPayoutStatus: (state) => {
      state.payoutSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnpaidOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUnpaidOrders.fulfilled, (state, action) => {
        state.unpaidOrders = action.payload;
        state.loading = false;
      })
      .addCase(fetchUnpaidOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(markOrdersAsPaid.fulfilled, (state, action) => {
        const sellerId = action.meta.arg;
        delete state.unpaidOrders[sellerId];
        state.payoutSuccess = "Pembayaran ke seller berhasil ditandai.";
      })
      .addCase(fetchPayoutHistory.fulfilled, (state, action) => {
        state.payoutHistory = action.payload;
      });
  },
});

// Export reducer dan action tambahan
export const { clearPayoutStatus } = payoutSlice.actions;
export default payoutSlice.reducer;
