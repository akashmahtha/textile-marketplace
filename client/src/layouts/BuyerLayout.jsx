import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AIChat from "../components/AIChat";

const BuyerLayout = () => {

    return (

        <>

            <Navbar />

            <Outlet />

            <Footer />

            <AIChat />

        </>

    );

};

export default BuyerLayout;