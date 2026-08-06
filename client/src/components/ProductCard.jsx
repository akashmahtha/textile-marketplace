import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

import {
    addToWishlist,
    removeFromWishlist,
} from "../services/wishlistService";

const ProductCard = ({ product }) => {

    const [wishlisted, setWishlisted] = useState(false);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleWishlist = async () => {

        if (!token) {

            toast.error("Please login first");

            return;

        }

        if (role !== "buyer") {

            toast.error("Only buyers can use wishlist");

            return;

        }

        try {

            if (!wishlisted) {

                await addToWishlist(product._id);

                toast.success("Added to Wishlist");

                setWishlisted(true);

            } else {

                await removeFromWishlist(product._id);

                toast.success("Removed from Wishlist");

                setWishlisted(false);

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };

    return (

        <div className="col-md-6 col-lg-3 mb-4">

            <div className="card shadow-sm border-0 h-100 position-relative">

                {/* Wishlist */}

                <button
                    className="btn btn-light position-absolute"
                    style={{
                        top: "12px",
                        right: "12px",
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        zIndex: 10,
                        boxShadow: "0 2px 8px rgba(0,0,0,.15)",
                    }}
                    onClick={handleWishlist}
                >

                    {wishlisted ? (

                        <FaHeart
                            color="red"
                            size={20}
                        />

                    ) : (

                        <FaRegHeart
                            size={20}
                        />

                    )}

                </button>

                <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="card-img-top"
                    style={{
                        height: "220px",
                        objectFit: "cover",
                    }}
                />

                <div className="card-body">

                    <span className="badge bg-primary mb-2">

                        {product.category}

                    </span>

                    <h5>

                        {product.name}

                    </h5>

                    <h4 className="text-primary fw-bold">

                        ₹ {product.price}

                    </h4>

                    <p className="text-muted">

                        Stock : {product.stock}

                    </p>

                </div>

                <div className="card-footer bg-white border-0">

                    <Link
                        to={`/product/${product._id}`}
                        className="btn btn-primary w-100"
                    >

                        View Details

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default ProductCard;