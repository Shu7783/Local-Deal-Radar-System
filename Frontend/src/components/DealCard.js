import React, { useEffect, useState } from "react";

// 🔥 ADD THIS
import MapView from "../pages/MapView";

function DealCard({ deal }) {

  const email = localStorage.getItem("userEmail")?.trim().toLowerCase();

  const [timeLeft,setTimeLeft] = useState("");

  const offerEndTime = Number(deal.offerEndTime || 0);
  const originalPrice = Number(deal.originalPrice || 0);
  const offerPrice = Number(deal.offerPrice || 0);

  useEffect(()=>{

    if(offerEndTime <= 0) return;

    const interval = setInterval(()=>{

      const now = new Date().getTime();
      const diff = offerEndTime - now;

      if(diff <= 0){
        setTimeLeft("Expired ❌");
        clearInterval(interval);
      } else {
        const h = Math.floor(diff/(1000*60*60));
        const m = Math.floor((diff%(1000*60*60))/(1000*60));
        const s = Math.floor((diff%(1000*60))/1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }

    },1000);

    return ()=>clearInterval(interval);

  },[offerEndTime]);

  const isOfferActive =
    offerEndTime > new Date().getTime();

  const finalPrice =
    isOfferActive ? offerPrice : originalPrice;

  const handleBuy = async () => {

    if(!email){
      alert("Login first ❌");
      return;
    }

    await fetch("http://localhost:8080/order",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        email,
        dealId: deal.id,
        title: deal.title,
        price: finalPrice
      })
    });

    alert("Order placed ✅");
  };

  const handleFavorite = async () => {

    if(!email){
      alert("Login first ❌");
      return;
    }

    await fetch("http://localhost:8080/favorite",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        email,
        dealId: deal.id,
        title: deal.title,
        price: finalPrice,
        image: deal.image
      })
    });

    alert("Added to Wishlist ❤️");
  };

  return (
    <div className="product-card">

      {isOfferActive && (
        <span className="badge">🔥 HOT DEAL</span>
      )}

      <img src={deal.image} alt="" />

      <h3>{deal.title}</h3>

      <p className="category">{deal.category}</p>

      {isOfferActive ? (
        <>
          <p className="old">₹{originalPrice}</p>
          <p className="new">₹{offerPrice}</p>
          <p className="timer">⏳ {timeLeft}</p>
        </>
      ) : (
        <p className="new">₹{originalPrice}</p>
      )}

      {/* 🔥 MAP ADDED HERE */}
      <MapView lat={deal.latitude} lng={deal.longitude} />

      <div className="btn-group">

        <button className="buy-btn" onClick={handleBuy}>
          🛒 Buy
        </button>

        <button className="fav-btn" onClick={handleFavorite}>
          ❤️
        </button>

      </div>

      <style>{`

        .product-card{
          position:relative;
          padding:15px;
          border-radius:15px;
          background:white;
          box-shadow:0 10px 25px rgba(0,0,0,0.2);
          text-align:center;
          transition:0.3s;
        }

        .product-card:hover{
          transform: translateY(-8px);
        }

        .product-card img{
          width:100%;
          height:150px;
          object-fit:cover;
          border-radius:10px;
        }

        .badge{
          position:absolute;
          top:10px;
          left:10px;
          background:linear-gradient(145deg,#ff4e50,#f00000);
          color:white;
          padding:5px 10px;
          border-radius:10px;
          font-size:12px;
        }

        .category{
          color:#555;
        }

        .old{
          text-decoration:line-through;
          color:gray;
        }

        .new{
          color:green;
          font-weight:bold;
          font-size:18px;
        }

        .timer{
          color:red;
          font-size:13px;
        }

        .btn-group{
          display:flex;
          gap:10px;
          margin-top:10px;
        }

        button{
          flex:1;
          padding:10px;
          border:none;
          border-radius:12px;
          cursor:pointer;
          font-weight:bold;
          transition:0.2s;
          box-shadow:5px 5px 15px rgba(0,0,0,0.3);
        }

        .buy-btn{
          background:linear-gradient(145deg,#00c9ff,#92fe9d);
        }

        .buy-btn:hover{
          transform:translateY(-3px) scale(1.05);
        }

        .fav-btn{
          background:linear-gradient(145deg,#ff4e50,#f00000);
          color:white;
        }

        .fav-btn:hover{
          transform:translateY(-3px) scale(1.1);
        }

        button:active{
          transform:translateY(2px);
        }

      `}</style>

    </div>
  );
}

export default DealCard;