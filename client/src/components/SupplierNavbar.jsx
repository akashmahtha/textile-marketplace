import { Link, NavLink, useNavigate } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";

import "./SupplierNavbar.css";

const SupplierNavbar = () => {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg supplier-navbar sticky-top">

            <div className="container-fluid">

                {/* Logo */}

                <Link
                    to="/supplier/dashboard"
                    className="navbar-brand supplier-logo"
                >

                    <span className="logo-yellow">

                        AKM

                    </span>

                    <span className="logo-white">

                        Textile Hub

                    </span>

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#supplierNavbar"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="supplierNavbar"
                >
                    {/* ===========================
    Menu
=========================== */}

                    <ul className="navbar-nav supplier-menu">

                        <li className="nav-item">

                            <NavLink
                                to="/supplier/dashboard"
                                className="nav-link"
                            >

                                Dashboard

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink
                                to="/supplier/my-products"
                                className="nav-link"
                            >

                                My Products

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink
                                to="/supplier/add-product"
                                className="nav-link"
                            >

                                Add Product

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink
                                to="/supplier/orders"
                                className="nav-link"
                            >

                                Orders

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink
                                to="/supplier/profile"
                                className="nav-link"
                            >

                                Profile

                            </NavLink>

                        </li>

                    </ul>

                    {/* ===========================
    Right Section
=========================== */}

                    <div className="supplier-right">
                        {/* ===========================
        Logout
    =========================== */}

                        <button
                            className="supplier-logout"
                            onClick={logout}
                        >

                            <FaSignOutAlt />

                            <span className="ms-2">

                                Logout

                            </span>

                        </button>

                    </div>

                </div>

            </div>

        </nav>

    );

};

export default SupplierNavbar;