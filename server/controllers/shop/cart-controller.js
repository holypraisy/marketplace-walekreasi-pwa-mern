const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const Seller = require("../../models/Seller");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Data yang diberikan tidak valid!",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    const seller = await Seller.findById(product.sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Toko tidak ditemukan.",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, itemsByStore: [] });
    }

    const storeIndex = cart.itemsByStore.findIndex(
      (entry) => entry.storeId.toString() === seller._id.toString()
    );

    if (storeIndex === -1) {
      cart.itemsByStore.push({
        storeId: seller._id,
        storeName: seller.storeName,
        items: [{ productId, quantity }],
      });
    } else {
      const productIndex = cart.itemsByStore[storeIndex].items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex === -1) {
        cart.itemsByStore[storeIndex].items.push({ productId, quantity });
      } else {
        cart.itemsByStore[storeIndex].items[productIndex].quantity += quantity;
      }
    }

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "ID pengguna wajib diisi!",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Keranjang tidak ditemukan.",
      });
    }

    // Populate product data manually
    for (const storeGroup of cart.itemsByStore) {
      for (const item of storeGroup.items) {
        const product = await Product.findById(item.productId).select(
          "image title price salePrice"
        );
        item.productData = product;
      }
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Data yang diberikan tidak valid!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Keranjang tidak ditemukan.",
      });
    }

    for (const storeGroup of cart.itemsByStore) {
      const itemIndex = storeGroup.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex !== -1) {
        storeGroup.items[itemIndex].quantity = quantity;
        break;
      }
    }

    await cart.save();

    // Repopulate after update
    for (const storeGroup of cart.itemsByStore) {
      for (const item of storeGroup.items) {
        const product = await Product.findById(item.productId).select(
          "image title price salePrice"
        );
        item.productData = product;
      }
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Data yang diberikan tidak valid!",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Keranjang tidak ditemukan.",
      });
    }

    cart.itemsByStore.forEach((storeGroup) => {
      storeGroup.items = storeGroup.items.filter(
        (item) => item.productId.toString() !== productId
      );
    });

    cart.itemsByStore = cart.itemsByStore.filter(
      (storeGroup) => storeGroup.items.length > 0
    );

    await cart.save();

    for (const storeGroup of cart.itemsByStore) {
      for (const item of storeGroup.items) {
        const product = await Product.findById(item.productId).select(
          "image title price salePrice"
        );
        item.productData = product;
      }
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
};