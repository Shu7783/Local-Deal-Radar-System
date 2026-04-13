import React, { useState, useEffect } from "react";

function Profile(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [shopName,setShopName] = useState("");
  const [mobile,setMobile] = useState("");
  const [address,setAddress] = useState("");
  const [image,setImage] = useState(null);
  const [preview,setPreview] = useState("");

  useEffect(()=>{
    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);
  },[]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const updateProfile = async () => {

    if(name === "" || shopName === ""){
      alert("Fill required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("shopName", shopName);
    formData.append("mobile", mobile);
    formData.append("address", address);
    formData.append("image", image);

    const res = await fetch("http://localhost:8080/auth/update",{
      method:"POST",
      body: formData
    });

    const data = await res.text();
    alert(data);
  };

  return(

    <div className="profile-container">

      <div className="profile-card">

        <h2>👤 My Profile</h2>

        {/* 🔥 PROFILE PIC */}
        <div className="profile-pic">
          {preview ? (
            <img src={preview} alt="profile"/>
          ) : (
            <div className="placeholder">Upload</div>
          )}
          <input type="file" onChange={handleImage}/>
        </div>

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input value={email} disabled />

        <input
          placeholder="Shop Name"
          value={shopName}
          onChange={(e)=>setShopName(e.target.value)}
        />

        <input
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
        />

        <button onClick={updateProfile}>
          Update Profile
        </button>

      </div>

      {/* CSS */}
      <style>{`

        .profile-container{
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .profile-card{
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          width: 350px;
          text-align: center;
        }

        .profile-pic{
          margin-bottom: 15px;
        }

        .profile-pic img{
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
        }

        .placeholder{
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
        }

        input, textarea{
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border-radius: 10px;
          border: 1px solid #ccc;
          outline: none;
        }

        textarea{
          height: 60px;
          resize: none;
        }

        /* 🔥 3D BUTTON */
        button{
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(145deg, #ff7a18, #ffb347);
          color: white;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 4px 4px 10px rgba(0,0,0,0.3);
        }

      `}</style>

    </div>

  );

}

export default Profile;