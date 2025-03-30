import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login Response:", data); 

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/"); 
      } else {
        setError(data.msg || "Invalid credentials"); 
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong");
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-wrapper">
        <div className="login-box">
          <div className="login-left">
            WELCOME <br /> BACK!
          </div>

          <div className="login-right">
            <h2>Login</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="login-button">
                Login
              </button>
            </form>

            <p className="or-continue-with-login">or continue with</p>
            <div className="google-login-container">
              <button onClick={handleGoogleLogin} className="google-button-login">
                <FaGoogle className="google-icon" />
              </button>
            </div>

            <p className="signup-link">
              Don't have an account?{" "}
              <a className="highlight-signup" href="/signup">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;