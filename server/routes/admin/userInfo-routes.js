const express = require("express");
const router = express.Router();

const { getSellerById, getAllSellers } = require("../../controllers/admin/sellers-controller");
const { getAllCustomers } = require("../../controllers/admin/customers-controller");
const { authMiddleware, isAdmin } = require("../../controllers/auth/auth-controller");


router.get("/sellers", authMiddleware, isAdmin, getAllSellers);

router.get("/seller/:id", authMiddleware, isAdmin, getSellerById);

router.get("/customers", authMiddleware, isAdmin, getAllCustomers);

router.get("/customer/:id", authMiddleware, isAdmin);

module.exports = router;
