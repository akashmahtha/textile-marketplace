// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

const About = () => {
    return (
        <>
            {/* <Navbar /> */}

            <div className="container py-5">

                <div className="row align-items-center">

                    <div className="col-lg-6">

                        <h1 className="fw-bold mb-4">
                            About TextileMart
                        </h1>

                        <p className="text-muted">

                            TextileMart is a modern B2B textile marketplace
                            connecting buyers with trusted textile suppliers
                            across India.

                        </p>

                        <p className="text-muted">

                            Our mission is to simplify bulk fabric purchasing,
                            provide verified suppliers, and create a seamless
                            experience for manufacturers and buyers.

                        </p>

                    </div>

                    <div className="col-lg-6">

                        <img
                            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900"
                            alt="About"
                            className="img-fluid rounded shadow"
                        />

                    </div>

                </div>

            </div>

            {/* <Footer /> */}
        </>
    );
};

export default About;