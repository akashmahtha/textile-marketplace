// ==========================================
// AI Response Formatter
// ==========================================

export const formatAIResponse = ({
    intent = "chat",
    reply = "",
    products = [],
    comparison = null,
    recommendations = [],
    filters = {},
}) => {

    return {

        success: true,

        intent,

        timestamp: new Date(),

        filters,

        totalProducts: products.length,

        products,

        comparison,

        recommendations,

        reply,

    };

};

// ==========================================
// Error Formatter
// ==========================================

export const formatErrorResponse = (message) => {

    return {

        success: false,

        reply: "",

        message,

        products: [],

        comparison: null,

        recommendations: [],

    };

};