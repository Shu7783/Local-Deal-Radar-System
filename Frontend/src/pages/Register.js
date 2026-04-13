import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [role, setRole] = useState("");

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [shopName,setShopName] = useState("");
  const [mobile,setMobile] = useState(""); 

  const [success,setSuccess] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = () => {

    if(name === "" || email === "" || password === ""){
      alert("Please fill required fields");
      return;
    }

    if(!validateEmail(email)){
      alert("Enter valid email");
      return;
    }

    if(role === "shop" && shopName === ""){
      alert("Enter shop name");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    fetch("http://localhost:8080/auth/register", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,
        email: cleanEmail,
        password,
        role,
        shopName,
        mobile
      })
    })
    .then(res => res.text())   // 🔥 FIX (json → text)
    .then(data => {

      console.log("Server Response:", data);

      if(data.includes("SUCCESS")){

        setSuccess("Registration Successful ✅");

        // 🔥 SAVE USER (IMPORTANT)
        localStorage.setItem("userEmail", cleanEmail);
        localStorage.setItem("role", role);

        setTimeout(() => {
          navigate("/home");
        }, 1000);

      } else {
        alert(data); // backend message show
      }

    })
    .catch(() => {
      alert("Registration failed ❌");
    });

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>Register</h2>

        {success && (
          <p style={{color:"green", fontWeight:"bold"}}>
            {success}
          </p>
        )}

        {role === "" && (
          <div>

            <button
              className="nav-btn"
              onClick={() => setRole("customer")}
            >
              Register as Customer
            </button>

            <button
              className="nav-btn"
              onClick={() => setRole("shop")}
            >
              Register as Shopkeeper
            </button>

          </div>
        )}

        {role !== "" && (
          <div>

            <input
              placeholder="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e)=>setMobile(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            {role === "shop" && (
              <input
                placeholder="Shop Name"
                value={shopName}
                onChange={(e)=>setShopName(e.target.value)}
              />
            )}

            <button
              className="upload-btn"
              onClick={handleRegister}
            >
              Register
            </button>

          </div>
        )}

      </div>

    </div>

  );
}

export default Register;