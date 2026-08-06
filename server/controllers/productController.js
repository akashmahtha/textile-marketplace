import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ======================================
// Upload Image To Cloudinary
// ======================================

const uploadToCloudinary = (buffer) => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

            {
                folder: "textile-marketplace/products",
            },

            (error, result) => {

                if (error) {

                    console.log("Cloudinary Error:", error);

                    return reject(error);

                }

                resolve(result);

            }

        );

        streamifier
            .createReadStream(buffer)
            .pipe(stream);

    });

};

// ============================
// Add Product
// ============================

export const addProduct = async (req, res) => {

    try {

        console.log("Body:", req.body);
        console.log("Files:", req.files);

        const {

            name,
            category,
            description,
            price,
            stock,
            colors,
            specifications,

        } = req.body;

        // ==========================
        // Validation
        // ==========================

        if (
            !name ||
            !category ||
            !description ||
            !price ||
            !stock
        ) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields",

            });

        }

        // ==========================
        // Upload Images
        // ==========================

        let images = [];

        if (req.files && req.files.length > 0) {

            for (const file of req.files) {

                const uploadedImage =
                    await uploadToCloudinary(file.buffer);

                images.push({

                    public_id: uploadedImage.public_id,

                    url: uploadedImage.secure_url,

                });

            }

        }

        // ==========================
        // Create Product
        // ==========================

        const product = await Product.create({

            supplier: req.user._id,

            name,

            category,

            description,

            price,

            stock,

            colors: colors

                ? Array.isArray(colors)

                    ? colors

                    : colors
                        .split(",")
                        .map(color => color.trim())

                : [],

            specifications: specifications

                ? typeof specifications === "string"

                    ? JSON.parse(specifications)

                    : specifications

                : {},

            images,

        });

        // ==========================
        // Response
        // ==========================

        return res.status(201).json({

            success: true,

            message: "Product Added Successfully",

            product,

        });

    } catch (error) {

        console.error("========== ADD PRODUCT ERROR ==========");

        console.error(error);

        console.error(error.stack);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==============================
// Update Product
// ==============================

export const updateProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found",

            });

        }

        // ==========================
        // Authorization
        // ==========================

        if (product.supplier.toString() !== req.user._id.toString()) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized",

            });

        }

        // ==========================
        // Upload New Images
        // ==========================

        if (req.files && req.files.length > 0) {

            // Delete Old Images From Cloudinary

            for (const image of product.images) {

                if (image.public_id) {

                    await cloudinary.uploader.destroy(

                        image.public_id

                    );

                }

            }

            let images = [];

            for (const file of req.files) {

                const uploadedImage =
                    await uploadToCloudinary(file.buffer);

                images.push({

                    public_id: uploadedImage.public_id,

                    url: uploadedImage.secure_url,

                });

            }

            product.images = images;

        }

        // ==========================
        // Update Fields
        // ==========================

        product.name = req.body.name || product.name;

        product.category =
            req.body.category || product.category;

        product.description =
            req.body.description || product.description;

        product.price =
            req.body.price || product.price;

        product.stock =
            req.body.stock || product.stock;

        // ==========================
        // Colors
        // ==========================

        if (req.body.colors) {

            product.colors =

                Array.isArray(req.body.colors)

                    ? req.body.colors

                    : req.body.colors

                        .split(",")

                        .map(color => color.trim());

        }

        // ==========================
        // Specifications
        // ==========================

        if (req.body.specifications) {

            product.specifications =

                typeof req.body.specifications === "string"

                    ? JSON.parse(req.body.specifications)

                    : req.body.specifications;

        }

        await product.save();

        res.status(200).json({

            success: true,

            message: "Product Updated Successfully",

            product,

        });

    } catch (error) {

        console.error("========== UPDATE PRODUCT ERROR ==========");

        console.error(error);

        console.error(error.stack);

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==============================
// Delete Product
// ==============================

export const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found",

            });

        }

        // ==========================
        // Authorization
        // ==========================

        if (product.supplier.toString() !== req.user._id.toString()) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized",

            });

        }

        // ==========================
        // Delete Images From Cloudinary
        // ==========================

        if (product.images && product.images.length > 0) {

            for (const image of product.images) {

                if (image.public_id) {

                    await cloudinary.uploader.destroy(
                        image.public_id
                    );

                }

            }

        }

        // ==========================
        // Delete Product
        // ==========================

        await product.deleteOne();

        return res.status(200).json({

            success: true,

            message: "Product Deleted Successfully",

        });

    } catch (error) {

        console.error("========== DELETE PRODUCT ERROR ==========");

        console.error(error);

        console.error(error.stack);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==============================
// Get My Products
// ==============================

export const getMyProducts = async (req, res) => {

    try {

        const products = await Product.find({

            supplier: req.user._id,

        }).sort({

            createdAt: -1,

        });

        return res.status(200).json({

            success: true,

            count: products.length,

            products,

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==============================
// Get All Products
// ==============================

export const getAllProducts = async (req, res) => {

    try {

        const products = await Product.find()
            .populate("supplier", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({

            success: true,

            count: products.length,

            products,

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==============================
// Get Product By ID
// ==============================

export const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)
            .populate("supplier", "name email phone");

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found",

            });

        }

        return res.status(200).json({

            success: true,

            product,

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==============================
// Search Products
// ==============================

export const searchProducts = async (req, res) => {

    try {

        const {

            keyword,

            category,

            color,

            minPrice,

            maxPrice,

            inStock,

            sort,

            page = 1,

            limit = 8,

        } = req.query;

        let query = {};

        // ==========================
        // Keyword
        // ==========================

        if (keyword) {

            query.name = {

                $regex: keyword,

                $options: "i",

            };

        }

        // ==========================
        // Category
        // ==========================

        if (category) {

            query.category = category;

        }

        // ==========================
        // Color
        // ==========================

        if (color) {

            query.colors = color;

        }

        // ==========================
        // Price
        // ==========================

        if (minPrice || maxPrice) {

            query.price = {};

            if (minPrice)
                query.price.$gte = Number(minPrice);

            if (maxPrice)
                query.price.$lte = Number(maxPrice);

        }

        // ==========================
        // Stock
        // ==========================

        if (inStock === "true") {

            query.stock = {

                $gt: 0,

            };

        }

        // ==========================
        // Sorting
        // ==========================

        let sortOption = {};

        switch (sort) {

            case "low":

                sortOption.price = 1;

                break;

            case "high":

                sortOption.price = -1;

                break;

            case "newest":

                sortOption.createdAt = -1;

                break;

            default:

                sortOption.createdAt = -1;

        }

        const total = await Product.countDocuments(query);

        const products = await Product.find(query)

            .populate("supplier", "name email")

            .sort(sortOption)

            .skip((page - 1) * limit)

            .limit(Number(limit));

        return res.status(200).json({

            success: true,

            total,

            page: Number(page),

            pages: Math.ceil(total / limit),

            products,

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==============================
// Get Categories
// ==============================

export const getCategories = async (req, res) => {

    try {

        const categories = await Product.distinct("category");

        return res.status(200).json({

            success: true,

            categories,

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};