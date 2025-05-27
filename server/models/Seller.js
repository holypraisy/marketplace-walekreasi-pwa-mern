const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  storeName: String,
  storeDescription: String,
  productionAddress: String,
  storeLogo: String,
  accountOwner: String,
  bankName: String,
  bankAccountNumber: String,
  eWallets: [String],
});

const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;
