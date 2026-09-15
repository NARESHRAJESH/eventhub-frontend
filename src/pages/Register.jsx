import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { API_URL } from "../config";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/register/`, {
        username: username,
        email: email,
        password: password,
        role: role,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("role", response.data.role);

      alert("Registration successful! You are now logged in.");

      // role-based redirect
      if (response.data.role === "organizer") {
        navigate("/organizer/dashboard");
      } else {
        navigate("/");
      }
      window.location.reload();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "Registration failed");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h1>Create Account</h1>
        <p>Join EventHub and discover amazing events.</p>

        <form onSubmit={handleRegister}>
          <label>I am registering as:</label>
          <div className="role-options">
            <label className="role-option">
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span>A User (book tickets)</span>
            </label>

            <label className="role-option">
              <input
                type="radio"
                name="role"
                value="organizer"
                checked={role === "organizer"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span>An Organizer (host events)</span>
            </label>
          </div>

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <button type="submit">Create Account</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
