import api from "./api";

// =======================
// Products
// =======================

export const getProducts = () =>
    api.get("/products");

export const getProduct = (id) =>
    api.get(`/products/${id}`);

// =======================
// Search Products
// =======================

export const searchProducts = (params) =>
    api.get("/products/search", {
        params,
    });

// =======================
// Categories
// =======================

export const getCategories = () =>
    api.get("/products/categories");

// =======================
// Supplier Products
// =======================

export const getMyProducts = () =>
    api.get("/products/supplier/my-products");

// =======================
// Add Product
// =======================

export const addProduct = (formData) =>
    api.post("/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

// =======================
// Update Product
// =======================

export const updateProduct = (id, formData) =>
    api.put(`/products/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

// =======================
// Delete Product
// =======================

export const deleteProduct = (id) =>
    api.delete(`/products/${id}`);