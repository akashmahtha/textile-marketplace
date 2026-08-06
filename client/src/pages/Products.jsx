import { useEffect, useState } from "react";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import Pagination from "../components/Pagination";

import {
    searchProducts,
} from "../services/productService";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);

    const [filters, setFilters] = useState({
        keyword: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        inStock: false,
        sort: "",
    });

    useEffect(() => {

        fetchProducts();

    }, [page, filters]);

    // ===============================
    // Fetch Products
    // ===============================

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const params = {
                ...filters,
                page,
                limit: 8,
            };

            const res = await searchProducts(params);

            setProducts(res.data.products);
            setPages(res.data.pages);
            setTotal(res.data.total);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    // ===============================
    // Filter
    // ===============================

    const handleFilter = (data) => {

        setFilters(data);

        setPage(1);

    };

    // ===============================
    // Pagination
    // ===============================

    const changePage = (newPage) => {

        if (newPage < 1 || newPage > pages)
            return;

        setPage(newPage);

        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    };

    return (

        <>

            {/* <Navbar /> */}

            <div className="container py-5">

                <div className="row">

                    {/* Left Filter */}

                    <div className="col-lg-3 mb-4">

                        <ProductFilter
                            onFilter={handleFilter}
                        />

                    </div>

                    {/* Products */}

                    <div className="col-lg-9">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h2 className="fw-bold">

                                All Products

                            </h2>

                            <span className="badge bg-warning text-dark fs-6">

                                {total} Products

                            </span>

                        </div>

                        {loading ? (

                            <div className="text-center py-5">

                                <div
                                    className="spinner-border text-warning"
                                    role="status"
                                >
                                </div>

                            </div>

                        ) : (

                            <>

                                <div className="row">

                                    {products.length > 0 ? (

                                        products.map((product) => (

                                            <ProductCard
                                                key={product._id}
                                                product={product}
                                            />

                                        ))

                                    ) : (

                                        <div className="text-center py-5">

                                            <h3>

                                                No Products Found

                                            </h3>

                                        </div>

                                    )}

                                </div>

                                <Pagination
                                    page={page}
                                    pages={pages}
                                    changePage={changePage}
                                />

                            </>

                        )}

                    </div>

                </div>

            </div>

            {/* <Footer /> */}

        </>

    );

};

export default Products;