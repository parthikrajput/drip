import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login.scss"; // Use your existing styles
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};

    if (!newPassword.trim()) {
      errors.newPassword = "New password is required.";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters.";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (confirmPassword !== newPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Store new password in localStorage (Mock Reset)
    localStorage.setItem("userPassword", JSON.stringify(newPassword));

    setSuccessMessage("Password reset successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="login-page">
      <div className="left-img"></div>

      <div className="auth-container">
        <div className="content">
          <h2>Reset Your Password</h2>
          <p>Enter your new password below.</p>
        </div>
        <form onSubmit={handleResetPassword}>
          <div className="i-fild">
            <label htmlFor="newPassword">New Password</label>
            <div className="password-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div
                className="showpassword"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.newPassword && (
              <p className="error">{errors.newPassword}</p>
            )}
          </div>

          <div className="i-fild">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="showpassword"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>

          <button className="btn" type="submit">
            Reset Password
          </button>

          {successMessage && <p className="success">{successMessage}</p>}
        </form>
        <div className="login-other">
          <p>Already have an account?</p> <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
