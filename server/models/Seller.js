const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Data Identitas & Domisili
  nik: {
    type: String,
  },
  domicileAddress: {
    type: String,
    required: true,
  },

  // Data Usaha
  storeName: {
    type: String,
    required: true,
  },
  storeDescription: {
    type: String,
  },
  productionAddress: {
    type: String,
  },
  storeLogoUrl: {
    type: String,
  },
  storeBannerUrl: {
    type: String,
  },

  // Data Pembayaran
  bankAccountOwner: {
    type: String,
  },
  bankName: {
    type: String,
  },
  bankAccountNumber: {
    type: String,
    match: /^[0-9]{6,20}$/, // validasi dasar
  },
  eWalletsAccountOwner: {
    type: String,
  },
  eWallet: {
    type: String,
  },
  eWalletAccountNumber: {
    type: String,
    match: /^[0-9]{6,20}$/, // validasi dasar
  },

  // Persetujuan
  agreedToTerms: {
    type: Boolean,
    required: true,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;
