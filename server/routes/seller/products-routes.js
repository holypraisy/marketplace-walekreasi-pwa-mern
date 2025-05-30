const express = require("express");
const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/seller/products-controller");
const { upload } = require("../../helpers/cloudinary");
const { isAuthenticated, isSeller } = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/upload-image", isAuthenticated, isSeller, upload.single("my_file"), handleImageUpload);
router.post("/add", isAuthenticated, isSeller, addProduct);
router.put("/edit/:id", isAuthenticated, isSeller, editProduct);
router.delete("/delete/:id", isAuthenticated, isSeller, deleteProduct);
router.get("/get", isAuthenticated, isSeller, fetchAllProducts);
router.get("/my-products", isAuthenticated, isSeller, async (req, res) => {
  try {
    const products = await Product.find({ storeId: req.user.storeId });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
