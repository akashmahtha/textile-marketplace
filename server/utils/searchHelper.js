// ======================================
// Categories
// ======================================

const categories = [

    "cotton",
    "linen",
    "silk",
    "denim",
    "wool",
    "rayon",
    "polyester",
    "nylon",
    "viscose",

];

// ======================================
// Colors
// ======================================

const colors = [

    "black",
    "white",
    "blue",
    "red",
    "green",
    "yellow",
    "pink",
    "orange",
    "grey",
    "gray",
    "brown",

];

// ======================================
// Usage
// ======================================

const usages = [

    "shirt",
    "shirts",
    "jeans",
    "kurti",
    "saree",
    "dress",
    "sofa",
    "curtain",
    "uniform",

];

// ======================================
// Detect Category
// ======================================

export const detectCategory = (message) => {

    const text = message.toLowerCase();

    return categories.find(item =>
        text.includes(item)
    ) || null;

};

// ======================================
// Detect Color
// ======================================

export const detectColor = (message) => {

    const text = message.toLowerCase();

    return colors.find(item =>
        text.includes(item)
    ) || null;

};

// ======================================
// Detect Usage
// ======================================

export const detectUsage = (message) => {

    const text = message.toLowerCase();

    return usages.find(item =>
        text.includes(item)
    ) || null;

};

// ======================================
// Detect Stock
// ======================================

export const detectStock = (message) => {

    const text = message.toLowerCase();

    if (

        text.includes("stock") ||

        text.includes("available")

    ) {

        return true;

    }

    return false;

};

// ======================================
// Detect Price
// ======================================

export const detectPrice = (message) => {

    const match = message.match(/\d+/);

    return match
        ? Number(match[0])
        : null;

};

// ======================================
// Compare Products
// ======================================

export const detectComparison = (message) => {

    const text = message.toLowerCase();

    if (!text.includes("compare"))
        return [];

    const categories = [

        "cotton",
        "linen",
        "silk",
        "denim",
        "rayon",
        "polyester",
        "nylon",
        "viscose",
        "wool",

    ];

    return categories.filter(item =>
        text.includes(item)
    );

};