import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingConfirm.css";
import { API_URL } from "../config";

function BookingConfirm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/events/${id}/`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login before booking tickets.");
      navigate("/login");
      return;
    }

    if (quantity > event.seats) {
      alert(`Only ${event.seats} seats are available.`);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/bookings/`, {
        event: event.id,
        tickets: quantity,
      });

      console.log("Booking response:", response.data);
      alert("Booking confirmed successfully!");
      navigate("/booking-success");
    } catch (error) {
      console.error("Booking failed:", error);

      if (error.response) {
        alert(error.response.data.error || "Booking failed. Please try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  if (!event) {
    return <h2>Loading...</h2>;
  }

  const totalAmount = Number(event.price) * quantity;

  return (
    <div className="booking-confirm-page">
      <div className="booking-confirm-container">
        <div className="booking-confirm-header">
          <h1>Confirm Your Booking</h1>
          <p>Check your event details and confirm your tickets</p>
        </div>

        <div className="booking-confirm-content">
          <div className="confirm-event">
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

            <h2>{event.title}</h2>
            <p>📅 {event.date}</p>
            <p>⏰ {event.time}</p>
            <p>📍 {event.location}</p>
            <p>🎟️ {event.seats} seats available</p>
            <h3>₹{event.price} per ticket</h3>
          </div>

          <form className="customer-form" onSubmit={handleBooking}>
            <h2>Booking Details</h2>

            <div className="form-group">
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
            </div>

            <div className="confirm-total">
              <span>Total Amount</span>
              <strong>₹{totalAmount}</strong>
            </div>

            <button type="submit" className="confirm-booking-btn">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirm;
