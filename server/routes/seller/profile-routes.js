const express = require("express");
const router = express.Router();
const {
  getSellerProfile,
  updateSellerProfile,
  uploadStoreImage,
} = require("../../controllers/seller/profil-controller");

const {
  authMiddleware,
  isSeller,
} = require("../../controllers/auth/auth-controller");

const { upload } = require("../../helpers/cloudinary"); // pakai middleware multer

router.get("/get", authMiddleware, isSeller, getSellerProfile);
router.put("/edit", authMiddleware, isSeller, updateSellerProfile);

// Upload logo atau banner
router.post(
  "/upload-image",
  authMiddleware,
  isSeller,
  upload.single("my_file"), // sesuai field name dari form
  uploadStoreImage
);

module.exports = router;
