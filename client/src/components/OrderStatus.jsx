import {
    FaClipboardList,
    FaCheckCircle,
    FaBoxOpen,
    FaTruck,
    FaFlagCheckered,
} from "react-icons/fa";

const OrderStatus = ({ orders = [] }) => {

    const steps = [
        {
            title: "Pending",
            icon: <FaClipboardList />,
            color: "warning",
        },
        {
            title: "Accepted",
            icon: <FaCheckCircle />,
            color: "info",
        },
        {
            title: "Preparing",
            icon: <FaBoxOpen />,
            color: "primary",
        },
        {
            title: "Ready for Dispatch",
            icon: <FaTruck />,
            color: "secondary",
        },
        {
            title: "Completed",
            icon: <FaFlagCheckered />,
            color: "success",
        },
    ];

    return (

        <div className="card shadow border-0 mt-4">

            <div className="card-body">

                <h3 className="fw-bold mb-4">

                    Track Order Status

                </h3>

                {orders.length === 0 ? (

                    <div className="text-center py-4">

                        No Orders Found

                    </div>

                ) : (

                    orders.map((order) => (

                        <div
                            key={order._id}
                            className="mb-4"
                        >

                            <h6 className="fw-bold">

                                Order #

                                {order._id.slice(-6)}

                            </h6>

                            <div className="d-flex flex-wrap gap-3 mt-3">

                                {steps.map((step) => (

                                    <div
                                        key={step.title}
                                        className={`badge bg-${order.status === step.title
                                                ? step.color
                                                : "light text-dark"
                                            } p-3`}
                                    >

                                        <div
                                            style={{
                                                fontSize: "20px",
                                            }}
                                        >

                                            {step.icon}

                                        </div>

                                        <div>

                                            {step.title}

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

};

export default OrderStatus;