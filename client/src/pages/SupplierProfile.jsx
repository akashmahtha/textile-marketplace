import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import {
    FaIndustry,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaClock,
    FaBoxes,
    FaTag,
} from "react-icons/fa";

import {
    getSupplier,
    getSupplierProducts,
    getSupplierProfile,
} from "../services/supplierService";

import "./SupplierProfile.css";

const SupplierProfile = () => {

    const { id } = useParams();

    const [supplier, setSupplier] = useState(null);

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadData();

    }, [id]);

    // ======================================
    // Load Supplier Data
    // ======================================

    const loadData = async () => {

        try {

            let supplierRes;
            let productRes;

            if (id) {

                // Public Supplier Profile
                supplierRes = await getSupplier(id);

                productRes = await getSupplierProducts(id);

            } else {

                // Logged In Supplier
                supplierRes = await getSupplierProfile();

                productRes = {
                    data: {
                        products: [],
                    },
                };

            }

            setSupplier(supplierRes.data.supplier);

            setProducts(productRes.data.products);

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

                    <div className="spinner-border text-warning"></div>

                    <h5 className="mt-3">

                        Loading Supplier...

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
                {/* ======================================
    Supplier Profile Card
====================================== */}

                <div className="card shadow border-0 supplier-profile-card mb-5">

                    <div className="card-body p-5">

                        <div className="row align-items-center">

                            {/* ==========================
                Logo
            ========================== */}

                            <div className="col-lg-3 text-center mb-4 mb-lg-0">

                                <div className="supplier-logo mx-auto">

                                    <FaIndustry />

                                </div>

                            </div>

                            {/* ==========================
                Supplier Information
            ========================== */}

                            <div className="col-lg-9">

                                <h2 className="fw-bold mb-3">

                                    {supplier.supplierProfile?.businessName ||
                                        supplier.name}

                                </h2>

                                <p className="text-muted mb-4">

                                    {supplier.supplierProfile?.description ||
                                        "Premium Textile Supplier"}

                                </p>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <p>

                                            <FaEnvelope className="me-2 text-warning" />

                                            {supplier.email}

                                        </p>

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <p>

                                            <FaPhoneAlt className="me-2 text-success" />

                                            {supplier.phone || "N/A"}

                                        </p>

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <p>

                                            <FaMapMarkerAlt className="me-2 text-danger" />

                                            {supplier.supplierProfile?.address ||
                                                "India"}

                                        </p>

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <p>

                                            <FaClock className="me-2 text-primary" />

                                            {supplier.supplierProfile?.operatingHours ||
                                                "Not Available"}

                                        </p>

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <p>

                                            <FaBoxes className="me-2 text-info" />

                                            MOQ :

                                            {" "}

                                            {supplier.supplierProfile?.moq ||
                                                "N/A"}

                                        </p>

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <p>

                                            <FaTag className="me-2 text-secondary" />

                                            {supplier.supplierProfile?.businessType ||
                                                "Supplier"}

                                        </p>

                                    </div>

                                </div>

                                {/* ==========================
                    Product Categories
                ========================== */}

                                <div className="mt-3">

                                    <h6 className="fw-bold">

                                        Product Categories

                                    </h6>

                                    <div className="d-flex flex-wrap gap-2 mt-2">

                                        {supplier.supplierProfile?.productCategories
                                            ?.length > 0 ? (

                                            supplier.supplierProfile.productCategories.map(
                                                (category, index) => (

                                                    <span
                                                        key={index}
                                                        className="badge bg-warning text-dark px-3 py-2"
                                                    >

                                                        {category}

                                                    </span>

                                                )
                                            )

                                        ) : (

                                            <span className="text-muted">

                                                No Categories Added

                                            </span>

                                        )}

                                    </div>

                                </div>

                                {/* ==========================
                    Fabric Types
                ========================== */}

                                <div className="mt-4">

                                    <h6 className="fw-bold">

                                        Fabric Types

                                    </h6>

                                    <div className="d-flex flex-wrap gap-2 mt-2">

                                        {supplier.supplierProfile?.fabricTypes
                                            ?.length > 0 ? (

                                            supplier.supplierProfile.fabricTypes.map(
                                                (fabric, index) => (

                                                    <span
                                                        key={index}
                                                        className="badge bg-primary px-3 py-2"
                                                    >

                                                        {fabric}

                                                    </span>

                                                )
                                            )

                                        ) : (

                                            <span className="text-muted">

                                                No Fabric Types Added

                                            </span>

                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ======================================
    Products Header
====================================== */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h3 className="fw-bold">

                        Supplier Products

                    </h3>

                    <span className="badge bg-warning text-dark fs-6">

                        {products.length} Products

                    </span>

                </div>

                <div className="row">
                    {products.length > 0 ? (

                        products.map((product) => (

                            <ProductCard
                                key={product._id}
                                product={product}
                            />

                        ))

                    ) : (

                        <div className="col-12">

                            <div className="card shadow border-0">

                                <div className="card-body text-center py-5">

                                    <FaIndustry
                                        size={60}
                                        className="text-warning mb-3"
                                    />

                                    <h3 className="fw-bold">

                                        No Products Available

                                    </h3>

                                    <p className="text-muted">

                                        This supplier hasn't added any
                                        products yet.

                                    </p>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

            <Footer />

        </>

    );

};

export default SupplierProfile;