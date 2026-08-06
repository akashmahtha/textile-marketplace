import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {

            const res = await getProducts();

            setProducts(res.data.products);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary"></div>
            </div>
        );

    }

    return (

        <section className="py-5 bg-light">

            <div className="container">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">
                        Featured Products
                    </h2>

                    <button className="btn btn-primary">
                        View All
                    </button>

                </div>

                <div className="row">

                    {products.length > 0 ? (

                        products.slice(0, 8).map((product) => (

                            <ProductCard
                                key={product._id}
                                product={product}
                            />

                        ))

                    ) : (

                        <h4 className="text-center">
                            No Products Found
                        </h4>

                    )}

                </div>

            </div>

        </section>

    );

};

export default FeaturedProducts;