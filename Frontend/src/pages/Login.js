import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = () => {

    if(email === "" || password === ""){
      alert("Enter email and password");
      return;
    }

    fetch("http://localhost:8080/auth/login", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.text())
    .then(data => {

      console.log("Server Response:", data);

      if(data === "SUCCESS"){

        // 🔥 IMPORTANT FIX
        const cleanEmail = email.trim().toLowerCase();

        localStorage.setItem("userEmail", cleanEmail);  // ✅ SAME KEY AS HEADER
        localStorage.setItem("role", "shop");

        alert("Login Successful ✅");

        navigate("/home");

      } else {
        alert("Invalid credentials ❌");
      }

    })
    .catch((err) => {
      console.error(err);
      alert("Server error 🚨");
    });

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>DealRadar Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <div className="login-links">

          <Link to="/register">
            Register
          </Link>

          <Link to="/forgot">
            Forgot Password?
          </Link>

        </div>

      </div>

    </div>

  );

};

export default Login;