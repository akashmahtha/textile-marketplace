import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

// ======================================
// Supplier Dashboard
// ======================================

// ======================================
// Supplier Dashboard
// ======================================

export const getSupplierDashboard = async (req, res) => {

    try {

        const totalProducts = await Product.countDocuments({
            supplier: req.user._id,
        });

        const activeProducts = await Product.countDocuments({
            supplier: req.user._id,
            stock: { $gt: 0 },
        });

        const outOfStock = await Product.countDocuments({
            supplier: req.user._id,
            stock: 0,
        });

        const pendingOrders = await Order.countDocuments({
            supplier: req.user._id,
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
            supplier: req.user._id,
            status: "Completed",
        });

        // ======================================
        // Total Revenue
        // ======================================

        const revenueResult = await Order.aggregate([

            {
                $match: {
                    supplier: req.user._id,
                    status: "Completed",
                },
            },

            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount",
                    },
                },
            },

        ]);

        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;

        // ======================================
        // Recent Orders
        // ======================================

        const recentOrders = await Order.find({
            supplier: req.user._id,
        })
            .populate("buyer", "name email")
            .sort({ createdAt: -1 })
            .limit(5);

        // ======================================
        // Low Stock Products
        // ======================================

        const lowStockProducts = await Product.find({
            supplier: req.user._id,
            stock: { $lte: 5 },
        })
            .select("name stock")
            .limit(5);

        // ======================================
        // Top Selling Products
        // ======================================

        const topProducts = await Order.aggregate([

            {
                $match: {
                    supplier: req.user._id,
                },
            },

            {
                $unwind: "$items",
            },

            {
                $group: {

                    _id: "$items.product",

                    sold: {
                        $sum: "$items.quantity",
                    },

                },

            },

            {
                $lookup: {

                    from: "products",

                    localField: "_id",

                    foreignField: "_id",

                    as: "product",

                },

            },

            {
                $unwind: "$product",

            },

            {
                $project: {

                    _id: 1,

                    name: "$product.name",

                    price: "$product.price",

                    image: {
                        $arrayElemAt: [
                            "$product.images",
                            0,
                        ],
                    },

                    sold: 1,

                },

            },

            {
                $sort: {
                    sold: -1,
                },
            },

            {
                $limit: 5,
            },

        ]);

        res.status(200).json({

            success: true,

            dashboard: {

                totalProducts,

                activeProducts,

                outOfStock,

                pendingOrders,

                completedOrders,

                totalRevenue,

                recentOrders,

                lowStockProducts,

                topProducts,

            },

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ======================================
// Supplier Profile
// ======================================

export const getSupplierProfile = async (req, res) => {

    try {

        const supplier = await User.findById(req.user._id).select("-password");

        res.status(200).json({
            success: true,
            supplier,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Update Supplier Profile
// ======================================

// ======================================
// Update Supplier Profile
// ======================================

// ======================================
// Update Supplier Profile
// ======================================

export const updateSupplierProfile = async (req, res) => {

    try {

        const supplier = await User.findById(req.user._id);

        if (!supplier) {

            return res.status(404).json({

                success: false,

                message: "Supplier not found",

            });

        }

        // Basic Information

        supplier.name = req.body.name || supplier.name;

        supplier.phone = req.body.phone || supplier.phone;

        // Supplier Profile

        supplier.supplierProfile.businessName =
            req.body.businessName ??
            supplier.supplierProfile.businessName;

        supplier.supplierProfile.businessType =
            req.body.businessType ??
            supplier.supplierProfile.businessType;

        supplier.supplierProfile.contact =
            req.body.contact ??
            supplier.supplierProfile.contact;

        supplier.supplierProfile.address =
            req.body.address ??
            supplier.supplierProfile.address;

        supplier.supplierProfile.operatingHours =
            req.body.operatingHours ??
            supplier.supplierProfile.operatingHours;

        supplier.supplierProfile.productCategories =
            req.body.productCategories ??
            supplier.supplierProfile.productCategories;

        supplier.supplierProfile.fabricTypes =
            req.body.fabricTypes ??
            supplier.supplierProfile.fabricTypes;

        supplier.supplierProfile.moq =
            req.body.moq ??
            supplier.supplierProfile.moq;

        supplier.supplierProfile.description =
            req.body.description ??
            supplier.supplierProfile.description;

        await supplier.save();

        res.status(200).json({

            success: true,

            message: "Supplier Profile Updated Successfully",

            supplier,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// ======================================
// Get All Suppliers (Public)
// ======================================

// ======================================
// Get All Suppliers (Public)
// ======================================

export const getAllSuppliers = async (req, res) => {

    try {

        const suppliers = await User.find({
            role: "supplier",
        })
            .select("name email phone supplierProfile");

        const supplierList = await Promise.all(

            suppliers.map(async (supplier) => {

                const totalProducts =
                    await Product.countDocuments({
                        supplier: supplier._id,
                    });

                const activeProducts =
                    await Product.countDocuments({
                        supplier: supplier._id,
                        stock: { $gt: 0 },
                    });

                return {

                    _id: supplier._id,

                    name: supplier.name,

                    email: supplier.email,

                    phone: supplier.phone,

                    supplierProfile:
                        supplier.supplierProfile,

                    totalProducts,

                    activeProducts,

                };

            })

        );

        res.status(200).json({

            success: true,

            count: supplierList.length,

            suppliers: supplierList,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ======================================
// Get Supplier By ID (Public)
// ======================================

// ======================================
// Get Supplier By ID (Public)
// ======================================

export const getSupplierById = async (req, res) => {

    try {

        const supplier = await User.findById(req.params.id)
            .select(
                "name email phone supplierProfile createdAt"
            );

        if (!supplier) {

            return res.status(404).json({
                success: false,
                message: "Supplier not found",
            });

        }

        const totalProducts = await Product.countDocuments({
            supplier: supplier._id,
        });

        const activeProducts = await Product.countDocuments({
            supplier: supplier._id,
            stock: { $gt: 0 },
        });

        const products = await Product.find({
            supplier: supplier._id,
        })
            .select(
                "name price images stock category"
            )
            .limit(8);

        res.status(200).json({

            success: true,

            supplier,

            totalProducts,

            activeProducts,

            products,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ======================================
// Get Supplier Products (Public)
// ======================================

export const getSupplierProducts = async (req, res) => {

    try {

        const products = await Product.find({
            supplier: req.params.id,
        });

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
