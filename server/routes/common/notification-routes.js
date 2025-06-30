const express = require("express");
const router = express.Router();
const { saveFcmToken } = require("../../controllers/common/notification-controller");
const authMiddleware = require("../../controllers/auth/auth-controller");

router.post("/save-token", saveFcmToken, authMiddleware);

module.exports = router;
