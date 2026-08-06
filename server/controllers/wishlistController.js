import Wishlist from "../models/Wishlist.js";
import Cart from "../models/Cart.js";

// ==========================================
// Add To Wishlist
// ==========================================

export const addToWishlist = async (req, res) => {

    try {

        const { productId } = req.params;

        const exists = await Wishlist.findOne({
            buyer: req.user._id,
            product: productId,
        });

        if (exists) {

            return res.status(400).json({
                success: false,
                message: "Product already in wishlist",
            });

        }

        const wishlist = await Wishlist.create({

            buyer: req.user._id,

            product: productId,

        });

        res.status(201).json({

            success: true,

            message: "Added to Wishlist",

            wishlist,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==========================================
// Get My Wishlist
// ==========================================

export const getWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.find({

            buyer: req.user._id,

        })
            .populate("product")
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: wishlist.length,

            wishlist,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==========================================
// Remove From Wishlist
// ==========================================

export const removeFromWishlist = async (req, res) => {

    try {

        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({

            buyer: req.user._id,

            product: productId,

        });

        if (!wishlist) {

            return res.status(404).json({

                success: false,

                message: "Wishlist item not found",

            });

        }

        await wishlist.deleteOne();

        res.status(200).json({

            success: true,

            message: "Removed from Wishlist",

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==========================================
// Move Wishlist Item To Cart
// ==========================================

export const moveToCart = async (req, res) => {

    try {

        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({

            buyer: req.user._id,

            product: productId,

        });

        if (!wishlist) {

            return res.status(404).json({

                success: false,

                message: "Wishlist item not found",

            });

        }

        const cartItem = await Cart.findOne({

            buyer: req.user._id,

            product: productId,

        });

        if (cartItem) {

            cartItem.quantity += 1;

            await cartItem.save();

        } else {

            await Cart.create({

                buyer: req.user._id,

                product: productId,

                quantity: 1,

            });

        }

        await wishlist.deleteOne();

        res.status(200).json({

            success: true,

            message: "Product moved to cart",

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};