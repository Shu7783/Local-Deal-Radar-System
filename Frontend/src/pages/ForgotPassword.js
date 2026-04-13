import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword(){

  const [email,setEmail] = useState("");
  const [newPassword,setNewPassword] = useState("");

  const navigate = useNavigate();

  const resetPassword = async () => {

    const cleanEmail = email.trim().toLowerCase();

    if(cleanEmail === "" || newPassword === ""){
      alert("Fill all fields");
      return;
    }

    try {

      const res = await fetch(
        `http://localhost:8080/auth/forgot/reset?email=${cleanEmail}&newPassword=${newPassword}`,
        {
          method:"POST"
        }
      );

      const data = await res.text();

      if(data === "USER NOT FOUND"){
        alert("Email not registered ❌");
        return;
      }

      if(data === "SUCCESS"){
        alert("Password Updated ✅");
        navigate("/");
      } else {
        alert(data);
      }

    } catch(err){
      console.error(err);
      alert("Server error ❌");
    }

  };

  return(

    <div className="forgot-page">

      <div className="forgot-box">

        <h2>Reset Your Password</h2>

        <p>Enter your email and new password</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
        />

        <button className="reset-btn" onClick={resetPassword}>
          Reset Password
        </button>

      </div>

    </div>

  );
}

export default ForgotPassword;