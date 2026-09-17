import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyBookings.css";
import { API_URL } from "../config";

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to view your bookings");
      navigate("/login");
      return;
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/api/my-bookings/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);

      if (error.response && error.response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", padding: "50px" }}>
        Loading bookings...
      </h2>
    );
  }

  return (
    <div className="my-bookings-page">
      <div className="my-bookings-container">
        <div className="my-bookings-header">
          <h1>My Bookings</h1>
          <p>All your event bookings in one place</p>
        </div>

        {bookings.length === 0 ? (
          <div className="no-bookings">
            <h2>No bookings yet</h2>
            <p>You haven't booked any events. Start exploring!</p>
            <Link to="/events" className="explore-btn">
              Explore Events
            </Link>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div className="booking-card" key={booking.id}>
                <div className="booking-card-header">
                  <h3>{booking.event_title}</h3>
                  <span className="booking-id">#{booking.id}</span>
                </div>

                <div className="booking-card-body">
                  <div className="booking-info">
                    <span>Tickets</span>
                    <strong>{booking.tickets}</strong>
                  </div>

                  <div className="booking-info">
                    <span>Total Amount</span>
                    <strong>₹{booking.total_amount}</strong>
                  </div>

                  <div className="booking-info">
                    <span>Customer Name</span>
                    <strong>{booking.customer_name}</strong>
                  </div>

                  <div className="booking-info">
                    <span>Email</span>
                    <strong>{booking.customer_email}</strong>
                  </div>
                </div>

                <div className="booking-card-footer">
                  <span className="confirmed-badge">✓ Confirmed</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
