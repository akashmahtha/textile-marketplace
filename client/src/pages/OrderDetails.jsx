import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

import { getMyOrders } from "../services/orderService";

const OrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadOrder();

    }, []);

    const loadOrder = async () => {

        try {

            const res = await getMyOrders();

            const selected = res.data.orders.find(
                (item) => item._id === id
            );

            setOrder(selected);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <>
                {/* <Navbar /> */}

                <div className="container py-5 text-center">

                    <div className="spinner-border text-warning"></div>

                </div>

                {/* <Footer /> */}

            </>

        );

    }

    if (!order) {

        return (

            <>
                {/* <Navbar /> */}

                <div className="container py-5 text-center">

                    <h2>Order Not Found</h2>

                    <Link
                        to="/buyer/orders"
                        className="btn btn-primary mt-3"
                    >
                        Back
                    </Link>

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

                        Order Details

                    </h2>

                    <Link
                        to="/buyer/orders"
                        className="btn btn-secondary"
                    >
                        Back
                    </Link>

                </div>

                <div className="card shadow border-0 mb-4">

                    <div className="card-body">

                        <h5>Supplier</h5>

                        <p>

                            {order.supplier?.name}

                        </p>

                        <h5>Status</h5>

                        <span className="badge bg-success">

                            {order.status}

                        </span>

                        <hr />

                        <h5>Total Amount</h5>

                        <h3 className="text-primary">

                            ₹{order.totalAmount}

                        </h3>

                    </div>

                </div>

                <div className="card shadow border-0">

                    <div className="card-body">

                        <h4 className="mb-4">

                            Ordered Items

                        </h4>

                        <table className="table">

                            <thead>

                                <tr>

                                    <th>Product</th>

                                    <th>Price</th>

                                    <th>Qty</th>

                                    <th>Total</th>

                                </tr>

                            </thead>

                            <tbody>

                                {order.items.map((item) => (

                                    <tr key={item._id}>

                                        <td>

                                            {item.product?.name}

                                        </td>

                                        <td>

                                            ₹{item.price}

                                        </td>

                                        <td>

                                            {item.quantity}

                                        </td>

                                        <td>

                                            ₹{
                                                item.price *
                                                item.quantity
                                            }

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* <Footer /> */}

        </>

    );

};

export default OrderDetails;