import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getSupplierDashboard } from "../services/supplierService";

import "./SupplierDashboard.css";

const SupplierDashboard = () => {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    // ===================================
    // Fetch Dashboard
    // ===================================

    const fetchDashboard = async () => {

        try {

            const res = await getSupplierDashboard();

            setDashboard(res.data.dashboard);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="container py-5 text-center">

                    <div className="spinner-border text-primary"></div>

                    <h5 className="mt-3">

                        Loading Dashboard...

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

                {/* ===========================
                    Heading
                =========================== */}

                <div className="mb-5">

                    <h2 className="dashboard-title">

                        Supplier Dashboard

                    </h2>

                    <p className="dashboard-subtitle">

                        Welcome back! Manage your products and orders.

                    </p>

                </div>

                {/* ===========================
                    Dashboard Cards
                =========================== */}

                <div className="row g-4">

                    <div className="col-lg-3 col-md-6">

                        <div className="dashboard-card bg-primary text-white">

                            <div className="card-body">

                                <h6>Total Products</h6>

                                <h2>

                                    {dashboard?.totalProducts || 0}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="dashboard-card bg-success text-white">

                            <div className="card-body">

                                <h6>Active Products</h6>

                                <h2>

                                    {dashboard?.activeProducts || 0}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="dashboard-card bg-danger text-white">

                            <div className="card-body">

                                <h6>Out Of Stock</h6>

                                <h2>

                                    {dashboard?.outOfStock || 0}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="dashboard-card bg-warning">

                            <div className="card-body">

                                <h6>Pending Orders</h6>

                                <h2>

                                    {dashboard?.pendingOrders || 0}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="dashboard-card bg-dark text-white">

                            <div className="card-body">

                                <h6>Total Revenue</h6>

                                <h2>

                                    ₹ {dashboard?.totalRevenue || 0}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="dashboard-card bg-info text-white">

                            <div className="card-body">

                                <h6>Completed Orders</h6>

                                <h2>

                                    {dashboard?.completedOrders || 0}

                                </h2>

                            </div>

                        </div>

                    </div>
                </div>

                {/* ===========================
                    Quick Actions
                =========================== */}

                <div className="card shadow border-0 mt-5">

                    <div className="card-body">

                        <h4 className="mb-4">

                            Quick Actions

                        </h4>

                        <div className="row">

                            <div className="col-lg-3 col-md-6 mb-3">

                                <Link
                                    to="/supplier/add-product"
                                    className="btn btn-primary quick-btn w-100"
                                >

                                    ➕ Add Product

                                </Link>

                            </div>

                            <div className="col-lg-3 col-md-6 mb-3">

                                <Link
                                    to="/supplier/my-products"
                                    className="btn btn-success quick-btn w-100"
                                >

                                    📦 My Products

                                </Link>

                            </div>

                            <div className="col-lg-3 col-md-6 mb-3">

                                <Link
                                    to="/supplier/orders"
                                    className="btn btn-warning quick-btn w-100"
                                >

                                    🛒 Orders

                                </Link>

                            </div>

                            <div className="col-lg-3 col-md-6 mb-3">

                                <Link
                                    to="/supplier/profile"
                                    className="btn btn-dark quick-btn w-100"
                                >

                                    👤 My Profile

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ===========================
                    Recent Orders
                =========================== */}

                <div className="card shadow border-0 mt-5">

                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h4 className="mb-0">

                                Recent Orders

                            </h4>

                            <Link
                                to="/supplier/orders"
                                className="btn btn-outline-primary"
                            >

                                View All

                            </Link>

                        </div>

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>#</th>

                                        <th>Buyer</th>

                                        <th>Total</th>

                                        <th>Status</th>

                                        <th>Date</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {dashboard?.recentOrders?.length > 0 ? (

                                        dashboard.recentOrders.map(
                                            (order, index) => (

                                                <tr key={order._id}>

                                                    <td>

                                                        {index + 1}

                                                    </td>

                                                    <td>

                                                        <strong>

                                                            {order.buyer?.name}

                                                        </strong>

                                                        <br />

                                                        <small className="text-muted">

                                                            {order.buyer?.email}

                                                        </small>

                                                    </td>

                                                    <td>

                                                        ₹ {order.totalAmount}

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`badge ${order.status === "Completed"
                                                                ? "bg-success"
                                                                : order.status === "Pending"
                                                                    ? "bg-warning text-dark"
                                                                    : "bg-primary"
                                                                }`}
                                                        >

                                                            {order.status}

                                                        </span>

                                                    </td>

                                                    <td>

                                                        {new Date(
                                                            order.createdAt
                                                        ).toLocaleDateString()}

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="text-center py-4"
                                            >

                                                No Recent Orders

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>
                {/* ===========================
                    Low Stock Products
                =========================== */}

                <div className="card shadow border-0 mt-5">

                    <div className="card-body">

                        <h4 className="mb-4">

                            ⚠ Low Stock Products

                        </h4>

                        {dashboard?.lowStockProducts?.length > 0 ? (

                            <div className="table-responsive">

                                <table className="table table-hover">

                                    <thead className="table-danger">

                                        <tr>

                                            <th>Product</th>

                                            <th>Stock</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {dashboard.lowStockProducts.map((item) => (

                                            <tr key={item._id}>

                                                <td>

                                                    {item.name}

                                                </td>

                                                <td>

                                                    <span className="badge bg-danger">

                                                        {item.stock}

                                                    </span>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        ) : (

                            <div className="text-center py-4">

                                <p className="text-success mb-0">

                                    🎉 No Low Stock Products

                                </p>

                            </div>

                        )}

                    </div>

                </div>

                {/* ===========================
                    Top Selling Products
                =========================== */}

                <div className="card shadow border-0 mt-5">

                    <div className="card-body">

                        <h4 className="mb-4">

                            🏆 Top Selling Products

                        </h4>

                        {dashboard?.topProducts?.length > 0 ? (

                            <div className="table-responsive">

                                <table className="table table-hover">

                                    <thead className="table-primary">

                                        <tr>

                                            <th>Product ID</th>

                                            <th>Sold Quantity</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {dashboard.topProducts.map((item) => (

                                            <tr key={item._id}>

                                                <td>

                                                    {item._id}

                                                </td>

                                                <td>

                                                    <span className="badge bg-success">

                                                        {item.sold}

                                                    </span>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        ) : (

                            <div className="text-center py-4">

                                <p className="text-muted mb-0">

                                    No Sales Yet

                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

};

export default SupplierDashboard;