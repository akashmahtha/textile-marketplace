import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { supplierOnboarding } from "../services/supplierService";

import "./SupplierOnboarding.css";

const SupplierOnboarding = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    // ===================================
    // Check Onboarding Status
    // ===================================

    useEffect(() => {

        const role =
            localStorage.getItem("role");

        const completed =
            localStorage.getItem(
                "profileCompleted"
            );

        if (
            role === "supplier" &&
            completed === "true"
        ) {

            navigate("/supplier/dashboard");

        }

    }, [navigate]);

    const [formData, setFormData] = useState({

        businessName: "",

        businessType: "",

        contact: "",

        address: "",

        operatingHours: "",

        productCategories: [],

        fabricTypes: [],

        moq: "",

        description: "",

    });

    // ===================================
    // Handle Input
    // ===================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };

    // ===================================
    // Product Categories
    // ===================================

    const handleCategory = (e) => {

        const value = e.target.value;

        if (e.target.checked) {

            setFormData({

                ...formData,

                productCategories: [

                    ...formData.productCategories,

                    value,

                ],

            });

        } else {

            setFormData({

                ...formData,

                productCategories:
                    formData.productCategories.filter(
                        (item) =>
                            item !== value
                    ),

            });

        }

    };

    // ===================================
    // Fabric Types
    // ===================================

    const handleFabric = (e) => {

        const value = e.target.value;

        if (e.target.checked) {

            setFormData({

                ...formData,

                fabricTypes: [

                    ...formData.fabricTypes,

                    value,

                ],

            });

        } else {

            setFormData({

                ...formData,

                fabricTypes:
                    formData.fabricTypes.filter(
                        (item) =>
                            item !== value
                    ),

            });

        }

    };
    // ===================================
    // Submit
    // ===================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await supplierOnboarding(formData);

            toast.success(res.data.message);

            // Save Local Storage
            localStorage.setItem(
                "profileCompleted",
                "true"
            );

            localStorage.setItem(
                "role",
                "supplier"
            );

            setTimeout(() => {

                navigate("/supplier/dashboard");

            }, 1000);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Onboarding Failed"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <>

            <Navbar />

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-9">

                        <div className="card shadow border-0">

                            <div className="card-header bg-primary text-white">

                                <h3 className="mb-0">

                                    Supplier Onboarding

                                </h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>
                                    {/* ===================================
    Business Name
=================================== */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Business Name

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="businessName"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            placeholder="Enter Business Name"
                                            required
                                        />

                                    </div>

                                    {/* ===================================
    Business Type
=================================== */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Business Type

                                        </label>

                                        <select
                                            className="form-select"
                                            name="businessType"
                                            value={formData.businessType}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">

                                                Select Business Type

                                            </option>

                                            <option value="Manufacturer">
                                                Manufacturer
                                            </option>

                                            <option value="Wholesaler">
                                                Wholesaler
                                            </option>

                                            <option value="Exporter">
                                                Exporter
                                            </option>

                                            <option value="Trader">
                                                Trader
                                            </option>

                                            <option value="Retail Supplier">
                                                Retail Supplier
                                            </option>

                                        </select>

                                    </div>

                                    {/* ===================================
    Contact
=================================== */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Contact Number

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            placeholder="Enter Contact Number"
                                            required
                                        />

                                    </div>

                                    {/* ===================================
    Address
=================================== */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Business Address

                                        </label>

                                        <textarea
                                            rows="3"
                                            className="form-control"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Enter Business Address"
                                            required
                                        ></textarea>

                                    </div>

                                    {/* ===================================
    Operating Hours
=================================== */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Operating Hours

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="operatingHours"
                                            value={formData.operatingHours}
                                            onChange={handleChange}
                                            placeholder="09:00 AM - 06:00 PM"
                                            required
                                        />

                                    </div>

                                    {/* ===================================
    Product Categories
=================================== */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Product Categories

                                        </label>

                                        <div className="row">

                                            {[
                                                "Cotton",
                                                "Denim",
                                                "Silk",
                                                "Linen",
                                                "Polyester",
                                                "Wool",
                                                "Rayon",
                                                "Fleece",
                                            ].map((category) => (

                                                <div
                                                    key={category}
                                                    className="col-md-3 col-6 mb-2"
                                                >

                                                    <div className="form-check">

                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            value={category}
                                                            id={category}
                                                            onChange={handleCategory}
                                                        />

                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={category}
                                                        >

                                                            {category}

                                                        </label>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                    {/* ===================================
    Fabric Types
=================================== */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Types of Fabrics Offered

                                        </label>

                                        <div className="row">

                                            {[
                                                "Knitted",
                                                "Woven",
                                                "Printed",
                                                "Dyed",
                                                "Organic Cotton",
                                                "Fleece",
                                                "Rayon",
                                                "Blended",
                                            ].map((fabric) => (

                                                <div
                                                    key={fabric}
                                                    className="col-md-3 col-6 mb-2"
                                                >

                                                    <div className="form-check">

                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            value={fabric}
                                                            id={fabric}
                                                            onChange={handleFabric}
                                                        />

                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={fabric}
                                                        >

                                                            {fabric}

                                                        </label>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                    {/* ===================================
    MOQ
=================================== */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Minimum Order Quantity

                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            name="moq"
                                            value={formData.moq}
                                            onChange={handleChange}
                                            placeholder="Minimum Order Quantity"
                                            required
                                        />

                                    </div>

                                    {/* ===================================
    Description
=================================== */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Business Description

                                        </label>

                                        <textarea
                                            rows="4"
                                            className="form-control"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Write about your business..."
                                        ></textarea>

                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-3"
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Saving..."
                                            : "Complete Onboarding"}

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

};

export default SupplierOnboarding;