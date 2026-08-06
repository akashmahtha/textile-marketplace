import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    moveToCart,
} from "../controllers/wishlistController.js";

const router = express.Router();

// ======================================
// Get Wishlist
// ======================================

router.get(
    "/",
    protect,
    authorize("buyer"),
    getWishlist
);

// ======================================
// Add To Wishlist
// ======================================

router.post(
    "/:productId",
    protect,
    authorize("buyer"),
    addToWishlist
);

// ======================================
// Remove From Wishlist
// ======================================

router.delete(
    "/:productId",
    protect,
    authorize("buyer"),
    removeFromWishlist
);

// ======================================
// Move To Cart
// ======================================

router.post(
    "/move-to-cart/:productId",
    protect,
    authorize("buyer"),
    moveToCart
);

export default router;