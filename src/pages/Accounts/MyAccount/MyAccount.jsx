import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./accout.scss";

const MyAccount = ({ cartItems, setCartItems }) => {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userToken");
  const userData = userEmail
    ? JSON.parse(localStorage.getItem(userEmail))
    : null;

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="account-container">
      <h2>Hi {userData ? userData.firstName : "User"} 👋</h2>

      <div className="tabing">
        <div className="tabs">
          {["overview", "orders", "logout"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab ${activeTab === tab ? "active" : ""}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === "overview" && (
            <div>
              <h2 className="section-title">Recent Orders</h2>
              {cartItems.length > 0 ? (
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <h3>{item.title}</h3>
                        <p> £{item.price * item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recent orders yet.</p>
              )}

              {/* <div className="address">
                <h2 className="section-title">Add Address</h2>
                <button className="action-button">Add Address</button>
              </div> */}
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="section-title">Your Orders</h2>
              {cartItems.length > 0 ? (
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <h3>{item.title}</h3>
                        <p>Price: £{item.price * item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recent orders yet.</p>
              )}
            </div>
          )}
          {/* 
          {activeTab === "address" && (
            <div>
              <h2 className="section-title">Saved Addresses</h2>
              <p>No addresses added.</p>
              <button className="action-button">Add New Address</button>
            </div>
          )} */}

          {activeTab === "logout" && (
            <div>
              <div onClick={handleLogout} className="logout-button btn">
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
