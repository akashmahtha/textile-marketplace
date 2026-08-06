import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { chatWithAI } from "../services/aiService";

import {
    FaRobot,
    FaPaperPlane,
    FaComments,
    FaTimes,
    FaMicrophone,
} from "react-icons/fa";

import "./AIChat.css";

const AIChat = () => {

    const navigate = useNavigate();

    // =====================================
    // States
    // =====================================

    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [listening, setListening] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "👋 Hello! I'm your AI Textile Marketplace Assistant. Ask me about fabrics, compare products, get recommendations, or ask any product question.",
        },
    ]);

    // =====================================
    // Auto Scroll
    // =====================================

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth",

        });

    }, [messages]);
    // =====================================
    // Send Message
    // =====================================

    const handleSend = async () => {

        if (!message.trim()) return;

        const userMessage = {

            sender: "user",

            text: message,

        };

        setMessages((prev) => [

            ...prev,

            userMessage,

        ]);

        const currentMessage = message;

        setMessage("");

        setLoading(true);

        try {

            const res = await chatWithAI(currentMessage);

            setMessages((prev) => [

                ...prev,

                {

                    sender: "ai",

                    text: res.reply,

                    products: res.products || [],

                    comparison: res.comparison || null,

                    recommendations: res.recommendations || [],

                    intent: res.intent || "chat",

                    filters: res.filters || {},

                },

            ]);

        } catch (error) {

            setMessages((prev) => [

                ...prev,

                {

                    sender: "ai",

                    text:

                        error.response?.data?.message ||

                        "❌ Sorry, something went wrong.",

                },

            ]);

        } finally {

            setLoading(false);

        }

    };

    // =====================================
    // Enter Key
    // =====================================

    const handleKeyPress = (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            handleSend();

        }

    };
    // =====================================
    // Voice Assistant
    // =====================================

    const startVoiceRecognition = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            alert(
                "Speech Recognition is not supported in this browser."
            );

            return;

        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.interimResults = false;

        recognition.maxAlternatives = 1;

        setListening(true);

        recognition.start();

        recognition.onresult = (event) => {

            const transcript =
                event.results[0][0].transcript;

            setMessage(transcript);

            setListening(false);

        };

        recognition.onerror = () => {

            setListening(false);

        };

        recognition.onend = () => {

            setListening(false);

        };

    };

    // =====================================
    // JSX
    // =====================================

    return (

        <>

            {/* Floating Button */}

            {!open && (

                <button
                    className="ai-chat-button"
                    onClick={() => setOpen(true)}
                >

                    <FaComments />

                </button>

            )}

            {/* Chat Window */}

            {open && (

                <div className="ai-chat-container">

                    {/* Header */}

                    <div className="ai-chat-header">

                        <div className="d-flex align-items-center">

                            <FaRobot className="me-2" />

                            <strong>

                                AI Marketplace Assistant

                            </strong>

                        </div>

                        <button
                            className="close-btn"
                            onClick={() => setOpen(false)}
                        >

                            <FaTimes />

                        </button>

                    </div>

                    {/* Chat Body */}

                    <div className="ai-chat-body">
                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={`message ${msg.sender}`}
                            >

                                <p>{msg.text}</p>

                                {/* ===========================
                                    Product Comparison
                                =========================== */}

                                {msg.comparison && (

                                    <div className="table-responsive mt-3">

                                        <table className="table table-bordered">

                                            <thead>

                                                <tr>

                                                    <th>Feature</th>

                                                    <th>

                                                        {msg.comparison.first.name}

                                                    </th>

                                                    <th>

                                                        {msg.comparison.second.name}

                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                <tr>

                                                    <td>Price</td>

                                                    <td>

                                                        ₹{msg.comparison.first.price}

                                                    </td>

                                                    <td>

                                                        ₹{msg.comparison.second.price}

                                                    </td>

                                                </tr>

                                                <tr>

                                                    <td>Stock</td>

                                                    <td>

                                                        {msg.comparison.first.stock}

                                                    </td>

                                                    <td>

                                                        {msg.comparison.second.stock}

                                                    </td>

                                                </tr>

                                                <tr>

                                                    <td>GSM</td>

                                                    <td>

                                                        {msg.comparison.first.gsm}

                                                    </td>

                                                    <td>

                                                        {msg.comparison.second.gsm}

                                                    </td>

                                                </tr>

                                                <tr>

                                                    <td>Width</td>

                                                    <td>

                                                        {msg.comparison.first.width}

                                                    </td>

                                                    <td>

                                                        {msg.comparison.second.width}

                                                    </td>

                                                </tr>

                                                <tr>

                                                    <td>Composition</td>

                                                    <td>

                                                        {msg.comparison.first.composition}

                                                    </td>

                                                    <td>

                                                        {msg.comparison.second.composition}

                                                    </td>

                                                </tr>

                                                <tr>

                                                    <td>Weave</td>

                                                    <td>

                                                        {msg.comparison.first.weave}

                                                    </td>

                                                    <td>

                                                        {msg.comparison.second.weave}

                                                    </td>

                                                </tr>

                                            </tbody>

                                        </table>

                                    </div>

                                )}

                                {/* ===========================
                                    Recommended Products
                                =========================== */}

                                {msg.recommendations?.length > 0 && (

                                    <>

                                        <h6 className="mt-3">

                                            ⭐ Recommended Products

                                        </h6>

                                        <div className="ai-products">

                                            {msg.recommendations.map((product) => (

                                                <div
                                                    key={product._id}
                                                    className="ai-product-card"
                                                >

                                                    {product.images?.length > 0 && (

                                                        <img
                                                            src={
                                                                product.images?.[0]?.url ||
                                                                "https://via.placeholder.com/300x200?text=No+Image"
                                                            }
                                                        />

                                                    )}

                                                    <h6>

                                                        {product.name}

                                                    </h6>

                                                    <p>

                                                        ₹ {product.price}

                                                    </p>

                                                    <small>

                                                        {product.category}

                                                    </small>

                                                    <button
                                                        className="btn btn-primary btn-sm mt-2"
                                                        onClick={() =>
                                                            navigate(`/product/${product._id}`)
                                                        }
                                                    >

                                                        View Product

                                                    </button>

                                                </div>

                                            ))}

                                        </div>

                                    </>

                                )}
                                {/* ===========================
                                    Product Cards
                                =========================== */}

                                {msg.products?.length > 0 && (

                                    <div className="ai-products">

                                        {msg.products.map((product) => (

                                            <div
                                                key={product._id}
                                                className="ai-product-card"
                                            >

                                                {product.images?.length > 0 && (

                                                    <img
                                                        src={
                                                            product.images?.[0]?.url ||
                                                            "https://via.placeholder.com/300x200?text=No+Image"
                                                        }
                                                        alt={product.name}
                                                        className="ai-product-image"
                                                    />

                                                )}

                                                <h6>

                                                    {product.name}

                                                </h6>

                                                <p>

                                                    ₹ {product.price}

                                                </p>

                                                <small>

                                                    {product.category}

                                                </small>

                                                <button
                                                    className="btn btn-primary btn-sm mt-2"
                                                    onClick={() =>
                                                        navigate(`/product/${product._id}`)
                                                    }
                                                >

                                                    View Product

                                                </button>

                                            </div>

                                        ))}

                                    </div>

                                )}

                            </div>

                        ))}

                        {/* ===========================
                            Loading
                        =========================== */}

                        {loading && (

                            <div className="message ai">

                                <div className="ai-loading">

                                    <span></span>

                                    <span></span>

                                    <span></span>

                                </div>

                            </div>

                        )}

                        <div ref={bottomRef}></div>

                    </div>

                    {/* ===========================
                        Footer
                    =========================== */}

                    <div className="ai-chat-footer">

                        <input
                            type="text"
                            placeholder="Ask anything..."
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            onKeyDown={handleKeyPress}
                        />

                        <button
                            className="voice-btn"
                            onClick={startVoiceRecognition}
                            disabled={listening}
                            title="Voice Search"
                        >

                            <FaMicrophone />

                        </button>

                        <button
                            onClick={handleSend}
                            disabled={loading}
                        >

                            <FaPaperPlane />

                        </button>

                    </div>

                </div>

            )}

        </>

    );

};

export default AIChat;