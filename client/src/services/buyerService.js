import api from "./api";

// ===============================
// Dashboard
// ===============================

export const getBuyerDashboard = () =>
    api.get("/buyer/dashboard");

// ===============================
// Profile
// ===============================

export const getBuyerProfile = () =>
    api.get("/buyer/profile");

// ===============================
// Update Profile
// ===============================

export const updateBuyerProfile = (data) =>
    api.put("/buyer/profile", data);


export const buyerOnboarding = (data) =>
    api.post("/buyer/onboarding", data);