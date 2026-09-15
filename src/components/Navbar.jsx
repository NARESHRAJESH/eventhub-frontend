import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUsername(localStorage.getItem("username"));
    setRole(localStorage.getItem("role"));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          🎟 EventHub
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/events" className="nav-link">
            Events
          </Link>

          {(!token || role === "user") && (
            <Link to="/my-bookings" className="nav-link">
              My Bookings
            </Link>
          )}

          {token && role === "organizer" && (
            <Link to="/organizer/dashboard" className="nav-link">
              Dashboard
            </Link>
          )}
        </div>

        <div className="nav-actions">
          <ThemeToggle />

          {token ? (
            <>
              <span className="nav-username">Hi, {username}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
