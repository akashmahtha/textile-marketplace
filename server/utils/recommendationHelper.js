// ==========================================
// Smart Recommendation Engine
// ==========================================

export const recommendProducts = (products = [], message = "") => {

    if (!products.length) return [];

    const text = message.toLowerCase();

    let scoredProducts = products.map(product => {

        let score = 0;

        // In Stock
        if (product.stock > 0) {

            score += 20;

        }

        // Cheaper Products
        if (product.price <= 500) {

            score += 15;

        }

        // Summer
        if (
            text.includes("summer") &&
            ["cotton", "linen", "rayon"].includes(
                product.category?.toLowerCase()
            )
        ) {

            score += 40;

        }

        // Winter
        if (
            text.includes("winter") &&
            ["wool"].includes(
                product.category?.toLowerCase()
            )
        ) {

            score += 40;

        }

        // Wedding
        if (
            text.includes("wedding") &&
            ["silk"].includes(
                product.category?.toLowerCase()
            )
        ) {

            score += 35;

        }

        // Shirts
        if (
            text.includes("shirt") &&
            product.description?.toLowerCase().includes("shirt")
        ) {

            score += 20;

        }

        // Premium
        if (
            text.includes("premium") &&
            product.price > 1000
        ) {

            score += 15;

        }

        return {

            ...product.toObject(),

            score,

        };

    });

    scoredProducts.sort(

        (a, b) => b.score - a.score

    );

    return scoredProducts.slice(0, 5);

};