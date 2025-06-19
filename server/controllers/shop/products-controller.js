const Product = require("../../models/Product");
const Seller = require("../../models/Seller");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    // Filter berdasarkan kategori
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    // Sorting
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    // Ambil produk dari database
    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error in getFilteredProducts:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil produk.",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id); // Tanpa populate

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil detail produk.",
    });
  }
};

module.exports = {
  getFilteredProducts,
  getProductDetails,
};
