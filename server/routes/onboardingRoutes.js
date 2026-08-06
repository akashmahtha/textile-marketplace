import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
    buyerOnboarding,
    supplierOnboarding,
} from "../controllers/onboardingController.js";

const router = express.Router();

// ======================================
// Buyer Onboarding
// ======================================

router.put(
    "/buyer",
    protect,
    authorize("buyer"),
    buyerOnboarding
);

// ======================================
// Supplier Onboarding
// ======================================

router.put(
    "/supplier",
    protect,
    authorize("supplier"),
    supplierOnboarding
);

export default router;