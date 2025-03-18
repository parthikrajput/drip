import React, { useState } from "react";
import "../login.scss";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};

    if (!firstName.trim()) errors.firstName = "First name is required.";
    if (!lastName.trim()) errors.lastName = "Last name is required.";
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format.";
    }
    if (!password.trim()) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (!termsAccepted) errors.terms = "You must accept the terms.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if validation fails

    if (localStorage.getItem(email)) {
      setErrors({ email: "Account already exists! Please log in." });
      return;
    }

    const userData = { firstName, lastName, email, password };
    localStorage.setItem(email, JSON.stringify(userData));

    alert("Signup successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="login-page">
      <div className="left-img"></div>
      <div className="auth-container">
        <h2>Your Best Work Starts Here</h2>
        <form onSubmit={handleSignup}>
          <div className="i-fild">
            <label>What should we call you?</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div className="i-fild">
            <label>Last name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
          <div className="i-fild">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="i-fild">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="showpassword"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="remider">
            <div className="remember-me">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <label>
                By signing up, you agree to Drip’s
                <Link to=""> Terms of Use and Privacy Policy.</Link>
              </label>
            </div>
            {errors.terms && <p className="error">{errors.terms}</p>}
          </div>

          <button className="btn" type="submit">
            Signup
          </button>
        </form>

        <div className="login-other">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
