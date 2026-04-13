import React, { useEffect, useState } from "react";

function Orders(){

  const [orders,setOrders] = useState([]);

  useEffect(()=>{

    const email = localStorage.getItem("userEmail")?.trim().toLowerCase();

    if(!email){
      alert("User not logged in ❌");
      return;
    }

    fetch(`http://localhost:8080/order/${email}`)
      .then(res => res.json())
      .then(data => {
        console.log("Orders:", data);
        setOrders(data);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
      });

  },[]);

  return (
    <div style={{padding:"20px"}}>

      <h2>Your Orders</h2>

      {orders.length === 0 && (
        <p>No orders found ❌</p>
      )}

      {orders.map((item, i)=>(
        <div key={i} style={{
          background:"#f2f2f2",
          padding:"15px",
          margin:"10px",
          borderRadius:"12px",
          boxShadow:"2px 2px 8px rgba(0,0,0,0.2)"
        }}>
          <h3>{item.title}</h3>
          <p>₹{item.price}</p>
          <p>Status: {item.status}</p>
        </div>
      ))}

    </div>
  );
}

export default Orders;