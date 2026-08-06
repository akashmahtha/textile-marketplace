import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../services/authService";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "buyer",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const res = await register(formData);

            toast.success(res.data.message);

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Registration Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Create Account
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label>Name</label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Password</label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label>Account Type</label>

                                    <select
                                        className="form-select"
                                        name="role"
                                        onChange={handleChange}
                                    >
                                        <option value="buyer">
                                            Buyer
                                        </option>

                                        <option value="supplier">
                                            Supplier
                                        </option>

                                    </select>

                                </div>

                                <button
                                    className="btn btn-warning w-100"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Creating..."
                                        : "Register"}

                                </button>

                            </form>

                            <p className="text-center mt-3">

                                Already have an account?

                                <Link to="/login">
                                    {" "}
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default Register;