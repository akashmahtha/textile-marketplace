import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ========================================
// Checkout & Place Order
// ========================================

export const checkout = async (req, res) => {
    try {

        const {
            fullName,
            phone,
            address,
            city,
            state,
            pincode,
        } = req.body;

        const cartItems = await Cart.find({
            buyer: req.user._id,
        }).populate("product");

        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        // Group cart items by supplier
        const supplierOrders = {};

        cartItems.forEach((item) => {

            const supplierId = item.product.supplier.toString();

            if (!supplierOrders[supplierId]) {
                supplierOrders[supplierId] = [];
            }

            supplierOrders[supplierId].push(item);

        });

        const createdOrders = [];

        for (const supplierId in supplierOrders) {

            const items = supplierOrders[supplierId];

            let totalAmount = 0;

            const orderItems = items.map((item) => {

                totalAmount += item.product.price * item.quantity;

                return {
                    product: item.product._id,
                    quantity: item.quantity,
                    price: item.product.price,
                };

            });

            const order = await Order.create({

                buyer: req.user._id,

                supplier: supplierId,

                items: orderItems,

                shippingAddress: {
                    fullName,
                    phone,
                    address,
                    city,
                    state,
                    pincode,
                },

                totalAmount,

            });

            createdOrders.push(order);

        }

        await Cart.deleteMany({
            buyer: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            orders: createdOrders,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ========================================
// Buyer Order History
// ========================================

export const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            buyer: req.user._id,
        })
            .populate("supplier", "name email")
            .populate("items.product");

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ========================================
// Supplier Orders
// ========================================

export const getSupplierOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            supplier: req.user._id,
        })
            .populate("buyer", "name email phone")
            .populate("items.product");

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ========================================
// Update Order Status
// ========================================

export const updateOrderStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found",
            });

        }

        if (order.supplier.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Access Denied",
            });

        }

        order.status = status;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated",
            order,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
// ========================================
// Get Order Details
// ========================================

export const getOrderDetails = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("buyer", "name email phone")
            .populate("supplier", "name email phone")
            .populate("items.product");

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found",

            });

        }

        res.status(200).json({

            success: true,

            order,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};