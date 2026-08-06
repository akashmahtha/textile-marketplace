import { Link } from "react-router-dom";
import {
    FaCheckCircle,
    FaShoppingBag,
    FaClipboardList,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./OrderSuccess.css";

const OrderSuccess = () => {

    const orderId =
        "AKM-" +
        Math.floor(
            100000 + Math.random() * 900000
        );

    return (

        <>

            <Navbar />

            <div className="order-success-page">

                <div className="container py-5">

                    <div className="row justify-content-center">

                        <div className="col-lg-7">

                            <div className="card shadow border-0 success-card">

                                <div className="card-body text-center">

                                    <FaCheckCircle className="success-icon" />

                                    <h2 className="fw-bold mt-4">

                                        Order Placed Successfully!

                                    </h2>

                                    <p className="text-muted mt-3">

                                        Thank you for shopping with

                                        <strong>

                                            {" "}
                                            AKM Textile Hub

                                        </strong>

                                    </p>

                                    <div className="order-id-box">

                                        <h5>

                                            Order ID

                                        </h5>

                                        <h4>

                                            {orderId}

                                        </h4>

                                    </div>

                                    <div className="alert alert-info mt-4">

                                        Your supplier will review your
                                        order shortly.

                                    </div>

                                    <div className="d-grid gap-3 mt-4">

                                        <Link
                                            to="/buyer/orders"
                                            className="btn btn-primary"
                                        >

                                            <FaClipboardList />

                                            {" "}My Orders

                                        </Link>

                                        <Link
                                            to="/products"
                                            className="btn btn-success"
                                        >

                                            <FaShoppingBag />

                                            {" "}Continue Shopping

                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

};

export default OrderSuccess;