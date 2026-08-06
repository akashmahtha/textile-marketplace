import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

import {
    FaIndustry,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

import { getSuppliers } from "../services/supplierService";

const Suppliers = () => {

    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSuppliers();

    }, []);

    const loadSuppliers = async () => {

        try {

            const res = await getSuppliers();

            setSuppliers(res.data.suppliers);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (
        <>
            {/* <Navbar /> */}

            <div className="container py-5">

                <div className="text-center mb-5">

                    <h1 className="fw-bold">
                        Trusted Suppliers
                    </h1>

                    <p className="text-muted">
                        Connect directly with verified garment manufacturers.
                    </p>

                </div>

                {loading ? (

                    <div className="text-center">

                        <div
                            className="spinner-border text-warning"
                            role="status"
                        ></div>

                    </div>

                ) : (

                    <div className="row">

                        {suppliers.length > 0 ? (

                            suppliers.map((supplier) => (

                                <div
                                    className="col-lg-4 col-md-6 mb-4"
                                    key={supplier._id}
                                >

                                    <div className="card border-0 shadow h-100">

                                        <div className="card-body text-center">

                                            <div
                                                className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    fontSize: "35px",
                                                }}
                                            >

                                                <FaIndustry />

                                            </div>

                                            <h4 className="fw-bold">

                                                {supplier.name}

                                            </h4>

                                            <p className="text-muted">

                                                <FaEnvelope /> {supplier.email}

                                            </p>

                                            <p>

                                                <FaPhoneAlt />{" "}
                                                {supplier.phone || "N/A"}

                                            </p>

                                            <p>

                                                <FaMapMarkerAlt />{" "}
                                                {supplier.address || "India"}

                                            </p>

                                            <Link
                                                to={`/suppliers/${supplier._id}`}
                                                className="btn btn-warning w-100"
                                            >

                                                View Profile

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="text-center py-5">

                                <h3>

                                    No Suppliers Found

                                </h3>

                            </div>

                        )}

                    </div>

                )}

            </div>

            {/* <Footer /> */}
        </>
    );
};

export default Suppliers;