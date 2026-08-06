import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getMyOrders } from "../services/orderService";

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const res = await getMyOrders();

            setOrders(res.data.orders);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const getBadge = (status) => {

        switch (status) {

            case "Completed":
                return "success";

            case "Pending":
                return "warning";

            case "Accepted":
                return "info";

            case "Preparing":
                return "primary";

            case "Ready for Dispatch":
                return "secondary";

            default:
                return "dark";

        }

    };

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="container py-5 text-center">

                    <div
                        className="spinner-border text-warning"
                        role="status"
                    ></div>

                    <p className="mt-3">
                        Loading Orders...
                    </p>

                </div>

                <Footer />
            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="container py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">
                            My Orders
                        </h2>

                        <p className="text-muted mb-0">
                            View all your previous and current orders.
                        </p>

                    </div>

                </div>

                <div className="card shadow border-0">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>#</th>

                                        <th>Supplier</th>

                                        <th>Items</th>

                                        <th>Total</th>

                                        <th>Status</th>

                                        <th>Date</th>

                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {orders.length > 0 ? (

                                        orders.map((order, index) => (

                                            <tr key={order._id}>

                                                <td>

                                                    {index + 1}

                                                </td>

                                                <td>

                                                    {order.supplier?.name}

                                                </td>

                                                <td>

                                                    {order.items.length}

                                                </td>

                                                <td>

                                                    ₹{order.totalAmount}

                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge bg-${getBadge(
                                                            order.status
                                                        )}`}
                                                    >

                                                        {order.status}

                                                    </span>

                                                </td>

                                                <td>

                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString()}

                                                </td>

                                                <td>

                                                    <Link
                                                        to={`/buyer/orders/${order._id}`}
                                                        className="btn btn-sm btn-primary"
                                                    >

                                                        View Details

                                                    </Link>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center py-5"
                                            >

                                                <h5 className="mb-3">

                                                    No Orders Found

                                                </h5>

                                                <Link
                                                    to="/products"
                                                    className="btn btn-warning"
                                                >

                                                    Start Shopping

                                                </Link>

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

};

export default MyOrders;