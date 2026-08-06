import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
        },

        colors: [
            {
                type: String,
            },
        ],

        specifications: {
            gsm: String,
            width: String,
            composition: String,
            weave: String,
        },

        // Cloudinary Images
        images: [
            {
                public_id: {
                    type: String,
                    required: true,
                },

                url: {
                    type: String,
                    required: true,
                },
            },
        ],

        isAvailable: {
            type: Boolean,
            default: true,
        },

    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;