import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { buyerOnboarding } from "../services/buyerService";

import "./BuyerOnboarding.css";

const BuyerOnboarding = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        businessType: "",
        industry: "",
        fabricInterest: [],
        budget: "",
        orderQuantity: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleCheckbox = (e) => {

        const value = e.target.value;

        if (e.target.checked) {

            setFormData({
                ...formData,
                fabricInterest: [
                    ...formData.fabricInterest,
                    value,
                ],
            });

        } else {

            setFormData({
                ...formData,
                fabricInterest: formData.fabricInterest.filter(
                    (item) => item !== value
                ),
            });

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await buyerOnboarding(formData);

            toast.success(res.data.message);

            navigate("/buyer/dashboard");

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

                    <div className="col-lg-8">

                        <div className="card shadow border-0">

                            <div className="card-header bg-primary text-white">

                                <h3 className="mb-0">

                                    Buyer Onboarding

                                </h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    {/* Business Type */}

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

                                            <option value="Retailer">

                                                Retailer

                                            </option>

                                            <option value="Wholesaler">

                                                Wholesaler

                                            </option>

                                            <option value="Manufacturer">

                                                Manufacturer

                                            </option>

                                            <option value="Exporter">

                                                Exporter

                                            </option>

                                            <option value="Distributor">

                                                Distributor

                                            </option>

                                        </select>

                                    </div>

                                    {/* Industry */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Industry

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="industry"
                                            placeholder="Garments, Fashion, Textile..."
                                            value={formData.industry}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Preferred Fabric Types */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Preferred Fabric Types

                                        </label>

                                        <div className="row">

                                            {[
                                                "Cotton",
                                                "Denim",
                                                "Polyester",
                                                "Linen",
                                                "Silk",
                                                "Wool",
                                                "Fleece",
                                                "Rayon",
                                            ].map((fabric) => (

                                                <div
                                                    className="col-md-3 col-6 mb-2"
                                                    key={fabric}
                                                >

                                                    <div className="form-check">

                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value={fabric}
                                                            id={fabric}
                                                            onChange={handleCheckbox}
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

                                    {/* Budget */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Budget Range

                                        </label>

                                        <select
                                            className="form-select"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">

                                                Select Budget

                                            </option>

                                            <option value="₹10,000 - ₹50,000">

                                                ₹10,000 - ₹50,000

                                            </option>

                                            <option value="₹50,000 - ₹1,00,000">

                                                ₹50,000 - ₹1,00,000

                                            </option>

                                            <option value="₹1,00,000 - ₹5,00,000">

                                                ₹1,00,000 - ₹5,00,000

                                            </option>

                                            <option value="₹5,00,000+">

                                                ₹5,00,000+

                                            </option>

                                        </select>

                                    </div>

                                    {/* Order Quantity */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Typical Order Quantity

                                        </label>

                                        <select
                                            className="form-select"
                                            name="orderQuantity"
                                            value={formData.orderQuantity}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">

                                                Select Quantity

                                            </option>

                                            <option value="50-100 Pieces">

                                                50 - 100 Pieces

                                            </option>

                                            <option value="100-500 Pieces">

                                                100 - 500 Pieces

                                            </option>

                                            <option value="500-1000 Pieces">

                                                500 - 1000 Pieces

                                            </option>

                                            <option value="1000+ Pieces">

                                                1000+ Pieces

                                            </option>

                                        </select>

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

export default BuyerOnboarding;