import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
    getSupplierDashboard,
    getSupplierProfile,
    updateSupplierProfile,
    getAllSuppliers,
    getSupplierById,
    getSupplierProducts,
} from "../controllers/supplierController.js";

const router = express.Router();

// ======================================
// Public Routes
// ======================================

// Get All Suppliers
router.get("/", getAllSuppliers);

// ======================================
// Protected Routes
// ======================================

// Dashboard
router.get(
    "/dashboard",
    protect,
    authorize("supplier"),
    getSupplierDashboard
);

// Profile
router.get(
    "/profile",
    protect,
    authorize("supplier"),
    getSupplierProfile
);

// Update Profile
router.put(
    "/profile",
    protect,
    authorize("supplier"),
    updateSupplierProfile
);

// ======================================
// Public Supplier Details
// ======================================

// Supplier Products
router.get("/:id/products", getSupplierProducts);

// Supplier Details
router.get("/:id", getSupplierById);

export default router;