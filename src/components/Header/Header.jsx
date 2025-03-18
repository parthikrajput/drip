import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import logo from "../../assets/img/logo.png";
import "./header.scss";
import user from "../../assets/img/btnProfile.svg";
import cart from "../../assets/img/btnCart.svg";
import menu from "../../assets/img/btnBurgerMenu.svg";
import close from "../../assets/img/btnCloseMenu.svg";
import deletebtn from "../../assets/img/delete.svg";

const Header = ({ cartItems, setCartItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const headerRef = useRef(null);
  const cartDropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Sync cart data with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target) &&
        !event.target.closest(".min-card")
      ) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setCartOpen(false); // Ensure cart closes when navigating
  }, [location]);

  // Animate header height based on menu state
  useEffect(() => {
    const updateHeight = () => {
      const screenWidth = window.innerWidth;
      if (menuOpen) {
        gsap.to(headerRef.current, {
          height: "100vh",
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(headerRef.current, {
          height: screenWidth > 1080 ? "100px" : "60px",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [menuOpen]);

  // Increase quantity of an item in the cart
  const increaseQuantity = (index) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Decrease quantity but not below 1
  const decreaseQuantity = (index) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Delete an item from the cart
  const handleDelete = (index) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Calculate cart subtotal
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Navigate to Profile or Login, ensuring smooth transition
  const handleProfileClick = () => {
    setCartOpen(false); // Close cart before navigating
    setTimeout(() => {
      navigate(localStorage.getItem("userToken") ? "/my" : "/login");
    }, 10);
  };

  return (
    <>
      <header ref={headerRef} className={menuOpen ? "menu-open" : ""}>
        <div className="h-wrapper">
          <nav>
            <ul>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/about">about</Link>
              </li>
              <li>
                <Link className="mobile" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/shop">shop</Link>
              </li>
              <li>
                <Link className="mobile" to="/science">
                  Science
                </Link>
              </li>
            </ul>
          </nav>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="drip logo" />
            </Link>
          </div>
          <div className="menu-right">
            <div className="user-profile" onClick={handleProfileClick}>
              <img src={user} alt="user" />
            </div>
            <div className="cart" ref={cartDropdownRef}>
              <div onClick={() => setCartOpen((prev) => !prev)}>
                <img src={cart} alt="cart" />
              </div>
            </div>
            <div className="buy">
              <Link to="/shop">Buy Now</Link>
            </div>
          </div>
          <div
            className="menu-icon"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <img src={menuOpen ? close : menu} alt="menu" />
          </div>
        </div>
      </header>

      {cartOpen && (
        <div className="min-card">
          <div className="cart-dropdown">
            <div className="close-menu" onClick={() => setCartOpen(false)}>
              ✖
            </div>
            <h1>Your cart</h1>
            {cartItems.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
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
                      <div className="quantity-control">
                        <button onClick={() => decreaseQuantity(index)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(index)}>
                          +
                        </button>
                      </div>
                      <img
                        src={deletebtn}
                        alt="Delete"
                        className="delete"
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="end-total">
              <h2>
                Subtotal: <span>£{cartSubtotal.toFixed(2)}</span>
              </h2>
              <Link to="/checkout" className="view-cart-btn btn">
                checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
