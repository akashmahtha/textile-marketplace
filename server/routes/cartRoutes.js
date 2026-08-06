import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
} from "../controllers/cartController.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize("buyer"),
    addToCart
);

router.get(
    "/",
    protect,
    authorize("buyer"),
    getCart
);

router.put(
    "/:id",
    protect,
    authorize("buyer"),
    updateCart
);

router.delete(
    "/:id",
    protect,
    authorize("buyer"),
    removeFromCart
);

export default router;