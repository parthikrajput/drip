import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import insta from "../../assets/img/btnInstagram.svg";
import "./footer.scss";
import btnsubmit from "../../assets/img/btnSubmit.svg";

const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="column">
          <Link to="/">
            <img className="logo" src={logo} alt="" />
          </Link>
          <p>
            Unlock exclusive offers and stay updated on the latest hydration
            news by subscribing now. Join our insider community and be part of
            something special!
          </p>
          <Link to="/">
            <img src={insta} alt="" />
          </Link>
        </div>
        <div className="column">
          <p className="title">
            <b>Pages</b>
          </p>
          <ul>
            <li>
              {" "}
              <Link to="/">Home</Link>
            </li>{" "}
            <li>
              {" "}
              <Link to="/about">About</Link>
            </li>{" "}
            <li>
              {" "}
              <Link to="/contact">Contact</Link>
            </li>{" "}
            <li>
              {" "}
              <Link to="/shop">Shop</Link>
            </li>{" "}
            <li>
              {" "}
              <Link to="/science">Science</Link>
            </li>
          </ul>
        </div>
        <div className="column">
          <p className="title">
            <b>Join our community</b>
          </p>
          <p>
            Subscribe to our newsletter to get more free design courses and
            resources. We promise that do not share your information.
          </p>
          <div className="row">
            <input
              type="text"
              id="subscribe-email"
              placeholder="Enter your email"
            />
            <button id="btnSubmit" className="subscribe-btn" type="button">
              <img src={btnsubmit} alt="" />
            </button>
          </div>
          <div id="subscribe-message"></div>
        </div>
      </div>
      <p className="info center">© 2024 Drip, Inc. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
