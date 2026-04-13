import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ onSearch, openDashboard }) {
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail");
  const role = (localStorage.getItem("role") || "").toLowerCase();

  const [search, setSearch] = useState("");

  return (
    <div className="navbar">
      {/* LEFT */}
      <h2 className="logo" onClick={() => navigate("/home")}>
        DealRadar
      </h2>

      {/* CENTER */}
      <div className="search-box">
        <input
          placeholder="Search deals..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch && onSearch(e.target.value);
          }}
        />
        <span className="icon">🔍</span>
      </div>

      {/* RIGHT */}
      <div className="profile">
        <div className="profile-btn">
          👤 {email || "Guest"} ⌄
        </div>

        <div className="dropdown">
          <button onClick={() => navigate("/profile")}>My Profile</button>

          <button onClick={() => navigate("/orders")}>Orders</button>

          <button onClick={() => navigate("/wishlist")}>Wishlist</button>

          {role === "shop" && (
            <button onClick={openDashboard}>Upload Product</button>
          )}

          <hr />

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* DASHBOARD BUTTON */}
      {role === "shop" && (
        <button className="dashboard-btn" onClick={openDashboard}>
          Dashboard
        </button>
      )}

      <style>{`
        .navbar {
          background: linear-gradient(135deg, #2f6fd6, #3d7be0);
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 0 40px;
          color: white;
          box-sizing: border-box;
        }

        .logo {
          cursor: pointer;
          font-size: 24px;
          margin: 0;
          white-space: nowrap;
          flex: 0 0 auto;
        }

        .search-box {
          position: relative;
          flex: 0 1 550px;
          max-width: 550px;
          min-width: 260px;
        }

        .search-box input {
          width: 100%;
          padding: 10px 40px 10px 15px;
          border-radius: 8px;
          border: none;
          outline: none;
          box-sizing: border-box;
        }

        .icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #2f6fd6;
        }

        .profile {
          position: relative;
          flex: 0 0 auto;
        }

        .profile-btn {
          background: linear-gradient(145deg, #ff7a18, #ffb347);
          padding: 10px 15px;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 4px 4px 10px rgba(0,0,0,0.3);
          white-space: nowrap;
        }

        .profile:hover .dropdown {
          display: flex;
        }

        .dropdown {
          display: none;
          position: absolute;
          top: 60px;
          right: 0;
          width: 220px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          flex-direction: column;
          padding: 10px 0;
          z-index: 999;
        }

        .dropdown button {
          background: linear-gradient(145deg, #6a11cb, #2575fc);
          border: none;
          margin: 5px 10px;
          padding: 10px;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          text-align: left;
          box-shadow: 3px 3px 8px rgba(0,0,0,0.3);
          transition: 0.2s;
        }

        .dropdown button:hover {
          transform: translateY(-2px);
        }

        .dropdown button:active {
          transform: translateY(2px);
        }

        hr {
          margin: 8px 0;
        }

        .dashboard-btn {
          background: linear-gradient(145deg, #00c9ff, #92fe9d);
          border: none;
          width: 220px;          /* FIXED WIDTH */
          min-width: 220px;      /* NO SHRINK */
          max-width: 220px;      /* NO GROW */
          height: 44px;
          padding: 0 18px;
          border-radius: 14px;
          font-weight: bold;
          cursor: pointer;
          color: black;
          box-shadow: 4px 4px 10px rgba(0,0,0,0.3);
          flex: 0 0 220px;       /* MAIN FIX */
          white-space: nowrap;
        }

        @media (max-width: 1100px) {
          .navbar {
            padding: 0 20px;
            gap: 12px;
          }

          .search-box {
            flex-basis: 380px;
            max-width: 380px;
          }

          .dashboard-btn {
            width: 180px;
            min-width: 180px;
            max-width: 180px;
            flex-basis: 180px;
          }
        }
      `}</style>
    </div>
  );
}

export default Header;