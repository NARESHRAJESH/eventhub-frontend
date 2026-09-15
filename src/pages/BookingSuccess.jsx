
import { Link } from "react-router-dom";
import "./BookingSuccess.css";

function BookingSuccess() {
  return (
    <div className="success-page">

      <div className="success-container">

        <div className="success-icon">
          ✓
        </div>

        <h1>Booking Confirmed!</h1>

        <p>
          Your event booking has been successfully completed.
        </p>

        <p>
          Thank you for booking with EventHub.
        </p>

        <div className="success-actions">

          <Link to="/events" className="success-btn">
            Explore More Events
          </Link>

          <Link to="/" className="home-btn">
            Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default BookingSuccess;