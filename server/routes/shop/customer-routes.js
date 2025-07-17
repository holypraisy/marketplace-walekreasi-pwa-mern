const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../controllers/auth/auth-controller");
const { getCustomerProfile } = require("../../controllers/shop/customer-controller");


router.get("/profile", authMiddleware, getCustomerProfile);

module.exports = router;
