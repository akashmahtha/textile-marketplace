import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Cart.css";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

import {
    getCart,
    updateCart,
    removeFromCart,
} from "../services/cartService";

const Cart = () => {

    const [cart, setCart] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchCart();

    }, []);

    // ==========================
    // Fetch Cart
    // ==========================

    const fetchCart = async () => {

        try {

            const res = await getCart();

            setCart(res.data.cart);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load cart"
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Update Quantity
    // ==========================

    const changeQuantity = async (
        id,
        quantity
    ) => {

        if (quantity < 1) return;

        try {

            await updateCart(id, {
                quantity,
            });

            fetchCart();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Update Failed"
            );

        }

    };

    // ==========================
    // Remove Item
    // ==========================

    const handleRemove = async (id) => {

        try {

            await removeFromCart(id);

            toast.success(
                "Removed From Cart"
            );

            fetchCart();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Remove Failed"
            );

        }

    };

    // ==========================
    // Grand Total
    // ==========================

    const grandTotal = useMemo(() => {

        return cart.reduce(

            (total, item) =>

                total +

                item.product.price *

                item.quantity,

            0

        );

    }, [cart]);

    if (loading) {

        return (

            <>

                {/* <Navbar /> */}

                <div className="container py-5 text-center">

                    <div className="spinner-border text-primary"></div>

                    <h5 className="mt-3">

                        Loading Cart...

                    </h5>

                </div>

                {/* <Footer /> */}

            </>

        );

    }

    return (

        <>

            {/* <Navbar /> */}

            <div className="container py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">

                        🛒 My Cart

                    </h2>

                    <span className="badge bg-dark">

                        {cart.length} Items

                    </span>

                </div>
                {cart.length === 0 ? (

                    <div className="card shadow border-0">

                        <div className="card-body text-center py-5">

                            <h3>Your Cart is Empty</h3>

                            <p className="text-muted">

                                Add products to your cart.

                            </p>

                            <Link
                                to="/products"
                                className="btn btn-primary"
                            >

                                Continue Shopping

                            </Link>

                        </div>

                    </div>

                ) : (

                    <div className="row">

                        <div className="col-lg-8">

                            {cart.map((item) => (

                                <div
                                    className="card shadow border-0 mb-4"
                                    key={item._id}
                                >

                                    <div className="card-body">

                                        <div className="row align-items-center">

                                            {/* Image */}

                                            <div className="col-md-3 text-center">

                                                <img
                                                    src={
                                                        item.product.images?.[0]?.url ||
                                                        "/placeholder.jpg"
                                                    }
                                                    alt={item.product.name}
                                                    className="img-fluid rounded"
                                                    style={{
                                                        height: "140px",
                                                        width: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />

                                            </div>

                                            {/* Product */}

                                            <div className="col-md-4">

                                                <h5>

                                                    {item.product.name}

                                                </h5>

                                                <p className="text-muted mb-1">

                                                    {item.product.category}

                                                </p>

                                                <h5 className="text-primary">

                                                    ₹ {item.product.price}

                                                </h5>

                                            </div>

                                            {/* Quantity */}

                                            <div className="col-md-3">

                                                <div className="d-flex justify-content-center align-items-center">

                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() =>
                                                            changeQuantity(
                                                                item._id,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                    >

                                                        -

                                                    </button>

                                                    <span
                                                        className="mx-3 fw-bold"
                                                    >

                                                        {item.quantity}

                                                    </span>

                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() =>
                                                            changeQuantity(
                                                                item._id,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                    >

                                                        +

                                                    </button>

                                                </div>

                                            </div>

                                            {/* Total + Remove */}

                                            <div className="col-md-2 text-center">

                                                <h5 className="text-success">

                                                    ₹ {item.product.price * item.quantity}

                                                </h5>

                                                <button
                                                    className="btn btn-sm btn-danger mt-2"
                                                    onClick={() =>
                                                        handleRemove(item._id)
                                                    }
                                                >

                                                    Remove

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>
                        {/* ==========================
                            Order Summary
                        ========================== */}

                        <div className="col-lg-4">

                            <div
                                className="card shadow border-0 sticky-top"
                                style={{ top: "90px" }}
                            >

                                <div className="card-body">

                                    <h4 className="mb-4">

                                        Order Summary

                                    </h4>

                                    <div className="d-flex justify-content-between mb-3">

                                        <span>

                                            Total Items

                                        </span>

                                        <strong>

                                            {cart.length}

                                        </strong>

                                    </div>

                                    <div className="d-flex justify-content-between mb-3">

                                        <span>

                                            Grand Total

                                        </span>

                                        <h4 className="text-success">

                                            ₹ {grandTotal}

                                        </h4>

                                    </div>

                                    <hr />

                                    <Link
                                        to="/products"
                                        className="btn btn-outline-primary w-100 mb-3"
                                    >

                                        Continue Shopping

                                    </Link>

                                    <Link
                                        to="/checkout"
                                        className="btn btn-success w-100"
                                    >

                                        Proceed To Checkout

                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

            {/* <Footer /> */}

        </>

    );

};

export default Cart;