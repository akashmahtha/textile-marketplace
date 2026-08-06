import express from "express";

import {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getMyProducts,
    searchProducts,
    getCategories,
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// =========================
// Public Routes
// =========================

// Get All Products
router.get("/", getAllProducts);

// Get All Categories
router.get("/categories", getCategories);

// Search Products
router.get("/search", searchProducts);

// =========================
// Supplier Routes
// =========================

// My Products
router.get(
    "/supplier/my-products",
    protect,
    authorize("supplier"),
    getMyProducts
);

// Add Product
router.post(
    "/",
    protect,
    authorize("supplier"),
    upload.array("images", 5),
    addProduct
);

// Update Product
router.put(
    "/:id",
    protect,
    authorize("supplier"),
    upload.array("images", 5),
    updateProduct
);

// Delete Product
router.delete(
    "/:id",
    protect,
    authorize("supplier"),
    deleteProduct
);

// =========================
// Product Details
// =========================

router.get("/:id", getProductById);

export default router;