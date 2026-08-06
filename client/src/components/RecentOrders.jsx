import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const RecentOrders = ({ orders = [] }) => {

    const getBadge = (status) => {

        switch (status) {

            case "Completed":
                return "success";

            case "Pending":
                return "warning";

            case "Accepted":
                return "info";

            case "Preparing":
                return "primary";

            case "Ready for Dispatch":
                return "secondary";

            default:
                return "dark";

        }

    };

    return (

        <div className="card border-0 shadow">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h3 className="fw-bold mb-0">

                        Recent Orders

                    </h3>

                    <Link
                        to="/buyer/orders"
                        className="btn btn-outline-primary btn-sm"
                    >

                        View All

                    </Link>

                </div>

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead className="table-light">

                            <tr>

                                <th>#</th>

                                <th>Supplier</th>

                                <th>Status</th>

                                <th>Date</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {orders.length > 0 ? (

                                orders.map((order, index) => (

                                    <tr key={order._id}>

                                        <td>

                                            {index + 1}

                                        </td>

                                        <td>

                                            {order.supplier?.name || "-"}

                                        </td>

                                        <td>

                                            <span
                                                className={`badge bg-${getBadge(
                                                    order.status
                                                )}`}
                                            >

                                                {order.status}

                                            </span>

                                        </td>

                                        <td>

                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}

                                        </td>

                                        <td>

                                            <Link
                                                to={`/buyer/orders/${order._id}`}
                                                className="btn btn-sm btn-primary"
                                            >

                                                <FaEye />

                                            </Link>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-4"
                                    >

                                        No Orders Found

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default RecentOrders;