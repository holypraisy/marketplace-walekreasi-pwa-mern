const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // 🔐 untuk keamanan
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  role: {
    type: String,
    enum: ["admin", "seller", "customer"],
    default: "customer",
  },
  fcmToken: {
    type: String,
    default: null,
  },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;
