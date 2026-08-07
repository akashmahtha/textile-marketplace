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
// Middlewares
// =======================
const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL,
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (Postman, mobile apps, etc.)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

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
app.use("/uploads", express.static(path.resolve("uploads")));
// Health Check Route
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

// import authRoutes from "./routes/authRoutes.js";

// 
// 
// 
// import aiRoutes from "./routes/aiRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/supplier", supplierRoutes);
// app.use("/api/ai", aiRoutes);
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