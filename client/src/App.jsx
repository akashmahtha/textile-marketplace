import { Routes, Route } from "react-router-dom";

import BuyerLayout from "./layouts/BuyerLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CategoriesPage from "./pages/CategoriesPage";
import Suppliers from "./pages/Suppliers";
import SupplierProfile from "./pages/SupplierProfile";
import About from "./pages/About";

// Buyer Pages
import BuyerDashboard from "./pages/BuyerDashboard";
import BuyerOnboarding from "./pages/BuyerOnboarding";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

// Supplier Pages
import SupplierDashboard from "./pages/SupplierDashboard";
import SupplierOnboarding from "./pages/SupplierOnboarding";
import MyProducts from "./pages/MyProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import SupplierOrders from "./pages/SupplierOrders";

function App() {

  return (

    <Routes>

      {/* ===============================
                    Login / Register
            =============================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ===============================
                    Buyer Layout
            =============================== */}

      <Route element={<BuyerLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/categories"
          element={<CategoriesPage />}
        />

        <Route
          path="/suppliers"
          element={<Suppliers />}
        />

        <Route
          path="/suppliers/:id"
          element={<SupplierProfile />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/buyer/onboarding"
          element={<BuyerOnboarding />}
        />

        <Route
          path="/buyer/dashboard"
          element={<BuyerDashboard />}
        />

        <Route
          path="/buyer/orders"
          element={<MyOrders />}
        />

        <Route
          path="/buyer/orders/:id"
          element={<OrderDetails />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

      </Route>

      {/* ===============================
                    Supplier Routes
            =============================== */}

      <Route
        path="/supplier/onboarding"
        element={<SupplierOnboarding />}
      />

      <Route
        path="/supplier/dashboard"
        element={<SupplierDashboard />}
      />

      <Route
        path="/supplier/profile"
        element={<SupplierProfile />}
      />

      <Route
        path="/supplier/my-products"
        element={<MyProducts />}
      />

      <Route
        path="/supplier/add-product"
        element={<AddProduct />}
      />

      <Route
        path="/supplier/edit-product/:id"
        element={<EditProduct />}
      />

      <Route
        path="/supplier/orders"
        element={<SupplierOrders />}
      />

    </Routes>

  );

}

export default App;