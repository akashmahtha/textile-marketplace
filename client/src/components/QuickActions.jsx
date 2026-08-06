import { Link } from "react-router-dom";

import {
    FaShoppingBag,
    FaHeart,
    FaClipboardList,
    FaShoppingCart,
} from "react-icons/fa";

const QuickActions = () => {

    const actions = [

        {
            title: "Browse Products",
            icon: <FaShoppingBag />,
            color: "primary",
            link: "/products",
        },

        {
            title: "Wishlist",
            icon: <FaHeart />,
            color: "danger",
            link: "/wishlist",
        },

        {
            title: "My Orders",
            icon: <FaClipboardList />,
            color: "success",
            link: "/buyer/orders",
        },

        {
            title: "Cart",
            icon: <FaShoppingCart />,
            color: "warning",
            link: "/cart",
        },

    ];

    return (

        <div className="card shadow border-0 mt-4">

            <div className="card-body">

                <h3 className="fw-bold mb-4">

                    Quick Actions

                </h3>

                <div className="row">

                    {actions.map((item, index) => (

                        <div
                            className="col-md-6 mb-3"
                            key={index}
                        >

                            <Link
                                to={item.link}
                                className={`btn btn-${item.color} w-100 py-3`}
                            >

                                <span
                                    style={{
                                        fontSize: "22px",
                                    }}
                                >

                                    {item.icon}

                                </span>

                                <br />

                                {item.title}

                            </Link>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

};

export default QuickActions;