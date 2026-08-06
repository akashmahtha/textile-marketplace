import Product from "../models/Product.js";
import { askAI } from "../services/groqService.js";

import {
    detectCategory,
    detectColor,
    detectUsage,
    detectStock,
    detectPrice,
    detectComparison,
} from "../utils/searchHelper.js";

import { detectIntent } from "../utils/intentHelper.js";
import { recommendProducts } from "../utils/recommendationHelper.js";
import { compareProducts } from "../utils/comparisonHelper.js";

import {
    formatAIResponse,
    formatErrorResponse,
} from "../utils/responseFormatter.js";

export const aiChat = async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {

            return res.status(400).json(

                formatErrorResponse("Message is required")

            );

        }

        // =====================================
        // Detect Intent
        // =====================================

        const intent = detectIntent(message);

        // =====================================
        // Detect Filters
        // =====================================

        const category = detectCategory(message);

        const color = detectColor(message);

        const usage = detectUsage(message);

        const stock = detectStock(message);

        const maxPrice = detectPrice(message);

        const compareItems = detectComparison(message);

        // =====================================
        // Mongo Query
        // =====================================

        let query = {};

        if (category) {

            query.category = new RegExp(category, "i");

        }

        if (color) {

            query.color = new RegExp(color, "i");

        }

        if (usage) {

            query.description = new RegExp(usage, "i");

        }

        if (stock) {

            query.stock = {

                $gt: 0,

            };

        }

        if (maxPrice) {

            query.price = {

                $lte: maxPrice,

            };

        }

        let products = await Product.find(query)
            .limit(10);

        let recommendations = [];

        let comparison = null;
        // =====================================
        // Recommendation Engine
        // =====================================

        if (intent === "recommendation") {

            recommendations = recommendProducts(

                products,

                message

            );

        }

        // =====================================
        // Similar Products
        // =====================================

        if (

            intent === "similar" &&

            products.length > 0

        ) {

            products = await Product.find({

                category: products[0].category,

                _id: {

                    $ne: products[0]._id,

                },

                stock: {

                    $gt: 0,

                },

            })
                .limit(6)
                .sort({

                    stock: -1,

                    price: 1,

                });

        }

        // =====================================
        // Product Comparison
        // =====================================

        if (

            intent === "comparison" &&

            compareItems.length >= 2

        ) {

            const comparisonProducts = await Product.find({

                category: {

                    $in: compareItems.map(item =>

                        new RegExp(item, "i")

                    ),

                },

            }).limit(2);

            comparison = compareProducts(

                comparisonProducts

            );

            products = comparisonProducts;

        }

        // =====================================
        // Product Context
        // =====================================

        let productInfo = "";

        if (products.length > 0) {

            products.forEach((product, index) => {

                productInfo += `

Product ${index + 1}

Name: ${product.name}

Category: ${product.category}

Price: ₹${product.price}

Stock: ${product.stock}

Color: ${product.color || "N/A"}

Description: ${product.description}

GSM: ${product.specifications?.gsm || "N/A"}

Width: ${product.specifications?.width || "N/A"}

Composition: ${product.specifications?.composition || "N/A"}

Weave: ${product.specifications?.weave || "N/A"}

`;

            });

        } else {

            productInfo = "No matching products found.";

        }

        // =====================================
        // Recommendation Context
        // =====================================

        let recommendationInfo = "";

        if (recommendations.length > 0) {

            recommendations.forEach((product) => {

                recommendationInfo += `

Recommended Product

Name: ${product.name}

Category: ${product.category}

Price: ₹${product.price}

AI Score: ${product.score}

`;

            });

        }
        // =====================================
        // AI Prompt
        // =====================================

        const prompt = `
You are an AI Textile Marketplace Assistant.

User Intent:
${intent}

Your responsibilities:

- Conversational Chat
- Natural Language Product Search
- Fabric Recommendations
- Product Comparison
- Similar Product Suggestions
- Product Q&A

IMPORTANT RULES:

1. Use ONLY the marketplace product information provided below.
2. Never invent a product, price, stock, specification, or feature.
3. If matching products are available, use them in your answer.
4. If no matching product exists, clearly tell the buyer.
5. For recommendations, explain briefly why the product is suitable.
6. For comparisons, compare available product specifications accurately.
7. Keep the response clear, concise, and buyer-friendly.
8. Do not claim a feature that is not present in the product information.

=====================================
MARKETPLACE PRODUCTS
=====================================

${productInfo}

=====================================
RECOMMENDED PRODUCTS
=====================================

${recommendationInfo || "No ranked recommendations."}

=====================================
CUSTOMER QUESTION
=====================================

${message}
`;

        // =====================================
        // Ask Groq AI
        // =====================================

        const reply = await askAI(prompt);

        // =====================================
        // Prepare Filters
        // =====================================

        const filters = {

            category: category || null,

            color: color || null,

            usage: usage || null,

            inStock: stock || false,

            maxPrice: maxPrice || null,

        };

        // =====================================
        // Final Structured Response
        // =====================================

        return res.status(200).json(

            formatAIResponse({

                intent,

                reply,

                products,

                comparison,

                recommendations,

                filters,

            })

        );

    } catch (error) {

        // =====================================
        // Error Handling
        // =====================================

        console.error(
            "AI Controller Error:",
            error
        );

        return res.status(500).json(

            formatErrorResponse(

                error?.message ||
                "AI Service Error"

            )

        );

    }

};