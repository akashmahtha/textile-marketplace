import api from "./api";

// ======================================
// Get Wishlist
// ======================================

export const getWishlist = () =>
    api.get("/wishlist");

// ======================================
// Add To Wishlist
// ======================================

export const addToWishlist = (productId) =>
    api.post(`/wishlist/${productId}`);

// ======================================
// Remove From Wishlist
// ======================================

export const removeFromWishlist = (productId) =>
    api.delete(`/wishlist/${productId}`);

// ======================================
// Move Wishlist Item To Cart
// ======================================

export const moveToCart = (productId) =>
    api.post(`/wishlist/move-to-cart/${productId}`);