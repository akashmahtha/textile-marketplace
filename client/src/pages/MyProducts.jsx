import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getMyProducts,
    deleteProduct,
} from "../services/productService";

const MyProducts = () => {

    const [products, setProducts] = useState([]);
    const [deletingId, setDeletingId] = useState(null);

    const [filteredProducts, setFilteredProducts] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchProducts();

    }, []);

    // =====================================
    // Fetch Products
    // =====================================

    const fetchProducts = async () => {

        try {

            const res = await getMyProducts();

            setProducts(res.data.products);

            setFilteredProducts(res.data.products);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load products"
            );

        } finally {

            setLoading(false);

        }

    };

    // =====================================
    // Search Product
    // =====================================

    useEffect(() => {

        const result = products.filter((product) =>
            product.name
                .toLowerCase()
                .includes(keyword.toLowerCase())
        );

        setFilteredProducts(result);

    }, [keyword, products]);

    // =====================================
    // Delete Product
    // =====================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?\n\nThis action cannot be undone."
        );

        if (!confirmDelete) return;

        try {

            setDeletingId(id);

            await deleteProduct(id);

            toast.success("Product Deleted Successfully");

            fetchProducts();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete Failed"
            );

        } finally {

            setDeletingId(null);

        }

    };

    // =====================================
    // Loading
    // =====================================

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="container py-5 text-center">

                    <div
                        className="spinner-border text-primary"
                    ></div>

                    <h5 className="mt-3">

                        Loading Products...

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

                {/* ==========================
                    Heading
                ========================== */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">

                            My Products

                        </h2>

                        <p className="text-muted">

                            Manage your uploaded products

                        </p>

                    </div>

                    <Link
                        to="/supplier/add-product"
                        className="btn btn-primary"
                    >

                        + Add Product

                    </Link>

                </div>

                {/* ==========================
                    Search
                ========================== */}

                <div className="card shadow border-0 mb-4">

                    <div className="card-body">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Product..."
                            value={keyword}
                            onChange={(e) =>
                                setKeyword(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>
                {/* ==========================
                    Products Table
                ========================== */}

                <div className="card shadow border-0">

                    <div className="card-body">

                        {filteredProducts.length === 0 ? (

                            <div className="text-center py-5">

                                <h4>No Products Found</h4>

                                <p className="text-muted">

                                    Start by adding your first product.

                                </p>

                                <Link
                                    to="/supplier/add-product"
                                    className="btn btn-primary"
                                >

                                    Add Product

                                </Link>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>Image</th>

                                            <th>Product</th>

                                            <th>Category</th>

                                            <th>Price</th>

                                            <th>Stock</th>

                                            <th>Status</th>

                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredProducts.map((product) => (

                                            <tr key={product._id}>

                                                <td>

                                                    <img
                                                        src={
                                                            product.images?.[0]?.url ||
                                                            "https://via.placeholder.com/80x80?text=No+Image"
                                                        }
                                                        alt={product.name}
                                                        style={{
                                                            width: "70px",
                                                            height: "70px",
                                                            objectFit: "cover",
                                                            borderRadius: "10px",
                                                        }}
                                                    />

                                                </td>

                                                <td>

                                                    <strong>

                                                        {product.name}

                                                    </strong>

                                                </td>

                                                <td>

                                                    <span className="badge bg-info">

                                                        {product.category}

                                                    </span>

                                                </td>

                                                <td>

                                                    ₹ {product.price}

                                                </td>

                                                <td>

                                                    {product.stock}

                                                </td>

                                                <td>

                                                    {product.stock > 0 ? (

                                                        <span className="badge bg-success">

                                                            In Stock

                                                        </span>

                                                    ) : (

                                                        <span className="badge bg-danger">

                                                            Out Of Stock

                                                        </span>

                                                    )}

                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <Link
                                                            to={`/supplier/edit-product/${product._id}`}
                                                            className="btn btn-warning btn-sm"
                                                        >

                                                            Edit

                                                        </Link>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDelete(product._id)}
                                                            disabled={deletingId === product._id}
                                                        >

                                                            {deletingId === product._id
                                                                ? "Deleting..."
                                                                : "Delete"}

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>
            </div>

            <Footer />

        </>

    );

};

export default MyProducts;