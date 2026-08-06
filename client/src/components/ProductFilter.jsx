import { useEffect, useState } from "react";
import { getCategories } from "../services/productService";

const ProductFilter = ({ onFilter }) => {

    const [categories, setCategories] = useState([]);

    const [filter, setFilter] = useState({
        keyword: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        inStock: false,
        sort: "",
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        try {

            const res = await getCategories();

            setCategories(res.data.categories);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        const updated = {
            ...filter,
            [name]: type === "checkbox" ? checked : value,
        };

        setFilter(updated);

        onFilter(updated);

    };

    return (

        <div className="card shadow border-0">

            <div className="card-body">

                <h4 className="fw-bold mb-4">
                    Filters
                </h4>

                {/* Search */}

                <label className="fw-semibold mb-2">
                    Search
                </label>

                <input
                    type="text"
                    name="keyword"
                    className="form-control mb-3"
                    placeholder="Search products..."
                    onChange={handleChange}
                />

                {/* Category */}

                <label className="fw-semibold mb-2">
                    Category
                </label>

                <select
                    name="category"
                    className="form-select mb-3"
                    onChange={handleChange}
                >

                    <option value="">
                        All Categories
                    </option>

                    {categories.map((cat) => (

                        <option
                            key={cat}
                            value={cat}
                        >
                            {cat}
                        </option>

                    ))}

                </select>

                {/* Min Price */}

                <label className="fw-semibold mb-2">
                    Min Price
                </label>

                <input
                    type="number"
                    name="minPrice"
                    className="form-control mb-3"
                    placeholder="₹100"
                    onChange={handleChange}
                />

                {/* Max Price */}

                <label className="fw-semibold mb-2">
                    Max Price
                </label>

                <input
                    type="number"
                    name="maxPrice"
                    className="form-control mb-3"
                    placeholder="₹5000"
                    onChange={handleChange}
                />

                {/* Stock */}

                <div className="form-check mb-3">

                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="stock"
                        name="inStock"
                        onChange={handleChange}
                    />

                    <label
                        className="form-check-label"
                        htmlFor="stock"
                    >
                        In Stock Only
                    </label>

                </div>

                {/* Sort */}

                <label className="fw-semibold mb-2">
                    Sort By
                </label>

                <select
                    name="sort"
                    className="form-select"
                    onChange={handleChange}
                >

                    <option value="">
                        Select
                    </option>

                    <option value="newest">
                        Newest
                    </option>

                    <option value="low">
                        Price Low → High
                    </option>

                    <option value="high">
                        Price High → Low
                    </option>

                </select>

            </div>

        </div>

    );

};

export default ProductFilter;