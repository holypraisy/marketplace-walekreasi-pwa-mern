const User = require("../models/User");

exports.saveFcmToken = async (req, res) => {
  const userId = req.user?._id || req.body.userId;
  const { fcmToken } = req.body;

  if (!userId || !fcmToken) {
    return res.status(400).json({ message: "User ID and FCM token are required." });
  }

  try {
    await User.findByIdAndUpdate(userId, { fcmToken });
    res.status(200).json({ message: "Token saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save token", error });
  }
};
