const express = require("express");
const router = express.Router();
const {
  getSellerProfile,
  updateSellerProfile,
} = require("../../controllers/seller/profil-controller");
const {
  authMiddleware,
  isSeller,
} = require("../../controllers/auth/auth-controller");

router.get("/get", authMiddleware, isSeller, getSellerProfile);
router.put("/edit", authMiddleware, isSeller, updateSellerProfile);

module.exports = router;
