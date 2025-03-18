import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login.scss";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      errors.password = "Password is required.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const storedUser = JSON.parse(localStorage.getItem(email));

    if (!storedUser) {
      setErrors({ email: "No account found! Please sign up first." });
      return;
    }

    if (storedUser.password === password) {
      if (rememberMe) {
        localStorage.setItem("rememberedUser", email);
      } else {
        localStorage.removeItem("rememberedUser");
      }

      localStorage.setItem("userToken", storedUser.email);
      navigate("/my");
    } else {
      setErrors({ password: "Incorrect password!" });
    }
  };

  return (
    <div className="login-page">
      <div className="left-img"></div>

      <div className="auth-container">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <div className="i-fild">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="i-fild">
            <label htmlFor="password">Password</label>
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

          <div className="remider">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button className="btn" type="submit">
            Sign In
          </button>
        </form>
        <div className="login-other">
          <p>Don't have an account?</p>
          <Link to="/register">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
