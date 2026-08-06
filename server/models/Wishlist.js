import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// One buyer can save one product only once
wishlistSchema.index(
    {
        buyer: 1,
        product: 1,
    },
    {
        unique: true,
    }
);

const Wishlist = mongoose.model(
    "Wishlist",
    wishlistSchema
);

export default Wishlist;