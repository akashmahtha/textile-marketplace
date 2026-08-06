import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    addProduct,
    getCategories,
} from "../services/productService";

import "./AddProduct.css";

const AddProduct = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);

    const [previewImages, setPreviewImages] = useState([]);

    const [formData, setFormData] = useState({

        name: "",

        category: "",

        description: "",

        price: "",

        stock: "",

        colors: "",

        specifications: "",

        images: [],

    });

    // ==========================
    // Load Categories
    // ==========================

    useEffect(() => {

        fetchCategories();

    }, []);

    const fetchCategories = async () => {

        try {

            const res = await getCategories();

            setCategories(res.data.categories);

        } catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // Handle Input
    // ==========================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };
    // ==========================
    // Submit Product
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name);
            data.append("category", formData.category);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("stock", formData.stock);
            data.append("colors", formData.colors);
            data.append("specifications", formData.specifications);

            formData.images.forEach((image) => {

                data.append("images", image);

            });

            const res = await addProduct(data);

            toast.success(res.data.message);

            navigate("/supplier/my-products");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to Add Product"
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Handle Images
    // ==========================

    const handleImages = (e) => {

        const files = Array.from(e.target.files);

        setFormData({

            ...formData,

            images: files,

        });

        const previews = files.map((file) =>
            URL.createObjectURL(file)
        );

        setPreviewImages(previews);

    };

    return (

        <>

            <Navbar />

            <div className="container py-5">

                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white">

                        <h3 className="mb-0">

                            Add New Product

                        </h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            {/* Product Name */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Product Name

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {/* Category */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Category

                                </label>

                                <select
                                    className="form-select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">

                                        Select Category

                                    </option>

                                    {categories.map((category) => (

                                        <option
                                            key={category}
                                            value={category}
                                        >

                                            {category}

                                        </option>

                                    ))}

                                </select>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Price

                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Stock

                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            {/* Description */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Description

                                </label>

                                <textarea
                                    rows="4"
                                    className="form-control"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {/* Colors */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Colors

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Black, White, Blue"
                                    name="colors"
                                    value={formData.colors}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Specifications */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Specifications (JSON)

                                </label>

                                <textarea
                                    rows="3"
                                    className="form-control"
                                    name="specifications"
                                    placeholder='{"Fabric":"Cotton","Fit":"Regular"}'
                                    value={formData.specifications}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Images */}

                            <div className="mb-4">

                                <label className="form-label">

                                    Product Images

                                </label>

                                <input
                                    type="file"
                                    className="form-control"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImages}
                                />

                            </div>

                            {/* Image Preview */}

                            {previewImages.length > 0 && (

                                <div className="row mb-4">

                                    {previewImages.map((image, index) => (

                                        <div
                                            className="col-lg-3 col-md-4 col-6 mb-3"
                                            key={index}
                                        >

                                            <img
                                                src={image}
                                                alt="Preview"
                                                className="img-fluid rounded shadow"
                                                style={{
                                                    height: "180px",
                                                    width: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />

                                        </div>

                                    ))}

                                </div>

                            )}

                            {/* Submit Button */}

                            <div className="d-grid">

                                <button
                                    className="btn btn-primary btn-lg"
                                    type="submit"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Saving Product..."
                                        : "Save Product"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

};

export default AddProduct;