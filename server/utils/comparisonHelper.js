// ==========================================
// Product Comparison Helper
// ==========================================

export const compareProducts = (products = []) => {

    if (!products || products.length < 2) {

        return null;

    }

    const first = products[0];
    const second = products[1];

    return {

        first: {

            id: first._id,

            name: first.name,

            category: first.category,

            price: first.price,

            stock: first.stock,

            description: first.description,

            gsm: first.specifications?.gsm || "N/A",

            width: first.specifications?.width || "N/A",

            composition: first.specifications?.composition || "N/A",

            weave: first.specifications?.weave || "N/A",

        },

        second: {

            id: second._id,

            name: second.name,

            category: second.category,

            price: second.price,

            stock: second.stock,

            description: second.description,

            gsm: second.specifications?.gsm || "N/A",

            width: second.specifications?.width || "N/A",

            composition: second.specifications?.composition || "N/A",

            weave: second.specifications?.weave || "N/A",

        },

        betterPrice:

            first.price <= second.price

                ? first.name

                : second.name,

        betterStock:

            first.stock >= second.stock

                ? first.name

                : second.name,

    };

};