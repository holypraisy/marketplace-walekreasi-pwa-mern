const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new product
const Seller = require("../../models/Seller"); // pastikan ini diimport

const addProduct = async (req, res) => {
  const {
    image,
    title,
    description,
    category,
    price,
    salePrice,
    totalStock,
    averageReview,
  } = req.body;

  try {
    console.log("Decoded user:", req.user); // DEBUG

    // Gunakan field `user` dari model Seller
    const seller = await Seller.findOne({ user: req.user.id });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Toko tidak ditemukan.",
      });
    }

    const product = new Product({
      image,
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
      averageReview,
      sellerId: req.user.id,
      storeName: seller.storeName,
    });

    await product.save();
    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      product,
    });
  } catch (error) {
    console.error("Gagal menambahkan produk:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan produk",
    });
  }
};


//fetch all products (hanya produk milik seller terkait)
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({ sellerId: req.user._id });
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil produk",
    });
  }
};

//edit a product (hanya jika dimiliki seller)
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const findProduct = await Product.findOne({ _id: id, sellerId: req.user._id });
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan atau Anda tidak memiliki akses",
      });

    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengedit produk",
    });
  }
};

//delete a product (hanya jika dimiliki seller)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOneAndDelete({ _id: id, sellerId: req.user._id });

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });

    res.status(200).json({
      success: true,
      message: "Produk berhasil dihapus",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus produk",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
