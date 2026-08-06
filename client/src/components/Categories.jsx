import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaTshirt,
    FaBoxOpen,
    FaShoppingBag,
} from "react-icons/fa";

import { getCategories } from "../services/productService";

const Categories = () => {

    const [categories, setCategories] = useState([]);

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

    const getIcon = (category) => {

        switch (category.toLowerCase()) {

            case "hoodies":
                return <FaTshirt />;

            case "t-shirts":
                return <FaTshirt />;

            case "sweatshirts":
                return <FaShoppingBag />;

            case "jackets":
                return <FaShoppingBag />;

            case "joggers":
                return <FaBoxOpen />;

            default:
                return <FaTshirt />;

        }

    };

    return (

        <section className="py-5">

            <div className="container">

                <h2 className="fw-bold text-center mb-5">

                    Shop By Categories

                </h2>

                <div className="row">

                    {categories.map((category) => (

                        <div
                            key={category}
                            className="col-lg-3 col-md-4 col-6 mb-4"
                        >

                            <Link
                                to={`/products?category=${category}`}
                                className="text-decoration-none"
                            >

                                <div className="card shadow border-0 h-100 text-center p-4 category-card">

                                    <div
                                        className="text-warning mb-3"
                                        style={{
                                            fontSize: "50px",
                                        }}
                                    >

                                        {getIcon(category)}

                                    </div>

                                    <h5 className="fw-bold text-dark">

                                        {category}

                                    </h5>

                                </div>

                            </Link>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

};

export default Categories;