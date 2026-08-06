import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // =============================
        // Basic Information
        // =============================

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        phone: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: ["buyer", "supplier"],
            required: true,
        },

        // =============================
        // Onboarding Status
        // =============================

        profileCompleted: {
            type: Boolean,
            default: false,
        },

        // =============================
        // Buyer Profile
        // =============================

        buyerProfile: {

            businessType: {
                type: String,
                default: "",
            },

            industry: {
                type: String,
                default: "",
            },

            fabricInterest: {
                type: [String],
                default: [],
            },

            budget: {
                type: String,
                default: "",
            },

            orderQuantity: {
                type: String,
                default: "",
            },

        },

        // =============================
        // Supplier Profile
        // =============================

        supplierProfile: {

            businessName: {
                type: String,
                default: "",
            },

            businessType: {
                type: String,
                default: "",
            },

            contact: {
                type: String,
                default: "",
            },

            address: {
                type: String,
                default: "",
            },

            operatingHours: {
                type: String,
                default: "",
            },

            productCategories: {
                type: [String],
                default: [],
            },

            fabricTypes: {
                type: [String],
                default: [],
            },

            moq: {
                type: Number,
                default: 0,
            },

            description: {
                type: String,
                default: "",
            },

        },

    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;