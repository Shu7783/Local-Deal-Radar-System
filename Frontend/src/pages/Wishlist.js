import React, { useEffect, useState } from "react";

function Wishlist(){

  const [items,setItems] = useState([]);

  const email = localStorage.getItem("userEmail")?.trim().toLowerCase();

  useEffect(()=>{

    if(!email) return;

    fetch(`http://localhost:8080/favorite/${email}`)
      .then(res => res.json())
      .then(data => {

        const fixed = data.map((item,i)=>{

          // 🔥 HARD VALIDATION
          const valid =
            item.image &&
            typeof item.image === "string" &&
            item.image.startsWith("data:image") &&
            item.image.includes("base64") &&
            item.image.length > 2000;

          return {
            ...item,
            image: valid
              ? item.image
              : `https://picsum.photos/300/200?random=${i}`  // 🔥 STRONG fallback
          };
        });

        setItems(fixed);

      })
      .catch(err => console.error(err));

  },[email]);

  const handleBuy = async (item) => {
    await fetch("http://localhost:8080/order",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        email,
        dealId: item.dealId,
        title: item.title,
        price: item.price
      })
    });

    alert("Order placed ✅");
  };

  const handleRemove = async (id) => {

    await fetch(`http://localhost:8080/favorite/${id}`,{
      method:"DELETE"
    });

    setItems(items.filter(i => i.id !== id));
  };

  return(

    <div className="wishlist-container">

      <h2>❤️ My Wishlist</h2>

      {items.length === 0 && (
        <p>No items found ❌</p>
      )}

      <div className="wishlist-grid">

        {items.map((item,i)=>(
          <div key={item.id} className="wishlist-card">

            {/* 🔥 FINAL IMAGE FIX */}
            <img
              src={item.image}
              alt={item.title}
            />

            <h3>{item.title}</h3>

            <p className="price">₹{item.price}</p>

            <div className="btn-group">

              <button
                className="buy-btn"
                onClick={()=>handleBuy(item)}
              >
                Buy
              </button>

              <button
                className="remove-btn"
                onClick={()=>handleRemove(item.id)}
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>

      <style>{`

        .wishlist-container{
          padding: 20px;
        }

        .wishlist-grid{
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
          gap: 20px;
        }

        .wishlist-card{
          background: white;
          padding: 15px;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          text-align: center;
        }

        .wishlist-card img{
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 10px;
        }

        .price{
          color: green;
          font-weight: bold;
        }

        .btn-group{
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .buy-btn{
          flex:1;
          padding: 8px;
          border:none;
          border-radius:10px;
          background: linear-gradient(145deg, #00c9ff, #92fe9d);
          cursor:pointer;
        }

        .remove-btn{
          flex:1;
          padding: 8px;
          border:none;
          border-radius:10px;
          background: linear-gradient(145deg, #ff4e50, #f00000);
          color:white;
          cursor:pointer;
        }

      `}</style>

    </div>

  );
}

export default Wishlist;