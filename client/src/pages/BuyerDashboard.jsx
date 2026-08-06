import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

import OrderSummary from "../components/OrderSummary";
import ProfileInfo from "../components/ProfileInfo";
import RecentOrders from "../components/RecentOrders";
import OrderStatus from "../components/OrderStatus";
import QuickActions from "../components/QuickActions";

import {
    getBuyerDashboard,
    getBuyerProfile,
} from "../services/buyerService";

import "./BuyerDashboard.css";

const BuyerDashboard = () => {

    const [dashboard, setDashboard] = useState({});

    const [profile, setProfile] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const profileRes =
                await getBuyerProfile();

            const dashboardRes =
                await getBuyerDashboard();

            setProfile(profileRes.data.buyer);

            setDashboard(dashboardRes.data.dashboard);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <>
                {/* <Navbar /> */}

                <div className="container py-5 text-center">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>

                    <h5 className="mt-3">

                        Loading Dashboard...

                    </h5>

                </div>

                {/* <Footer /> */}

            </>

        );

    }

    return (

        <>

            {/* <Navbar /> */}

            <div className="buyer-dashboard py-5">

                <div className="container">

                    {/* Header */}

                    <div className="dashboard-header mb-5">

                        <h2 className="fw-bold">

                            Buyer Dashboard

                        </h2>

                        <p className="text-muted">

                            Welcome back,

                            <strong>

                                {" "}

                                {profile.name}

                            </strong>

                        </p>

                    </div>

                    {/* Dashboard Summary */}

                    <OrderSummary
                        dashboard={dashboard}
                    />

                    {/* Profile + Recent Orders */}

                    <div className="row mt-4">

                        <div className="col-lg-4 mb-4">

                            <ProfileInfo
                                profile={profile}
                            />

                        </div>

                        <div className="col-lg-8">

                            <RecentOrders
                                orders={
                                    dashboard.recentOrders || []
                                }
                            />

                        </div>

                    </div>

                    {/* Order Status + Quick Actions */}

                    <div className="row mt-4">

                        <div className="col-lg-8 mb-4">

                            <OrderStatus
                                orders={
                                    dashboard.recentOrders || []
                                }
                            />

                        </div>

                        <div className="col-lg-4">

                            <QuickActions />

                        </div>

                    </div>

                </div>

            </div>

            {/* <Footer /> */}

        </>

    );

};

export default BuyerDashboard;