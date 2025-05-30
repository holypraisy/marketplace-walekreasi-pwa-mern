const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sellerName: { type: String, required: true }, // Nama lengkap seller
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  storeName: { type: String, required: true },
  storeDescription: String,
  productionAddress: String,
  accountOwner: String,
  bankName: String,
  bankAccountNumber: String,
  eWallets: [String],
});

const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;
