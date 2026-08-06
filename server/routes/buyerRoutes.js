import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
    getBuyerDashboard,
    getBuyerProfile,
    updateBuyerProfile,
    buyerOnboarding,
} from "../controllers/buyerController.js";

const router = express.Router();

router.get(
    "/dashboard",
    protect,
    authorize("buyer"),
    getBuyerDashboard
);

router.get(
    "/profile",
    protect,
    authorize("buyer"),
    getBuyerProfile
);

router.put(
    "/profile",
    protect,
    authorize("buyer"),
    updateBuyerProfile
);


router.post(
    "/onboarding",
    protect,
    authorize("buyer"),
    buyerOnboarding
);
export default router;