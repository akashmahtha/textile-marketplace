import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
    checkout,
    getMyOrders,
    getSupplierOrders,
    updateOrderStatus,
    getOrderDetails,
} from "../controllers/orderController.js";

const router = express.Router();

// ======================================
// Buyer Routes
// ======================================

// Checkout / Place Order
router.post(
    "/checkout",
    protect,
    authorize("buyer"),
    checkout
);

// Buyer Order History
router.get(
    "/my-orders",
    protect,
    authorize("buyer"),
    getMyOrders
);

// ======================================
// Supplier Routes
// ======================================

// Incoming Orders
router.get(
    "/supplier",
    protect,
    authorize("supplier"),
    getSupplierOrders
);

// Update Order Status
router.put(
    "/:id/status",
    protect,
    authorize("supplier"),
    updateOrderStatus
);

// ======================================
// Order Details (Buyer & Supplier)
// ======================================

router.get(
    "/:id",
    protect,
    getOrderDetails
);

export default router;