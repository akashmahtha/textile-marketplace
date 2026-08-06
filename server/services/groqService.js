import client from "../config/groq.js";

export const askAI = async (prompt) => {

    try {

        const completion = await client.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [

                {
                    role: "system",
                    content:
                        "You are a professional AI Textile Marketplace Assistant. Help buyers choose fabrics, compare products, recommend products, answer product questions and use only marketplace data provided.",
                },

                {
                    role: "user",
                    content: prompt,
                },

            ],

            temperature: 0.7,

            max_tokens: 800,

        });

        return completion.choices[0].message.content;

    } catch (error) {

        console.error(error);

        throw new Error("Groq AI Error");

    }

};