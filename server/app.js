import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import onboardingRoutes from "./routes/onboardingRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import buyerRoutes from "./routes/buyerRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// =======================
// CORS
// =======================

const allowedOrigins = [
    "http://localhost:5173",
    "https://textile-marketplace-chi.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {

            // Allow Postman, mobile apps, etc.
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.log("Blocked Origin:", origin);

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

// =======================
// Middlewares
// =======================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

app.use(morgan("dev"));

// =======================
// Static Files
// =======================

app.use("/uploads", express.static(path.resolve("uploads")));

// =======================
// Health Check
// =======================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Textile Marketplace Backend is Running",
    });
});

// =======================
// API Routes
// =======================

app.use("/api/auth", authRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/ai", aiRoutes);

// =======================
// 404 Route
// =======================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

export default app;