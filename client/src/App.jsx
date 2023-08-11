import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./layouts/Navbar/Navbar";
import PageNotFound from "./pages/Root/404/PageNotFound";
import Loading from "./components/Models/Loading/Loading";

// Import your components lazily
const Home = React.lazy(() => import("./pages/Root/home/Home"));
const About = React.lazy(() => import("./pages/Root/about/About"));
const AdminLogin = React.lazy(() => import("./pages/User/admin/login/AdminLogin"));
const EmpLogin = React.lazy(() => import("./pages/User/employee/login/EmpLogin"));
const EmpRegister = React.lazy(() => import("./pages/User/employee/register/EmpRegister"));
const AdminRegister = React.lazy(() => import("./pages/User/admin/register/AdminRegister"));
const Dashboard = React.lazy(() => import("./pages/Main/dashboard/Dashboard"));
const AdminDashboard = React.lazy(() => import("./pages/Main/adminDashboard/AdminDashboard"));
const Cart = React.lazy(() => import("./pages/Main/cart/Cart"));
const Payment = React.lazy(() => import("./pages/Main/payment/Payment"));

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/emp" element={<EmpLogin />} />
            <Route path="/register/emp" element={<EmpRegister />} />
            <Route path="/register/admin" element={<AdminRegister />} />

            {/* ============== Protected Route ======== */}
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/user/payment" element={<Payment />} />

            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
