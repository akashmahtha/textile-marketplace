import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../services/authService";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

            const res = await login(formData);

            localStorage.setItem("token", res.data.token);

            localStorage.setItem("role", res.data.user.role);

            localStorage.setItem(
                "profileCompleted",
                res.data.user.profileCompleted
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            toast.success("Login Successful");

            // =========================
            // Buyer
            // =========================

            if (res.data.user.role === "buyer") {

                if (!res.data.user.profileCompleted) {

                    navigate("/buyer/onboarding");

                } else {

                    navigate("/buyer/dashboard");

                }

            } else if (res.data.user.role === "supplier") {

                if (!res.data.user.profileCompleted) {

                    navigate("/supplier/onboarding");

                } else {

                    navigate("/supplier/dashboard");

                }

            }


        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Login
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Email"
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
                                        placeholder="Enter Password"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Please Wait..."
                                        : "Login"}
                                </button>

                            </form>

                            <p className="text-center mt-3">

                                Don't have an account?

                                <Link to="/register">
                                    {" "}
                                    Register
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;