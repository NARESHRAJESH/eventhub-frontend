import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Events.css";
import { API_URL } from "../config";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/events/`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="events-page">
      <section className="events-header">
        <h1>Explore Events</h1>
        <p>Discover events happening around you</p>
      </section>

      <section className="events-container">
        <div className="filter-bar">
          <input type="text" placeholder="Search events..." />

          <select>
            <option>All Categories</option>
            <option>Concert</option>
            <option>Festival</option>
            <option>Conference</option>
            <option>Workshop</option>
            <option>Meetup</option>
            <option>Cultural</option>
          </select>

          <select>
            <option>All Locations</option>
            <option>Coimbatore</option>
            <option>Chennai</option>
            <option>Bangalore</option>
            <option>Hyderabad</option>
            <option>Delhi</option>
          </select>
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-image">
                {event.image && (
                  <img
                    src={
                      event.image.startsWith("http")
                        ? event.image
                        : `${API_URL}${event.image}`
                    }
                    alt={event.title}
                  />
                )}

                <span>{event.category}</span>
              </div>

              <div className="event-info">
                <h3>{event.title}</h3>

                <p>📅 {event.date}</p>

                <p>📍 {event.location}</p>

                <div className="event-bottom">
                  <div>
                    <strong>₹{event.price}</strong>
                    <small>{event.seats} seats available</small>
                  </div>

                  <Link
                    to={`/eventdetails/${event.id}`}
                    className="details-btn"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Events;
