import { Link } from "react-router-dom";
import {
    FaStore,
    FaPhone,
    FaEnvelope,
} from "react-icons/fa";

const SupplierCard = ({ supplier }) => {

    return (

        <div className="col-lg-4 col-md-6 mb-4">

            <div className="card border-0 shadow h-100">

                <div className="card-body text-center">

                    <div
                        className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{
                            width: "90px",
                            height: "90px",
                            fontSize: "40px",
                        }}
                    >

                        <FaStore />

                    </div>

                    <h4 className="fw-bold">

                        {supplier.name}

                    </h4>

                    <p className="text-muted">

                        {supplier.email}

                    </p>

                    <p>

                        <FaPhone /> {supplier.phone || "N/A"}

                    </p>

                    <Link
                        to={`/suppliers/${supplier._id}`}
                        className="btn btn-warning w-100"
                    >

                        View Profile

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default SupplierCard;