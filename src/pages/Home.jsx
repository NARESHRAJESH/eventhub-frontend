import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import "./Home.css";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/events/`);
      setEvents(response.data.slice(0, 6));
    } catch (error) {
      console.log("Unable to load events");
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small-text">FIND SOMETHING TO DO</p>

          <h1>
            Events worth
            <br />
            <span>going to.</span>
          </h1>

          <p className="hero-description">
            Find concerts, workshops, festivals and other events happening
            around you.
          </p>

          <Link to="/events" className="primary-btn">
            Browse Events
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <h2>Upcoming Events</h2>
            <p>See what's happening next</p>
          </div>

          <Link to="/events" className="view-all">
            View all
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="no-events">
            <p>No events available right now.</p>
          </div>
        ) : (
          <div className="event-grid">
            {events.map((event) => (
              <div className="event-card" key={event.id}>
                <Link
                  to={`/eventdetails/${event.id}`}
                  className="event-image-link"
                >
                  <div className="event-image">
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
                      <div className="no-image">{event.category}</div>
                    )}

                    <span className="category-badge">{event.category}</span>
                  </div>
                </Link>

                <div className="event-content">
                  <h3>{event.title}</h3>

                  <p>📅 {event.date}</p>

                  <p>📍 {event.location}</p>

                  <div className="event-footer">
                    <div className="event-footer">
                      <strong>₹{event.price}</strong>

                      <span className="seats-count">
                        {event.seats} seats available
                      </span>

                      <Link
                        to={`/eventdetails/${event.id}`}
                        className="book-btn"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
