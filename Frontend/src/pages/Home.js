import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DealCard from "../components/DealCard";
import ShopDashboard from "./ShopDashboard";

function Home(){

  const [allDeals,setAllDeals] = useState([]);
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("All");
  const [showDashboard,setShowDashboard] = useState(false);
  const [loading,setLoading] = useState(false);

  /* 🔥 FETCH ALL DEALS */
  const fetchDeals = () => {

    setLoading(true);

    fetch("http://localhost:8080/deals")
      .then(res => res.json())
      .then(data => {

        if(Array.isArray(data)){
          setAllDeals(data);
        } else {
          setAllDeals([]);
        }

        setLoading(false);
      })
      .catch(err=>{
        console.error(err);
        setAllDeals([]);
        setLoading(false);
      });
  };

  /* 🔥 LOAD ON PAGE START */
  useEffect(()=>{
    fetchDeals();
  },[]);

  /* 🔥 FILTER */
  const filteredDeals = allDeals.filter(d =>
    (category === "All" || d.category === category) &&
    d.title?.toLowerCase().includes(search.toLowerCase())
  );

  return(

    <div>

      {/* 🔥 HEADER */}
     <Header
  onSearch={setSearch}
  openDashboard={()=>setShowDashboard(true)}
/>

      {/* 🔥 DASHBOARD */}
      {showDashboard && (
        <ShopDashboard
          onClose={()=>{
            setShowDashboard(false);
            fetchDeals();   // 🔥 AUTO REFRESH AFTER UPLOAD
          }}
        />
      )}

      {/* 🔥 CATEGORY */}
      <div className="category-row">

        {["All","Grocery","Vegetables","Computer","Cafe","Fashion","Footwear"]
        .map(cat=>(
          <button
            key={cat}
            className={category === cat ? "active-cat" : ""}
            onClick={()=>setCategory(cat)}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* 🔥 LOADING */}
      {loading && (
        <p className="status">Loading products... ⏳</p>
      )}

      {/* 🔥 PRODUCTS */}
      <div className="product-grid">

        {!loading && filteredDeals.length === 0 && (
          <p className="status">No products found ❌</p>
        )}

        {filteredDeals.map((deal,i) => (
          <DealCard
            key={i}
            deal={{
              ...deal,
              image: deal.image && deal.image !== ""
                ? deal.image
                : `https://source.unsplash.com/300x200/?product&sig=${i}`
            }}
          />
        ))}

      </div>

      {/* 🔥 CSS */}
      <style>{`

        .category-row{
          display:flex;
          justify-content:center;
          gap:12px;
          padding:15px;
          flex-wrap:wrap;
        }

        .category-row button{
          padding:10px 16px;
          border:none;
          border-radius:20px;
          background:#333;
          color:white;
          cursor:pointer;
          transition:0.2s;
        }

        .category-row button:hover{
          transform:scale(1.05);
        }

        .active-cat{
          background:#00c9ff;
        }

        .product-grid{
          display:grid;
          grid-template-columns: repeat(auto-fill,minmax(220px,1fr));
          gap:20px;
          padding:20px;
        }

        .status{
          text-align:center;
          font-size:18px;
          margin-top:10px;
          color:red;
        }

      `}</style>

    </div>
  );
}

export default Home;