import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

import { getCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";

import "./Checkout.css";

const Checkout = () => {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        fullName: "",

        phone: "",

        address: "",

        city: "",

        state: "",

        pincode: "",

    });

    useEffect(() => {

        loadCart();

    }, []);

    const loadCart = async () => {

        try {

            const res = await getCart();

            setCart(res.data.cart);

        } catch (error) {

            toast.error("Failed to load cart");

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const subtotal = cart.reduce(

        (total, item) =>

            total + (item.product.price * item.quantity),

        0

    );

    const shipping = subtotal > 5000 ? 0 : 150;

    const total = subtotal + shipping;

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await placeOrder(formData);

            toast.success(res.data.message);

            navigate("/order-success");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Order Failed"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <>

            {/* <Navbar /> */}

            <div className="container py-5">

                <div className="row">

                    {/* Shipping Information */}

                    <div className="col-lg-7">

                        <div className="card shadow border-0">

                            <div className="card-header bg-primary text-white">

                                <h3 className="mb-0">

                                    Shipping Information

                                </h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Full Name

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Phone

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Address

                                        </label>

                                        <textarea
                                            rows="3"
                                            className="form-control"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="row">

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">

                                                City

                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">

                                                State

                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">

                                                Pincode

                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 py-3 mt-3"
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Placing Order..."
                                            : "Continue to Review"}

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                    {/* ===========================
                        Order Summary
                    =========================== */}

                    <div className="col-lg-5">

                        <div className="card shadow border-0 checkout-summary">

                            <div className="card-header bg-dark text-white">

                                <h3 className="mb-0">

                                    Order Summary

                                </h3>

                            </div>

                            <div className="card-body">

                                {cart.length === 0 ? (

                                    <div className="text-center py-5">

                                        <h5>

                                            Cart is Empty

                                        </h5>

                                    </div>

                                ) : (

                                    <>

                                        {cart.map((item) => (

                                            <div
                                                key={item._id}
                                                className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom"
                                            >

                                                <div>

                                                    <h6 className="mb-1">

                                                        {item.product.name}

                                                    </h6>

                                                    <small className="text-muted">

                                                        Qty :
                                                        {" "}
                                                        {item.quantity}

                                                    </small>

                                                </div>

                                                <strong>

                                                    ₹
                                                    {(
                                                        item.product.price *
                                                        item.quantity
                                                    ).toLocaleString()}

                                                </strong>

                                            </div>

                                        ))}

                                        <div className="d-flex justify-content-between mt-4">

                                            <span>

                                                Subtotal

                                            </span>

                                            <strong>

                                                ₹
                                                {subtotal.toLocaleString()}

                                            </strong>

                                        </div>

                                        <div className="d-flex justify-content-between mt-3">

                                            <span>

                                                Shipping

                                            </span>

                                            <strong>

                                                {shipping === 0
                                                    ? "FREE"
                                                    : `₹${shipping}`}

                                            </strong>

                                        </div>

                                        <hr />

                                        <div className="d-flex justify-content-between">

                                            <h5>

                                                Grand Total

                                            </h5>

                                            <h4 className="text-success">

                                                ₹
                                                {total.toLocaleString()}

                                            </h4>

                                        </div>

                                        <div className="alert alert-success mt-4">

                                            <strong>

                                                Order Review

                                            </strong>

                                            <p className="mb-0 mt-2">

                                                Please verify your shipping
                                                address before placing your
                                                order.

                                            </p>

                                        </div>

                                    </>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* <Footer /> */}

        </>

    );

};

export default Checkout;