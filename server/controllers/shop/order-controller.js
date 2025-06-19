const snap = require("../../helpers/midtrans");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Membuat pesanan dan token Midtrans Snap
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      totalAmount,
    } = req.body;

    // Simpan data order sementara dengan status pending
    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "pending",
      paymentMethod: "midtrans",
      paymentStatus: "unpaid",
      totalAmount,
      orderDate: new Date(),
    });

    await newOrder.save();

    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: newOrder._id.toString(),
        gross_amount: totalAmount,
      },
      customer_details: {
        first_name: userId,
        phone: addressInfo.phone,
      },
    });

    res.status(201).json({
      success: true,
      snapToken: transaction.token,
      orderId: newOrder._id,
    });
  } catch (err) {
    console.error("Midtrans error:", err);
    res.status(500).json({
      success: false,
      message: "Gagal membuat pesanan",
    });
  }
};

// Handler untuk konfirmasi pembayaran manual dari frontend
const capturePayment = async (req, res) => {
  try {
    const { orderId, transactionStatus } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order tidak ditemukan",
      });
    }

    if (["settlement", "capture"].includes(transactionStatus)) {
      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      order.orderUpdateDate = new Date();

      // Kurangi stok produk
      for (let item of order.cartItems) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.totalStock -= item.quantity;
          await product.save();
        }
      }

      // Hapus cart
      await Cart.findByIdAndDelete(order.cartId);
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: "Pembayaran dikonfirmasi",
    });
  } catch (err) {
    console.error("Capture error:", err);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memproses pembayaran",
    });
  }
};

// Handler webhook dari Midtrans
const midtransCallback = async (req, res) => {
  try {
    const { order_id, transaction_status } = req.body;

    const order = await Order.findById(order_id);
    if (!order) return res.status(404).send("Order not found");

    if (["settlement", "capture"].includes(transaction_status)) {
      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      order.orderUpdateDate = new Date();

      await Cart.findByIdAndDelete(order.cartId);
      await order.save();
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("Callback error:", err);
    res.status(500).send("Gagal memproses callback");
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
        message: "Tidak ada pesanan ditemukan",
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
      message: "Gagal mengambil pesanan",
    });
  }
};

// Mendapatkan detail pesanan berdasarkan id
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pesanan tidak ditemukan",
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
      message: "Gagal mengambil detail pesanan",
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
