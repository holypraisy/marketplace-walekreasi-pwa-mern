require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Route imports...
const authRouter = require("./routes/auth/auth-routes");
const SellerProductsRouter = require("./routes/seller/products-routes");
const SellerOrderRouter = require("./routes/seller/order-routes");
const SellerProfileRouter = require("./routes/seller/profile-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const shopStoreRouter = require("./routes/shop/store-routes");
const payoutRoutes = require("./routes/admin/payout-routes");
const adminDashboardRoutes = require("./routes/admin/dashboard-route");
const infoRoutes = require("./routes/admin/Info-routes");
const bannerRoutes = require("./routes/admin/banner-route");
const notificationRoutes = require("./routes/common/notification-routes");
const customerRoutes = require("./routes/shop/customer-routes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Koneksi MongoDB pakai variabel dari .env
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// ✅ Midtrans webhook harus pakai raw body parser
app.use("/api/shop/order/midtrans-callback", express.raw({ type: "*/*" }));

// ✅ Body parser standar
app.use(express.json());
app.use(cookieParser());

// ✅ CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
    credentials: true,
  })
);

// ✅ Routing
app.use("/api/auth", authRouter);
app.use("/api/store/products", SellerProductsRouter);
app.use("/api/store/orders", SellerOrderRouter);
app.use("/api/store/profile", SellerProfileRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/store", shopStoreRouter);
app.use("/api/shop/customer", customerRoutes);
app.use("/api/admin/payout", payoutRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin/info", infoRoutes);
app.use("/api/admin/banner", bannerRoutes);
app.use("/api/admin/notification", notificationRoutes);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
