import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login.scss"; // Use your existing styles

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!termsAccepted) {
      errors.terms = "You must accept the Terms of Use and Privacy Policy.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleResetRequest = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const storedUser = JSON.parse(localStorage.getItem(email));

    if (!storedUser) {
      setErrors({ email: "No account found with this email!" });
      return;
    }

    setSuccessMessage("Password reset link sent. Please check your email.");
    setTimeout(() => {
      navigate("/reset-password");
    }, 3000);
  };

  return (
    <div className="login-page">
      <div className="left-img"></div>

      <div className="auth-container">
        <div className="content">
          <h2>Forgot Password</h2>
          <p>
            We’ll email you instructions to reset your password. If you don’t
            have access to your email anymore, you can try account recovery.
          </p>
        </div>
        <form onSubmit={handleResetRequest}>
          <div className="i-fild">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="remider">
            <div className="remember-me">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <label htmlFor="terms">
                I agree to the <Link>Terms of Use</Link> and{" "}
                <Link>Privacy Policy</Link>.
              </label>
            </div>
            {errors.terms && <p className="error">{errors.terms}</p>}
          </div>

          <button className="btn" type="submit">
            Submit
          </button>

          {successMessage && <p className="success">{successMessage}</p>}
        </form>
        <div className="login-other">
          <p>Don’t have an account yet?</p>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
