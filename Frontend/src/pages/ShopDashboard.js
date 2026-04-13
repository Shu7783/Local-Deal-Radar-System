import React, { useState } from "react";

function ShopDashboard({ onClose }) {

  const [title, setTitle] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Grocery");
  const [address, setAddress] = useState("");

  // 🔥 IMAGE (NO LIMIT)
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {

    // 🔥 BASIC VALIDATION
    if (!title || !address || !originalPrice || !offerPrice || !endTime) {
      alert("Please fill all fields ❌");
      return;
    }

    // 🔥 PRICE CHECK
    if (parseFloat(offerPrice) > parseFloat(originalPrice)) {
      alert("Offer price cannot be greater ❌");
      return;
    }

    try {

      let lat = 0;
      let lng = 0;

      // 🔥 GEO LOCATION
      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
        );
        const geoData = await geoRes.json();

        if (geoData.length > 0) {
          lat = parseFloat(geoData[0].lat);
          lng = parseFloat(geoData[0].lon);
        }
      } catch {
        console.log("Geo skipped");
      }

      // 🔥 TIME
      const parsedTime = Date.parse(endTime);
      if (isNaN(parsedTime)) {
        alert("Invalid time ❌");
        return;
      }

      // 🔥 API CALL
      const res = await fetch("http://localhost:8080/deals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          category,
          originalPrice: parseFloat(originalPrice),
          offerPrice: parseFloat(offerPrice),
          offerEndTime: parsedTime,
          image,
          address,
          latitude: lat,
          longitude: lng
        })
      });

      const data = await res.json().catch(() => null);

      console.log("SERVER RESPONSE 👉", data);

      if (!res.ok || (data && data.status === "ERROR")) {
        throw new Error(data?.message || "Upload failed");
      }

      alert("Uploaded Successfully ✅");

      // 🔥 RESET
      setTitle("");
      setAddress("");
      setOriginalPrice("");
      setOfferPrice("");
      setEndTime("");
      setImage("");

      if (onClose) onClose();

    } catch (err) {
      console.error(err);
      alert("Error ❌ → " + err.message);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="box" onClick={(e) => e.stopPropagation()}>

        <h2>🚀 Upload Product</h2>

        <input
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Shop Address (e.g. Mithapur, Patna)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="options">
          {["Grocery","Vegetables","Computer","Cafe","Fashion","Footwear"]
            .map(cat => (
              <div
                key={cat}
                className={category === cat ? "option active" : "option"}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </div>
            ))}
        </div>

        <input
          type="number"
          placeholder="Original Price"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Offer Price"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
        />

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <input type="file" onChange={handleImage} />

        {image && (
          <img src={image} alt="preview" className="preview" />
        )}

        <div className="btn-group">
          <button className="upload-btn" onClick={handleUpload}>
            Upload 🚀
          </button>

          <button className="close-btn" onClick={onClose}>
            Close ❌
          </button>
        </div>

      </div>

      <style>{`
        .overlay{
          position:fixed;
          top:0; left:0;
          width:100%; height:100%;
          background:rgba(0,0,0,0.6);
          display:flex;
          justify-content:center;
          align-items:center;
        }

        .box{
          width:500px;
          max-height:90vh;
          overflow-y:auto;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(15px);
          padding:30px;
          border-radius:20px;
          display:flex;
          flex-direction:column;
          gap:15px;
          color:white;
        }

        input{
          padding:12px;
          border:none;
          border-radius:12px;
          background: rgba(255,255,255,0.2);
          color:white;
          outline:none;
        }

        .options{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:10px;
        }

        .option{
          padding:10px;
          border-radius:10px;
          text-align:center;
          background: rgba(255,255,255,0.2);
          cursor:pointer;
          transition:0.2s;
        }

        .option:hover{
          transform:scale(1.05);
        }

        .active{
          background:#92fe9d;
          color:black;
          font-weight:bold;
        }

        .preview{
          width:100%;
          height:120px;
          object-fit:cover;
          border-radius:10px;
        }

        .btn-group{
          display:flex;
          gap:12px;
        }

      `}</style>

    </div>
  );
}

export default ShopDashboard;