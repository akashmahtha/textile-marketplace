import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    FaShoppingCart,
    FaSearch,
    FaHeart,
    FaSignOutAlt,
    FaChevronDown,
} from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    // ===========================
    // Authentication
    // ===========================

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    // ===========================
    // Cart & Wishlist Count
    // ===========================

    const cartCount =
        localStorage.getItem("cartCount") || 0;

    const wishlistCount =
        localStorage.getItem("wishlistCount") || 0;

    // ===========================
    // Search
    // ===========================

    const [keyword, setKeyword] = useState("");

    const handleSearch = (e) => {

        e.preventDefault();

        if (!keyword.trim()) return;

        navigate(
            `/products?keyword=${encodeURIComponent(
                keyword
            )}`
        );

        setKeyword("");

    };

    // ===========================
    // Logout
    // ===========================

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <nav className="custom-navbar sticky-top">

            <div className="container-fluid">

                {/* ===========================
                    Logo
                =========================== */}

                <Link
                    to="/"
                    className="logo"
                >

                    <span className="logo-yellow">

                        AKM

                    </span>

                    <span className="logo-white">

                        Textile Hub

                    </span>

                </Link>

                {/* ===========================
                    Mobile Toggle
                =========================== */}

                <button
                    className="navbar-toggler-icon"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="navbar-collapse"
                    id="navbar"
                >
                    {/* ===========================
    Left Menu
=========================== */}

                    <ul className="menu-list">

                        {/* Home */}

                        <li className="nav-item">

                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "menu-link custom-active" : "menu-link"
                                }
                            >
                                Home
                            </NavLink>

                        </li>

                        {/* Products */}

                        <li className="nav-item dropdown">

                            {token && role === "supplier" ? (

                                <>

                                    <a
                                        href="#"
                                        className="menu-link dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        role="button"
                                    >

                                        Products <FaChevronDown className="ms-1" size={10} />

                                    </a>

                                    <ul className="dropdown-menu">

                                        <li>

                                            <Link
                                                className="dropdown-item"
                                                to="/products"
                                            >

                                                Browse Products

                                            </Link>

                                        </li>

                                        <li>

                                            <Link
                                                className="dropdown-item"
                                                to="/supplier/my-products"
                                            >

                                                My Products

                                            </Link>

                                        </li>

                                        <li>

                                            <Link
                                                className="dropdown-item"
                                                to="/supplier/add-product"
                                            >

                                                Add Product

                                            </Link>

                                        </li>

                                    </ul>

                                </>

                            ) : (

                                <NavLink
                                    to="/products"
                                    className={({ isActive }) =>
                                        isActive ? "menu-link custom-active" : "menu-link"
                                    }
                                >
                                    Products
                                </NavLink>

                            )}

                        </li>

                        {/* Categories */}

                        <li className="nav-item">

                            <NavLink
                                to="/categories"
                                className={({ isActive }) =>
                                    isActive ? "menu-link custom-active" : "menu-link"
                                }
                            >
                                Categories
                            </NavLink>

                        </li>

                        {/* Suppliers */}

                        <li className="nav-item">

                            <NavLink
                                to="/suppliers"
                                className={({ isActive }) =>
                                    isActive ? "menu-link custom-active" : "menu-link"
                                }
                            >
                                Suppliers
                            </NavLink>

                        </li>

                        {/* About */}

                        <li className="nav-item">

                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? "menu-link custom-active" : "menu-link"
                                }
                            >
                                About
                            </NavLink>

                        </li>

                        {/* Dashboard (Login Only) */}

                        {token && (

                            <li className="nav-item">

                                <NavLink
                                    to={
                                        role === "buyer"
                                            ? "/buyer/dashboard"
                                            : "/supplier/dashboard"
                                    }
                                    className={({ isActive }) =>
                                        isActive ? "menu-link custom-active" : "menu-link"
                                    }
                                >
                                    Dashboard
                                </NavLink>

                            </li>

                        )}

                    </ul>

                    {/* ===========================
    Right Section
=========================== */}

                    <div className="right-section">
                        {/* ===========================
    Search (Guest + Buyer Only)
=========================== */}

                        {(!token || role === "buyer") && (

                            <form
                                className="search-box"
                                onSubmit={handleSearch}
                            >

                                <input
                                    type="search"
                                    placeholder="Search Fabrics..."
                                    value={keyword}
                                    onChange={(e) =>
                                        setKeyword(e.target.value)
                                    }
                                />

                                <button type="submit">

                                    <FaSearch />

                                </button>

                            </form>

                        )}

                        {/* ===========================
    Wishlist (Buyer Only)
=========================== */}

                        {token && role === "buyer" && (

                            <Link
                                to="/wishlist"
                                className="cart-btn position-relative"
                            >

                                <FaHeart />

                                <span className="cart-count">

                                    {wishlistCount}

                                </span>

                            </Link>

                        )}

                        {/* ===========================
    Cart (Buyer Only)
=========================== */}

                        {token && role === "buyer" && (

                            <Link
                                to="/cart"
                                className="cart-btn position-relative"
                            >

                                <FaShoppingCart />

                                <span className="cart-count">

                                    {cartCount}

                                </span>

                            </Link>

                        )}

                        {/* ===========================
    Login (Guest Only)
=========================== */}

                        {!token && (

                            <Link
                                to="/login"
                                className="btn btn-warning ms-2"
                            >

                                Login

                            </Link>

                        )}

                        {/* ===========================
    Logout (Buyer + Supplier)
=========================== */}

                        {token && (

                            <button
                                className="logout-btn"
                                onClick={logout}
                            >

                                <FaSignOutAlt />

                            </button>

                        )}

                    </div>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;