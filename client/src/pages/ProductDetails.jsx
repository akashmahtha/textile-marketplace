import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getProduct } from "../services/productService";
import { addToCart } from "../services/cartService";

const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {

        try {

            const res = await getProduct(id);

            setProduct(res.data.product);

        } catch (error) {

            console.log(error);

            toast.error("Product not found");

        } finally {

            setLoading(false);

        }

    };

    const handleAddToCart = async () => {

        try {

            const res = await addToCart({
                productId: product._id,
                quantity: 1,
            });

            toast.success(
                res.data.message || "✅ Item successfully added to cart!",
                {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                }
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message || "❌ Unable to add product",
                {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                }
            );

        }

    };

    if (loading) {

        return (
            <div className="container py-5 text-center">

                <div className="spinner-border text-primary"></div>

            </div>
        );

    }

    if (!product) {

        return (
            <div className="container py-5 text-center">

                <h3>Product Not Found</h3>

            </div>
        );

    }

    return (

        <div className="container py-5">

            <div className="row">

                {/* Images */}

                <div className="col-md-6">

                    <img
                        src={
                            product.images?.[0]?.url ||
                            "https://via.placeholder.com/600x500?text=No+Image"
                        }
                        alt={product.name}
                        className="img-fluid rounded shadow"
                        style={{
                            height: "500px",
                            width: "100%",
                            objectFit: "cover",
                        }}
                    />

                </div>

                {/* Details */}

                <div className="col-md-6">

                    <span className="badge bg-primary mb-3">

                        {product.category}

                    </span>

                    <h2 className="fw-bold">

                        {product.name}

                    </h2>

                    <h3 className="text-success mt-3">

                        ₹ {product.price}

                    </h3>

                    <hr />

                    <p>

                        {product.description}

                    </p>

                    <div className="mt-4">

                        <h5>Stock</h5>

                        <p>{product.stock}</p>

                    </div>

                    <div className="mt-3">

                        <h5>Available Colors</h5>

                        {product.colors?.length > 0 ? (

                            product.colors.map((color, index) => (

                                <span
                                    key={index}
                                    className="badge bg-secondary me-2"
                                >
                                    {color}
                                </span>

                            ))

                        ) : (

                            <p>No Colors Available</p>

                        )}

                    </div>

                    <div className="mt-4">

                        <h5>Specifications</h5>

                        <table className="table table-bordered">

                            <tbody>

                                <tr>

                                    <th>GSM</th>

                                    <td>
                                        {product.specifications?.gsm}
                                    </td>

                                </tr>

                                <tr>

                                    <th>Width</th>

                                    <td>
                                        {product.specifications?.width}
                                    </td>

                                </tr>

                                <tr>

                                    <th>Composition</th>

                                    <td>
                                        {product.specifications?.composition}
                                    </td>

                                </tr>

                                <tr>

                                    <th>Weave</th>

                                    <td>
                                        {product.specifications?.weave}
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                    <button
                        className="btn btn-primary btn-lg mt-3"
                        onClick={handleAddToCart}
                    >
                        Add To Cart
                    </button>
                    <hr className="my-4" />

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h5 className="mb-3">

                                🤖 AI Product Assistant

                            </h5>

                            <div className="d-grid gap-2">

                                <button
                                    className="btn btn-outline-primary"
                                >
                                    Compare Similar Fabrics
                                </button>

                                <button
                                    className="btn btn-outline-success"
                                >
                                    Recommend Similar Products
                                </button>

                                <button
                                    className="btn btn-outline-warning"
                                >
                                    Ask About This Product
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ProductDetails;