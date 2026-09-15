import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./OrganizerDashboard.css";
import { API_URL } from "../../config"; // ← rendu dot

function OrganizerDashboard() {
  const navigate = useNavigate();

  const [totalEvents, setTotalEvents] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "organizer") {
      alert("Only organizers can access this page");
      navigate("/");
      return;
    }
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/events/${id}/`);

      setTotalEvents(response.data.total_events);
      setTotalBookings(response.data.total_bookings);
      setTotalCustomers(response.data.total_customers);
      setTotalIncome(response.data.total_income);
      setEvents(response.data.events);
    } catch (error) {
      console.error("Dashboard error:", error);

      if (error.response && error.response.status === 403) {
        alert("Only organizers can access this page");
        navigate("/");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/events/${id}/`);
      alert("Event deleted successfully!");
      fetchDashboard();
    } catch (error) {
      console.error("Delete error:", error);

      if (error.response && error.response.status === 403) {
        alert("You can only delete your own events");
      } else {
        alert("Failed to delete event.");
      }
    }
  };

  return (
    <div className="organizer-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Organizer Dashboard</h1>
          <p>Manage your events and bookings</p>
        </div>

        <Link to="/organizer/create-event" className="create-event-btn">
          + Create Event
        </Link>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Events</h3>
          <strong>{totalEvents}</strong>
          <p>Events created by you</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Bookings</h3>
          <strong>{totalBookings}</strong>
          <p>Tickets booked</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Customers</h3>
          <strong>{totalCustomers}</strong>
          <p>Customers attending</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Income</h3>
          <strong>₹{totalIncome}</strong>
          <p>Revenue generated</p>
        </div>
      </div>

      <div className="recent-events">
        <h2>Your Events</h2>

        {events.length === 0 ? (
          <div className="empty-events">
            <h3>No events created yet</h3>
            <p>Create your first event to get started.</p>
            <Link to="/organizer/create-event">Create Your First Event</Link>
          </div>
        ) : (
          <div className="organizer-events">
            {events.map((event) => (
              <div className="organizer-event-card" key={event.id}>
                <div>
                  <h3>{event.title}</h3>
                  <p>📅 {event.date}</p>
                  <p>📍 {event.location}</p>
                  <p>🎟️ ₹{event.price}</p>
                </div>

                <div>
                  <span className="event-category">{event.category}</span>

                  <div className="event-actions">
                    <Link
                      to={`/organizer/edit-event/${event.id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrganizerDashboard;
