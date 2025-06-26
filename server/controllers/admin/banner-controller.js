const Banner = require("../../models/Banner");
const { imageUploadUtil } = require("../../helpers/cloudinary");

// Upload banner baru
const uploadBanner = async (req, res) => {
  try {
    const { type, caption, redirectUrl } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Gambar tidak ditemukan" });
    }

    const uploaded = await imageUploadUtil(req.file.buffer.toString("base64"));

    const newBanner = new Banner({
      type,
      imageUrl: uploaded.secure_url,
      caption,
      redirectUrl,
    });

    await newBanner.save();

    res.status(201).json({
      success: true,
      message: "Banner berhasil diunggah",
      data: newBanner,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal upload banner", error: err.message });
  }
};

// Ambil semua banner
const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: banners });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal mengambil data", error: err.message });
  }
};

// Hapus banner
const deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Banner berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menghapus banner", error: err.message });
  }
};

module.exports = {
  uploadBanner,
  getAllBanners,
  deleteBanner,
};
