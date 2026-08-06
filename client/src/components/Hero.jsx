import { Link } from "react-router-dom";
import hero from "../assets/images/hero.jpg";

const Hero = () => {
    return (
        <section className="bg-light py-5">
            <div className="container-fluid">

                <div className="row align-items-center">

                    {/* Left */}

                    <div className="col-lg-6 px-lg-5 px-3">

                        <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                            India's #1 B2B Textile Marketplace
                        </span>

                        <h1
                            className="fw-bold mb-4"
                            style={{
                                fontSize: "60px",
                                lineHeight: "1.2",
                                color: "#212529",
                            }}
                        >
                            Buy Premium
                            <br />

                            Textile
                            <span className="text-primary">
                                {" "}
                                Fabrics
                            </span>

                            <br />

                            Directly From
                            <br />

                            Suppliers
                        </h1>

                        <p
                            className="text-secondary mb-4"
                            style={{
                                fontSize: "18px",
                                maxWidth: "600px",
                            }}
                        >
                            Connect with verified textile manufacturers and
                            suppliers across India. Discover quality fabrics,
                            compare products and place bulk orders with ease.
                        </p>

                        <div className="d-flex flex-wrap gap-3">

                            <Link
                                to="/products"
                                className="btn btn-primary btn-lg px-4"
                            >
                                Explore Products
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-outline-dark btn-lg px-4"
                            >
                                Become Supplier
                            </Link>

                        </div>

                        {/* Stats */}

                        <div className="row mt-5">

                            <div className="col-4">

                                <h3 className="fw-bold text-primary">
                                    500+
                                </h3>

                                <p className="text-muted">
                                    Suppliers
                                </p>

                            </div>

                            <div className="col-4">

                                <h3 className="fw-bold text-primary">
                                    10K+
                                </h3>

                                <p className="text-muted">
                                    Products
                                </p>

                            </div>

                            <div className="col-4">

                                <h3 className="fw-bold text-primary">
                                    1000+
                                </h3>

                                <p className="text-muted">
                                    Buyers
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="col-lg-6 p-3 text-center">

                        <img
                            src={hero}
                            alt="Textile Marketplace"
                            className="img-fluid rounded-4 shadow-lg"
                            style={{
                                maxHeight: "650px",
                                width: "100%",
                                objectFit: "cover",
                            }}
                        />

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Hero;