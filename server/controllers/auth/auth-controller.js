const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Seller = require('../../models/Seller');

// register user (default)
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "Pengguna sudah terdaftar dengan email yang sama! Silakan coba lagi.",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name: userName, // perhatikan perubahan dari 'userName' ke 'name'
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registrasi Berhasil",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Terjadi Kesalahan",
    });
  }
};

const registerSeller = async (req, res) => {
  const {
    name,
    phoneNumber,
    email,
    password,
    storeName,
    storeDescription,
    productionAddress,
    storeLogo, // URL dari Cloudinary
    accountOwner,
    bankName,
    bankAccountNumber,
    eWallets,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Seller sudah terdaftar dengan email yang sama! Silakan coba lagi.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // 1. Simpan user dasar
    const newUser = new User({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
      role: "seller",
    });

    await newUser.save();

    // 2. Simpan data seller dengan referensi userId
    const newSeller = new Seller({
      userId: newUser._id,
      storeName,
      storeDescription,
      productionAddress,
      storeLogo,
      accountOwner,
      bankName,
      bankAccountNumber,
      eWallets,
    });

    await newSeller.save();

    res.status(201).json({
      success: true,
      message: "Pendaftaran seller berhasil.",
    });
  } catch (e) {
    console.error("Register Seller Error:", e);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mendaftar.",
    });
  }
};



// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "Pengguna tidak ditemukan! Silahkan Mendaftar.",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Kata Sandi salah! Silahkan Coba Lagi.",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        name: checkUser.name,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Berhasil Masuk !",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        name: checkUser.name,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Terjadi Kesalahan",
    });
  }
};

// logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Berhasil Keluar !",
  });
};

// auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Akses ditolak. Anda tidak memiliki izin untuk melakukan tindakan ini.",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Akses ditolak. Anda tidak memiliki izin untuk melakukan tindakan ini.",
    });
  }
};

module.exports = {
  registerUser,
  registerSeller, // ✅ tambahkan ekspor fungsi baru
  loginUser,
  logoutUser,
  authMiddleware,
};
