const snap = require("../../helpers/midtrans");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const User = require("../../models/User");
const Seller = require("../../models/Seller");

// Membuat pesanan dan token Midtrans Snap
const createOrder = async (req, res) => {
  try {
    const { userId, cartId, cartItems, addressInfo, totalAmount } = req.body;

    // Ambil email user dari model User
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User tidak ditemukan" });

    // Lengkapi cartItems dengan storeName dari Seller
    const updatedCartItems = await Promise.all(cartItems.map(async (item) => {
      const product = await Product.findById(item.productId);
      const seller = await Seller.findById(product?.sellerId);
      return {
        ...item,
        storeName: seller?.storeName || "Toko Tidak Diketahui",
      };
    }));

    // Simpan order ke database
    const newOrder = new Order({
      userId,
      cartId,
      cartItems: updatedCartItems,
      addressInfo,
      orderStatus: "Menunggu Konfirmasi",
      paymentStatus: "Belum Dibayar",
      totalAmount,
      orderDate: new Date(),
    });

    await newOrder.save();

    // Transaksi Midtrans
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: newOrder._id.toString(),
        gross_amount: totalAmount,
      },
      item_details: updatedCartItems.map((item) => ({
        id: item.productId,
        price: item.price,
        quantity: item.quantity,
        name: `${item.title} | Toko: ${item.storeName}`,
      })),
      customer_details: {
        first_name: addressInfo?.receiverName,
        phone: addressInfo?.phone,
        email: user.email,
      },
      custom_field1: updatedCartItems[0]?.storeName || "Toko Tidak Diketahui",
    });

    res.status(201).json({
      success: true,
      snapToken: transaction.token,
      redirectUrl: transaction.redirect_url,
      orderId: newOrder._id,
    });
  } catch (err) {
    console.error("Midtrans error:", err);
    res.status(500).json({
      success: false,
      message: "Gagal membuat pesanan. Silakan coba lagi nanti.",
    });
  }
};

// Konfirmasi manual (jika tidak pakai webhook)
const capturePayment = async (req, res) => {
  try {
    const { orderId, transactionStatus } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pesanan tidak ditemukan.",
      });
    }

    if (["settlement", "capture"].includes(transactionStatus)) {
      order.paymentStatus = "Terbayar";
      order.orderStatus = "Dikonfirmasi";
      order.orderUpdateDate = new Date();

      for (let item of order.cartItems) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.totalStock -= item.quantity;
          await product.save();
        }
      }

      await Cart.findByIdAndDelete(order.cartId);
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: "Pembayaran berhasil dikonfirmasi.",
    });
  } catch (err) {
    console.error("Capture error:", err);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memproses pembayaran.",
    });
  }
};

// Webhook Midtrans
const midtransCallback = async (req, res) => {
  try {
    const { order_id, transaction_status } = req.body;

    const order = await Order.findById(order_id);
    if (!order) return res.status(404).send("Pesanan tidak ditemukan.");

    if (["settlement", "capture"].includes(transaction_status)) {
      order.paymentStatus = "Terbayar";
      order.orderStatus = "Dikonfirmasi";
      order.orderUpdateDate = new Date();

      await Cart.findByIdAndDelete(order.cartId);
      await order.save();
    }

    res.status(200).send("Callback berhasil diproses.");
  } catch (err) {
    console.error("Callback error:", err);
    res.status(500).send("Gagal memproses callback.");
  }
};

// Mendapatkan semua pesanan berdasarkan userId
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "Tidak ada pesanan yang ditemukan.",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil daftar pesanan.",
    });
  }
};

// Mendapatkan detail pesanan berdasarkan ID
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Detail pesanan tidak ditemukan.",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    console.error("Get order detail error:", err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail pesanan.",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
  midtransCallback,
};
