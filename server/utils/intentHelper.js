// ==========================================
// Detect AI Intent
// ==========================================

export const detectIntent = (message = "") => {

    const text = message.toLowerCase();

    // Product Comparison
    if (
        text.includes("compare") ||
        text.includes("difference") ||
        text.includes("vs") ||
        text.includes("better")
    ) {

        return "comparison";

    }

    // Similar Products
    if (
        text.includes("similar") ||
        text.includes("like this") ||
        text.includes("same type") ||
        text.includes("related")
    ) {

        return "similar";

    }

    // Recommendation
    if (
        text.includes("recommend") ||
        text.includes("suggest") ||
        text.includes("best fabric") ||
        text.includes("which fabric")
    ) {

        return "recommendation";

    }

    // Product Search
    if (
        text.includes("show") ||
        text.includes("find") ||
        text.includes("search") ||
        text.includes("need") ||
        text.includes("looking")
    ) {

        return "search";

    }

    // Product Question
    if (
        text.includes("what") ||
        text.includes("how") ||
        text.includes("can") ||
        text.includes("is") ||
        text.includes("does")
    ) {

        return "question";

    }

    // General Chat
    return "chat";

};