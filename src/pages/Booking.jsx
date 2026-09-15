import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Booking.css";
import { API_URL } from "../config";

function Booking() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/my-bookings/`);

      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  if (!event) {
    return <h2>Loading event...</h2>;
  }

  const totalAmount = Number(event.price) * quantity;

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>Book Your Tickets</h1>
          <p>Complete your booking for the event</p>
        </div>

        <div className="booking-content">
          {/* Event Information */}
          <div className="booking-event">
            {event.image && (
              <img
                src={`http://127.0.0.1:8000${event.image}`}
                alt={event.title}
                className="booking-event-image"
              />
            )}

            <h2>{event.title}</h2>

            <p>📅 {event.date}</p>

            <p>⏰ {event.time}</p>

            <p>📍 {event.location}</p>

            <p>🎟️ {event.seats} seats available</p>

            <hr />

            <h3>Ticket Price</h3>

            <p className="price">₹{event.price}</p>
          </div>

          {/* Booking Summary */}
          <div className="booking-summary">
            <h2>Booking Summary</h2>

            <label>Number of Tickets</label>

            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              <option value={1}>1 Ticket</option>
              <option value={2}>2 Tickets</option>
              <option value={3}>3 Tickets</option>
              <option value={4}>4 Tickets</option>
              <option value={5}>5 Tickets</option>
            </select>

            <div className="summary-row">
              <span>Ticket Price</span>

              <span>₹{event.price}</span>
            </div>

            <div className="summary-row">
              <span>Quantity</span>

              <span>{quantity}</span>
            </div>

            <hr />

            <div className="total-row">
              <span>Total Amount</span>

              <strong>₹{totalAmount}</strong>
            </div>

            <Link to={`/booking/${event.id}/confirm`} className="confirm-btn">
              Continue Booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
