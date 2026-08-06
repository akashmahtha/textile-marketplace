import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let cartItem = await Cart.findOne({
            buyer: req.user._id,
            product: productId
        });

        if (cartItem) {

            cartItem.quantity += quantity || 1;

            await cartItem.save();

        } else {

            cartItem = await Cart.create({
                buyer: req.user._id,
                product: productId,
                quantity: quantity || 1
            });

        }

        res.status(201).json({
            success: true,
            message: "Product added to cart",
            cartItem
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getCart = async (req, res) => {

    try {

        const cart = await Cart.find({
            buyer: req.user._id
        }).populate("product");

        res.status(200).json({
            success: true,
            totalItems: cart.length,
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updateCart = async (req, res) => {

    try {

        const { quantity } = req.body;

        const cart = await Cart.findById(req.params.id);

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });

        }

        cart.quantity = quantity;

        await cart.save();

        res.json({
            success: true,
            message: "Cart updated",
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const removeFromCart = async (req, res) => {

    try {

        const cart = await Cart.findById(req.params.id);

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Item not found"
            });

        }

        await cart.deleteOne();

        res.json({
            success: true,
            message: "Removed successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};