import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";


// ================================
// Buyer Dashboard
// ================================

export const getBuyerDashboard = async (req, res) => {
    try {

        const totalOrders = await Order.countDocuments({
            buyer: req.user._id,
        });

        const pendingOrders = await Order.countDocuments({
            buyer: req.user._id,
            status: {
                $in: [
                    "Pending",
                    "Accepted",
                    "Preparing",
                    "Ready for Dispatch",
                ],
            },
        });

        const completedOrders = await Order.countDocuments({
            buyer: req.user._id,
            status: "Completed",
        });

        const cartItems = await Cart.countDocuments({
            buyer: req.user._id,
        });

        const recentOrders = await Order.find({
            buyer: req.user._id,
        })
            .populate("supplier", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            dashboard: {
                totalOrders,
                pendingOrders,
                completedOrders,
                cartItems,
                recentOrders,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ================================
// Buyer Profile
// ================================

export const getBuyerProfile = async (req, res) => {

    try {

        const buyer = await User.findById(req.user._id).select("-password");

        res.status(200).json({
            success: true,
            buyer,
            profileCompleted: buyer.profileCompleted,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// ================================
// Update Buyer Profile
// ================================

export const updateBuyerProfile = async (req, res) => {

    try {

        const buyer = await User.findById(req.user._id);

        if (!buyer) {
            return res.status(404).json({
                success: false,
                message: "Buyer not found",
            });
        }

        buyer.name = req.body.name || buyer.name;
        buyer.phone = req.body.phone || buyer.phone;

        await buyer.save();

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            buyer,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ======================================
// Buyer Onboarding
// ======================================

export const buyerOnboarding = async (req, res) => {

    try {

        const {

            businessType,

            industry,

            fabricInterest,

            budget,

            orderQuantity,

        } = req.body;

        const buyer = await User.findById(req.user._id);

        if (!buyer) {

            return res.status(404).json({
                success: false,
                message: "Buyer not found",
            });

        }

        buyer.buyerProfile = {

            businessType,

            industry,

            fabricInterest,

            budget,

            orderQuantity,

        };

        buyer.profileCompleted = true;

        await buyer.save();

        res.status(200).json({

            success: true,

            message: "Buyer onboarding completed",

            buyer,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};