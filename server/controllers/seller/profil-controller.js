const Seller = require("../../models/Seller");

// [GET] Menampilkan profil seller yang sedang login
const getSellerProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const seller = await Seller.findOne({ user: userId });
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Profil seller tidak ditemukan.",
      });
    }

    res.status(200).json({
      success: true,
      data: seller,
    });
  } catch (error) {
    console.error("Gagal mendapatkan profil seller:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil profil seller.",
    });
  }
};

// [PUT] Memperbarui profil seller
const updateSellerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    const seller = await Seller.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      { new: true } // return document yang sudah diperbarui
    );

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Profil seller tidak ditemukan.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profil seller berhasil diperbarui.",
      data: seller,
    });
  } catch (error) {
    console.error("Gagal memperbarui profil seller:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui profil seller.",
    });
  }
};

module.exports = {
  getSellerProfile,
  updateSellerProfile,
};
