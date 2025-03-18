import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/img/logoMask.png";
import { Link } from "react-router-dom";
import "./checkout.scss";
import shop from "../../assets/img/shop.svg";
import gpay from "../../assets/img/dark_gpay.svg";

const CheckOut = ({ cartItems, setCartItems }) => {
  // Calculate cart subtotal
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    receiveNews: false,
    country: "",
    state: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pinCode: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  // Fetch all countries from an API
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(countryNames);
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (formData.country) {
      fetch(`https://countriesnow.space/api/v0.1/countries/states`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: formData.country }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.states) {
            setStates(data.data.states.map((state) => state.name));
          } else {
            setStates([]);
          }
        })
        .catch((err) => console.error("Error fetching states:", err));
    }
  }, [formData.country]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.emailOrPhone)
      newErrors.emailOrPhone = "Email or Phone is required";
    if (!formData.country) newErrors.country = "Please select a country";
    if (!formData.state) newErrors.state = "Please select a state";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pinCode) newErrors.pinCode = "Pin code is required";
    if (!formData.mobileNumber)
      newErrors.mobileNumber = "Mobile number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Order placed successfully!");
      navigate("/order-confirmation");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-wrapper">
        <div className="checkout-header">
          <Link to="/" className="logo">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="checkout-body">
          <div className="checkout-fill">
            <div className="or-payment">
              <p>Express checkout</p>
              <div className="btns">
                <Link className="shop" to="">
                  <img src={shop} alt="" />
                </Link>
                <Link className="gpay" to="">
                  <img src={gpay} alt="" />
                </Link>
              </div>
            </div>
            <div className="or">
              <p>or</p>
            </div>
            <div className="checkout-container">
              <form onSubmit={handleSubmit}>
                {/* Contact Section */}
                <h2>Contact</h2>
                <div className="fild">
                  <input
                    type="text"
                    name="emailOrPhone"
                    value={formData.emailOrPhone}
                    onChange={handleChange}
                    placeholder="Email or Phone"
                  />
                  {errors.emailOrPhone && (
                    <p className="error">{errors.emailOrPhone}</p>
                  )}
                </div>

                <label>
                  <input
                    type="checkbox"
                    name="receiveNews"
                    checked={formData.receiveNews}
                    onChange={handleChange}
                  />
                  Email me with news and offers
                </label>

                {/* Delivery Section */}
                <h2>Delivery</h2>
                <div className="fild">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.country && <p className="error">{errors.country}</p>}
                </div>

                <div className="f-fild">
                  <div className="fild">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                    {errors.firstName && (
                      <p className="error">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="fild">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                    {errors.lastName && (
                      <p className="error">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="fild">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                  {errors.address && <p className="error">{errors.address}</p>}
                </div>
                <div className="f-select">
                  <div className="fild">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                  </div>
                  <div className="fild">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      <option value="">Select State</option>
                      {states.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && <p className="error">{errors.state}</p>}
                  </div>
                  <div className="fild">
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      placeholder="Pin Code"
                    />
                    {errors.pinCode && (
                      <p className="error">{errors.pinCode}</p>
                    )}
                  </div>
                </div>
                {/* Shipping Section */}
                <h2>Shipping Method</h2>
                <div className="method">
                  <p>International</p>
                  <div className="shipping-box">Free </div>
                </div>

                {/* Payment Section */}
                {/* <h2>Payment Method</h2>
                <p>All transactions are secure and encrypted.</p>
                <div className="payment-box">
                  <div className="model-box">
                    <p>Credit card</p>
                  </div>
                </div> */}

                {/* Remember Me */}
                <h2>Remember Me</h2>
                <div className="fild">
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                  />
                  {errors.mobileNumber && (
                    <p className="error">{errors.mobileNumber}</p>
                  )}
                </div>

                {/* Pay Now Button */}
                <button type="submit" className="pay-btn btn">
                  Pay Now
                </button>
              </form>
            </div>
          </div>
          <div className="checkout-product">
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <div className="pr-item">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <p>{item.title}</p>
                      {/* <p>{item.color}</p> */}
                    </div>
                  </div>
                  <p>£{item.price * item.quantity}</p>
                </li>
              ))}
            </ul>
            <p className="free">
              Shipping <span>Free</span>
            </p>
            <p className="total">
              Subtotal: <span>£{cartSubtotal.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
