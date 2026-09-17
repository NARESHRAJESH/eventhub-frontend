import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./EventDetails.css";
import { API_URL } from "../config";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/events/${id}/`);
      setEvent(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching event:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="event-loading">
        <h2>Loading event...</h2>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-not-found">
        <h2>Event not found</h2>
        <Link to="/events">Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="event-details-page">
      <div className="event-details-container">
        <div className="event-details-image">
          {event.image ? (
            <img
              src={
                event.image.startsWith("http")
                  ? event.image
                  : `${API_URL}${event.image}`
              }
              alt={event.title}
            />
          ) : (
            <div className="no-event-image">{event.category}</div>
          )}
        </div>

        <div className="event-details-content">
          <span className="event-category">{event.category}</span>

          <h1>{event.title}</h1>

          <p className="event-description">{event.description}</p>

          <div className="event-info">
            <div>
              <span>📅 Date</span>
              <strong>{event.date}</strong>
            </div>

            <div>
              <span>⏰ Time</span>
              <strong>{event.time}</strong>
            </div>

            <div>
              <span>📍 Location</span>
              <strong>{event.location}</strong>
            </div>

            <div>
              <span>🎟️ Seats</span>
              <strong>{event.seats} available</strong>
            </div>
          </div>

          <div className="event-booking">
            <div>
              <small>Ticket Price</small>
              <h2>₹{event.price}</h2>
            </div>

            <Link to={`/booking/${event.id}`} className="book-ticket-btn">
              Book Tickets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
