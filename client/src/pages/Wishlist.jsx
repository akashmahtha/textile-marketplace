import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

import {
    getWishlist,
    removeFromWishlist,
    moveToCart,
} from "../services/wishlistService";

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchWishlist();

    }, []);

    const fetchWishlist = async () => {

        try {

            const res = await getWishlist();

            console.log(res.data.wishlist);

            setWishlist(res.data.wishlist);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load wishlist"
            );

        } finally {

            setLoading(false);

        }

    };

    const handleRemove = async (productId) => {

        try {

            await removeFromWishlist(productId);

            toast.success("Removed from Wishlist");

            fetchWishlist();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Remove Failed"
            );

        }

    };

    const handleMoveToCart = async (productId) => {

        try {

            await moveToCart(productId);

            toast.success("Moved To Cart");

            fetchWishlist();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Move Failed"
            );

        }

    };

    if (loading) {

        return (

            <>
                {/* <Navbar /> */}

                <div className="container py-5 text-center">

                    <div className="spinner-border text-warning"></div>

                </div>

                {/* <Footer /> */}

            </>

        );

    }

    return (

        <>

            {/* <Navbar /> */}

            <div className="container py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">

                        ❤️ My Wishlist

                    </h2>

                    <span className="badge bg-dark fs-6">

                        {wishlist.length} Items

                    </span>

                </div>

                {wishlist.length === 0 ? (

                    <div className="card shadow border-0">

                        <div className="card-body text-center py-5">

                            <h4>

                                Your Wishlist is Empty

                            </h4>

                            <p className="text-muted">

                                Save your favourite products here.

                            </p>

                            <Link
                                to="/products"
                                className="btn btn-warning"
                            >

                                Browse Products

                            </Link>

                        </div>

                    </div>

                ) : (

                    <div className="row">

                        {wishlist.map((item) => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={item._id}
                            >

                                <div className="card shadow border-0 h-100">

                                    <img
                                        src={
                                            item.product?.images?.[0]?.url ||
                                            "https://via.placeholder.com/400x300?text=No+Image"
                                        }
                                        alt={item.product?.name}
                                        className="card-img-top"
                                        style={{
                                            height: "250px",
                                            objectFit: "cover",
                                        }}
                                    />

                                    <div className="card-body">

                                        <h5>

                                            {item.product?.name}

                                        </h5>

                                        <p className="text-muted">

                                            {item.product?.category}

                                        </p>

                                        <h4 className="text-primary">

                                            ₹{item.product?.price}

                                        </h4>

                                    </div>

                                    <div className="card-footer bg-white border-0">

                                        <button
                                            className="btn btn-success w-100 mb-2"
                                            onClick={() =>
                                                handleMoveToCart(
                                                    item.product._id
                                                )
                                            }
                                        >

                                            Move To Cart

                                        </button>

                                        <button
                                            className="btn btn-outline-danger w-100"
                                            onClick={() =>
                                                handleRemove(
                                                    item.product._id
                                                )
                                            }
                                        >

                                            Remove

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            {/* <Footer /> */}

        </>

    );

};

export default Wishlist;