// import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
// import Footer from "../components/Footer";

const CategoriesPage = () => {
    return (
        <>
            {/* <Navbar /> */}

            {/* Hero Section */}

            <section className="bg-dark text-white py-5">

                <div className="container text-center">

                    <h1 className="display-4 fw-bold">
                        Shop By Categories
                    </h1>

                    <p className="lead mt-3 mb-0">
                        Discover premium garments from trusted manufacturers and suppliers across India.
                    </p>

                </div>

            </section>

            {/* Categories */}

            <section className="py-5 bg-light">

                <div className="container">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">
                            Explore Categories
                        </h2>

                        <p className="text-muted">
                            Browse our wide collection of garments for wholesale and bulk orders.
                        </p>

                    </div>

                    <Categories />

                </div>

            </section>

            {/* Why Choose */}

            <section className="py-5">

                <div className="container">

                    <div className="row text-center">

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body">

                                    <h3 className="text-warning">
                                        500+
                                    </h3>

                                    <h5>
                                        Products
                                    </h5>

                                    <p className="text-muted">
                                        Premium quality garments from verified suppliers.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body">

                                    <h3 className="text-warning">
                                        100+
                                    </h3>

                                    <h5>
                                        Suppliers
                                    </h5>

                                    <p className="text-muted">
                                        Trusted garment manufacturers across India.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body">

                                    <h3 className="text-warning">
                                        24/7
                                    </h3>

                                    <h5>
                                        AI Assistance
                                    </h5>

                                    <p className="text-muted">
                                        Get smart product recommendations anytime.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body">

                                    <h3 className="text-warning">
                                        MOQ
                                    </h3>

                                    <h5>
                                        Bulk Orders
                                    </h5>

                                    <p className="text-muted">
                                        Source products directly from manufacturers.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* <Footer /> */}
        </>
    );
};

export default CategoriesPage;