import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { API_URL } from "../config";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/login/`, {
        username: username,
        password: password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("role", response.data.role);

      alert(response.data.message);

      if (response.data.role === "organizer") {
        navigate("/organizer/dashboard");
      } else {
        navigate("/");
      }
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        alert(error.response.data.error || "Login failed");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p>Login to continue using EventHub</p>

        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <p className="register-link">
          Are you an organizer?{" "}
          <Link to="/organizer/login">Organizer Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
