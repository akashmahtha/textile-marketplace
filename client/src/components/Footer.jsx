import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-dark text-light pt-5 pb-3 mt-5">

            <div className="container">

                <div className="row">

                    {/* Company */}

                    <div className="col-lg-4 mb-4">

                        <h2 className="fw-bold">

                            <span className="text-warning">
                                Textile
                            </span>

                            Mart

                        </h2>

                        <p className="mt-3 text-secondary">

                            TextileMart is India's leading B2B Textile
                            Marketplace connecting buyers with verified
                            suppliers and manufacturers.

                        </p>

                        <div className="d-flex gap-3 mt-4">

                            <a href="#">
                                <FaFacebookF
                                    className="text-white"
                                    size={20}
                                />
                            </a>

                            <a href="#">
                                <FaInstagram
                                    className="text-white"
                                    size={20}
                                />
                            </a>

                            <a href="#">
                                <FaTwitter
                                    className="text-white"
                                    size={20}
                                />
                            </a>

                            <a href="#">
                                <FaLinkedinIn
                                    className="text-white"
                                    size={20}
                                />
                            </a>

                        </div>

                    </div>

                    {/* Quick Links */}

                    <div className="col-lg-2 col-md-6 mb-4">

                        <h5 className="mb-4">
                            Quick Links
                        </h5>

                        <ul className="list-unstyled">

                            <li className="mb-2">
                                <Link
                                    to="/"
                                    className="text-secondary text-decoration-none"
                                >
                                    Home
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/products"
                                    className="text-secondary text-decoration-none"
                                >
                                    Products
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/categories"
                                    className="text-secondary text-decoration-none"
                                >
                                    Categories
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/suppliers"
                                    className="text-secondary text-decoration-none"
                                >
                                    Suppliers
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Categories */}

                    <div className="col-lg-3 col-md-6 mb-4">

                        <h5 className="mb-4">
                            Categories
                        </h5>

                        <ul className="list-unstyled">

                            <li className="mb-2 text-secondary">
                                Cotton Fabric
                            </li>

                            <li className="mb-2 text-secondary">
                                Denim Fabric
                            </li>

                            <li className="mb-2 text-secondary">
                                Silk Fabric
                            </li>

                            <li className="mb-2 text-secondary">
                                Linen Fabric
                            </li>

                            <li className="mb-2 text-secondary">
                                Polyester Fabric
                            </li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div className="col-lg-3">

                        <h5 className="mb-4">
                            Contact Us
                        </h5>

                        <p className="text-secondary">

                            <FaMapMarkerAlt className="me-2" />

                            Kolkata, India

                        </p>

                        <p className="text-secondary">

                            <FaPhoneAlt className="me-2" />

                            +91 9876543210

                        </p>

                        <p className="text-secondary">

                            <FaEnvelope className="me-2" />

                            info@textilemart.com

                        </p>

                    </div>

                </div>

                <hr className="border-secondary" />

                <div className="text-center">

                    <p className="mb-0 text-secondary">

                        © {new Date().getFullYear()} TextileMart.
                        All Rights Reserved.

                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;