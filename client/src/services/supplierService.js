import api from "./api";

// ========================================
// Supplier Onboarding
// ========================================

export const supplierOnboarding = (data) =>
    api.put("/onboarding/supplier", data);

// ========================================
// Supplier Dashboard
// ========================================

export const getSupplierDashboard = () =>
    api.get("/supplier/dashboard");

// ========================================
// Supplier Profile
// ========================================

export const getSupplierProfile = () =>
    api.get("/supplier/profile");

// ========================================
// Update Supplier Profile
// ========================================

export const updateSupplierProfile = (data) =>
    api.put("/supplier/profile", data);

// ========================================
// Public Suppliers
// ========================================

export const getSuppliers = () =>
    api.get("/supplier");

// ========================================
// Supplier Details
// ========================================

export const getSupplier = (id) =>
    api.get(`/supplier/${id}`);

// ========================================
// Supplier Products
// ========================================

export const getSupplierProducts = (id) =>
    api.get(`/supplier/${id}/products`);