import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔥 ADD THIS LINE (IMPORTANT FOR MAP)
import "leaflet/dist/leaflet.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ShopDashboard from "./pages/ShopDashboard";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot" element={<ForgotPassword />} />

        <Route path="/shop-dashboard" element={<ShopDashboard />} />

        {/* 🔥 PROFILE */}
        <Route path="/profile" element={<Profile />} />

        {/* 🔥 WISHLIST */}
        <Route path="/wishlist" element={<Wishlist />} />

      </Routes>

    </Router>
  );
}

export default App;