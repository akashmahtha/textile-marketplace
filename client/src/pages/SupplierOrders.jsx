import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getSupplierOrders,
    updateOrderStatus,
} from "../services/orderService";

import "./SupplierOrders.css";

const SupplierOrders = () => {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchOrders();

    }, []);

    // =====================================
    // Fetch Orders
    // =====================================

    const fetchOrders = async () => {

        try {

            const res = await getSupplierOrders();

            setOrders(res.data.orders);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load orders"
            );

        } finally {

            setLoading(false);

        }

    };

    // =====================================
    // Update Status
    // =====================================

    const handleStatus = async (
        id,
        status
    ) => {

        try {

            await updateOrderStatus(
                id,
                status
            );

            toast.success(
                "Order Status Updated Successfully"
            );

            fetchOrders();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Update Failed"
            );

        }

    };

    // =====================================
    // Statistics
    // =====================================

    const totalOrders = orders.length;

    const pendingOrders =
        orders.filter(
            (o) => o.status === "Pending"
        ).length;

    const acceptedOrders =
        orders.filter(
            (o) => o.status === "Accepted"
        ).length;

    const preparingOrders =
        orders.filter(
            (o) => o.status === "Preparing"
        ).length;

    const completedOrders =
        orders.filter(
            (o) => o.status === "Completed"
        ).length;

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="container py-5 text-center">

                    <div className="spinner-border text-primary"></div>

                    <h5 className="mt-3">

                        Loading Orders...

                    </h5>

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

                            Supplier Orders

                        </h2>

                        <p className="text-muted">

                            Manage all customer orders

                        </p>

                    </div>

                </div>
                {/* =====================================
    Dashboard Cards
===================================== */}

                <div className="row g-4 mb-5">

                    <div className="col-lg-3 col-md-6">

                        <div className="card shadow border-0 dashboard-card bg-primary text-white">

                            <div className="card-body">

                                <h6>Total Orders</h6>

                                <h2>{totalOrders}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="card shadow border-0 dashboard-card bg-warning">

                            <div className="card-body">

                                <h6>Pending</h6>

                                <h2>{pendingOrders}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="card shadow border-0 dashboard-card bg-info text-white">

                            <div className="card-body">

                                <h6>Accepted</h6>

                                <h2>{acceptedOrders}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="card shadow border-0 dashboard-card bg-success text-white">

                            <div className="card-body">

                                <h6>Completed</h6>

                                <h2>{completedOrders}</h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =====================================
    Orders Table
===================================== */}

                <div className="card shadow border-0">

                    <div className="card-body">

                        {orders.length === 0 ? (

                            <div className="text-center py-5">

                                <h4>No Orders Found</h4>

                                <p className="text-muted">

                                    No customer has placed an order yet.

                                </p>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>#</th>

                                            <th>Buyer</th>

                                            <th>Products</th>

                                            <th>Shipping</th>

                                            <th>Total</th>

                                            <th>Status</th>

                                            <th>Date</th>

                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>
                                        {orders.map((order, index) => (

                                            <tr key={order._id}>

                                                <td>

                                                    {index + 1}

                                                </td>

                                                {/* =========================
            Buyer Details
        ========================== */}

                                                <td>

                                                    <strong>

                                                        {order.buyer?.name}

                                                    </strong>

                                                    <br />

                                                    <small className="text-muted">

                                                        {order.buyer?.email}

                                                    </small>

                                                    <br />

                                                    <small className="text-muted">

                                                        📞 {order.buyer?.phone}

                                                    </small>

                                                </td>

                                                {/* =========================
            Products
        ========================== */}

                                                <td>

                                                    {order.items.map((item) => (

                                                        <div
                                                            key={item._id}
                                                            className="d-flex align-items-center mb-2"
                                                        >

                                                            <img
                                                                src={`http://localhost:5000${item.product?.images?.[0]}`}
                                                                alt={item.product?.name}
                                                                width="45"
                                                                height="45"
                                                                className="rounded me-2"
                                                                style={{
                                                                    objectFit: "cover",
                                                                }}
                                                            />

                                                            <div>

                                                                <strong>

                                                                    {item.product?.name}

                                                                </strong>

                                                                <br />

                                                                <small>

                                                                    Qty : {item.quantity}

                                                                </small>

                                                            </div>

                                                        </div>

                                                    ))}

                                                </td>

                                                {/* =========================
            Shipping Address
        ========================== */}

                                                <td>

                                                    {order.shippingAddress?.address}

                                                    <br />

                                                    <small>

                                                        {order.shippingAddress?.city},{" "}

                                                        {order.shippingAddress?.state}

                                                    </small>

                                                </td>

                                                {/* =========================
            Amount
        ========================== */}

                                                <td>

                                                    <strong className="text-success">

                                                        ₹ {order.totalAmount}

                                                    </strong>

                                                </td>

                                                {/* =========================
            Status Badge
        ========================== */}

                                                <td>

                                                    <span
                                                        className={`badge fs-6 px-3 py-2 ${order.status === "Completed"
                                                            ? "bg-success"
                                                            : order.status === "Pending"
                                                                ? "bg-warning text-dark"
                                                                : order.status === "Accepted"
                                                                    ? "bg-info"
                                                                    : order.status === "Preparing"
                                                                        ? "bg-primary"
                                                                        : "bg-secondary"
                                                            }`}
                                                    >

                                                        {order.status}

                                                    </span>

                                                </td>

                                                {/* =========================
            Date
        ========================== */}

                                                <td>

                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString()}

                                                </td>

                                                {/* =========================
            Update Status
        ========================== */}

                                                <td>

                                                    <select
                                                        className="form-select"
                                                        value={order.status}
                                                        disabled={
                                                            order.status === "Completed"
                                                        }
                                                        onChange={(e) =>
                                                            handleStatus(
                                                                order._id,
                                                                e.target.value
                                                            )
                                                        }
                                                    >

                                                        <option value="Pending">
                                                            Pending
                                                        </option>

                                                        <option value="Accepted">
                                                            Accepted
                                                        </option>

                                                        <option value="Preparing">
                                                            Preparing
                                                        </option>

                                                        <option value="Ready for Dispatch">
                                                            Ready for Dispatch
                                                        </option>

                                                        <option value="Completed">
                                                            Completed
                                                        </option>

                                                    </select>

                                                </td>

                                            </tr>

                                        ))}
                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

};

export default SupplierOrders;