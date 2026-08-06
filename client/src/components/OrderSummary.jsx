import {
    FaBoxOpen,
    FaClock,
    FaCheckCircle,
    FaShoppingCart,
} from "react-icons/fa";

const OrderSummary = ({ dashboard }) => {

    const cards = [

        {
            title: "Total Orders",
            value: dashboard?.totalOrders || 0,
            icon: <FaBoxOpen />,
            color: "primary",
        },

        {
            title: "Pending Orders",
            value: dashboard?.pendingOrders || 0,
            icon: <FaClock />,
            color: "warning",
        },

        {
            title: "Completed Orders",
            value: dashboard?.completedOrders || 0,
            icon: <FaCheckCircle />,
            color: "success",
        },

        {
            title: "Cart Items",
            value: dashboard?.cartItems || 0,
            icon: <FaShoppingCart />,
            color: "danger",
        },

    ];

    return (

        <>

            <h3 className="fw-bold mb-4">

                Order Summary

            </h3>

            <div className="row">

                {cards.map((card, index) => (

                    <div
                        className="col-lg-6 col-md-6 mb-4"
                        key={index}
                    >

                        <div
                            className={`card border-0 shadow h-100 bg-${card.color} text-white`}
                        >

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <h2 className="fw-bold">

                                            {card.value}

                                        </h2>

                                        <p className="mb-0">

                                            {card.title}

                                        </p>

                                    </div>

                                    <div
                                        style={{
                                            fontSize: "45px",
                                            opacity: ".9",
                                        }}
                                    >

                                        {card.icon}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </>

    );

};

export default OrderSummary;