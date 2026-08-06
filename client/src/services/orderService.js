import api from "./api";

// ======================================
// Place Order
// ======================================

export const placeOrder = (data) =>
    api.post("/orders/checkout", data);

// ======================================
// Buyer Orders
// ======================================

export const getMyOrders = () =>
    api.get("/orders/my-orders");

// ======================================
// Order Details
// ======================================

export const getOrderDetails = (id) =>
    api.get(`/orders/${id}`);

// ======================================
// Supplier Orders
// ======================================

export const getSupplierOrders = () =>
    api.get("/orders/supplier");

// ======================================
// Update Order Status
// ======================================

export const updateOrderStatus = (id, status) =>
    api.put(`/orders/${id}/status`, {
        status,
    });