import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";   // same styling reuse pannalam

function OrganizerLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username: username,
          password: password,
          expected_role: "organizer",   // backend rejects non-organizers
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("role", response.data.role);

      alert("Organizer login successful!");
      navigate("/organizer/dashboard");
      window.location.reload();
    } catch (error) {
      console.error("Organizer login error:", error);

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
        <h1>Organizer Login</h1>
        <p>Login to manage your events</p>

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

          <button type="submit">Login as Organizer</button>
        </form>

        <p className="register-link">
          Are you a user? <Link to="/login">User Login</Link>
        </p>

        <p className="register-link">
          New organizer? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default OrganizerLogin;