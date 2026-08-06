import User from "../models/User.js";

// ================= Buyer Onboarding =================

export const buyerOnboarding = async (req, res) => {
    try {
        const {
            businessType,
            industry,
            fabricInterest,
            budget,
            orderQuantity,
        } = req.body;

        const user = await User.findById(req.user._id);

        user.buyerProfile = {
            businessType,
            industry,
            fabricInterest,
            budget,
            orderQuantity,
        };

        user.profileCompleted = true;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Buyer onboarding completed successfully.",
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= Supplier Onboarding =================

// ================= Supplier Onboarding =================

export const supplierOnboarding = async (req, res) => {

    try {

        const {

            businessName,

            businessType,

            contact,

            address,

            operatingHours,

            productCategories,

            fabricTypes,

            moq,

            description,

        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found",

            });

        }

        // Optional: prevent onboarding again
        if (user.profileCompleted) {

            return res.status(400).json({

                success: false,

                message: "Onboarding already completed.",

            });

        }

        user.supplierProfile = {

            businessName,

            businessType,

            contact,

            address,

            operatingHours,

            productCategories,

            fabricTypes,

            moq,

            description,

        };

        user.profileCompleted = true;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Supplier onboarding completed successfully.",

            user,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};