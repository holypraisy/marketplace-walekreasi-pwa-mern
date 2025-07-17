const User = require("../../models/User");

const getCustomerProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("userName email phoneNumber role");

    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCustomerProfile };
