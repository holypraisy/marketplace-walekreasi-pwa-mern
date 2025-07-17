require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Seller = require("../../models/Seller");

// ========================= Register Customer =========================
const registerUser = async (req, res) => {
  const { userName, email, password, phoneNumber } = req.body;

  try {
    if (!userName || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "Mohon lengkapi semua data" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Kata sandi minimal 8 karakter" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      return res.status(409).json({ message: "Nomor telepon sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await newUser.save();

    res.status(201).json({ message: "Pendaftaran berhasil" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// ========================= Register Seller =========================
const registerSeller = async (req, res) => {
  const {
    sellerName,
    phoneNumber,
    email,
    password,
    nik,
    domicileAddress,
    storeName,
    storeDescription,
    productionAddress,
    bankAccountOwner,
    bankName,
    bankAccountNumber,
    eWalletsAccountOwner,
    eWallet,
    eWalletAccountNumber,
    agreedToTerms
  } = req.body;

  try {
    if (!sellerName || !phoneNumber || !email || !password || !nik || !storeName) {
      return res.status(400).json({ success: false, message: "Data penting tidak boleh kosong" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email sudah terdaftar" });
    }

    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      return res.status(409).json({ success: false, message: "Nomor telepon sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName: sellerName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: "seller",
    });
    await newUser.save();

    const newSeller = new Seller({
      user: newUser._id,
      sellerName,
      phoneNumber,
      email,
      nik,
      domicileAddress,
      storeName,
      storeDescription,
      productionAddress,
      bankAccountOwner,
      bankName,
      bankAccountNumber,
      eWalletsAccountOwner,
      eWallet,
      eWalletAccountNumber,
      agreedToTerms: agreedToTerms || false,
    });
    await newSeller.save();

    res.status(201).json({
      success: true,
      message: "Pendaftaran seller berhasil.",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        sellerId: newSeller._id,
      },
    });
  } catch (error) {
    console.error("Register Seller Error:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan saat mendaftar" });
  }
};

// ========================= Login =========================
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Validasi input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan kata sandi wajib diisi",
      });
    }

    // 2. Cari user berdasarkan email
    const user = await User.findOne({ email });

    // 3. Cek user dan password
    if (!user || typeof user.password !== "string") {
      return res.status(401).json({
        success: false,
        message: "Pengguna tidak ditemukan atau data tidak lengkap",
      });
    }

    // 4. Bandingkan password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Kata sandi salah. Silakan coba lagi.",
      });
    }

    // 5. Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );

    // 6. Kirim token sebagai cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true di produksi
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 jam
    });

    // 7. Kirim respons sukses
    res.json({
      success: true,
      message: "Berhasil masuk",
      user: {
        id: user._id,
        name: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    console.error("Login Error:", e);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat login",
    });
  }
};


// ========================= Logout =========================
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Berhasil keluar",
  });
};

// ========================= Middleware =========================
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Akses ditolak. Tidak ada token.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Pengguna tidak ditemukan." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ success: false, message: "Token tidak valid." });
  }
};

const isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  return res.status(401).json({ success: false, message: "Anda harus login terlebih dahulu." });
};

const isSeller = (req, res, next) => {
  if (req.user?.role === "seller") return next();
  return res.status(403).json({ success: false, message: "Akses ditolak. Hanya seller yang diizinkan." });
};

const isAdmin = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ success: false, message: "Akses ditolak. Hanya admin yang diizinkan." });
};

module.exports = {
  registerUser,
  registerSeller,
  loginUser,
  logoutUser,
  authMiddleware,
  isAuthenticated,
  isSeller,
  isAdmin,
};
