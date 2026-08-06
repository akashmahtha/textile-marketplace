import mongoose from "mongoose";

const buyerProfileSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        businessType: {
            type: String,
            required: true,
        },

        industry: {
            type: String,
            required: true,
        },

        interestedCategories: [
            {
                type: String,
            },
        ],

        preferredFabricTypes: [
            {
                type: String,
            },
        ],

        typicalOrderQuantity: {
            type: String,
            required: true,
        },

        budgetRange: {
            type: String,
            required: true,
        },

        onboardingCompleted: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "BuyerProfile",
    buyerProfileSchema
);