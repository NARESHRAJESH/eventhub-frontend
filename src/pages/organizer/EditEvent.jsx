import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditEvent.css";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    time: "",
    price: "",
    seats: "",
    image: null,
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing event
  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/events/${id}/`,
      );

      setEventData({
        title: response.data.title || "",
        description: response.data.description || "",
        category: response.data.category || "",
        location: response.data.location || "",
        date: response.data.date || "",
        time: response.data.time || "",
        price: response.data.price || "",
        seats: response.data.seats || "",
        image: null,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching event:", error);
      alert("Failed to load event.");
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image
  const handleImageChange = (e) => {
    setEventData({
      ...eventData,
      image: e.target.files[0],
    });
  };

  // Update event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", eventData.title);
      formData.append("description", eventData.description);
      formData.append("category", eventData.category);
      formData.append("location", eventData.location);
      formData.append("date", eventData.date);
      formData.append("time", eventData.time);
      formData.append("price", eventData.price);
      formData.append("seats", eventData.seats);

      // Only send image if user selected a new image
      if (eventData.image instanceof File) {
        formData.append("image", eventData.image);
      }

      await axios.put(`http://127.0.0.1:8000/api/events/${id}/`, formData);

      alert("Event updated successfully!");

      navigate("/organizer/dashboard");
    } catch (error) {
      console.error("Update error:", error);

      if (error.response) {
        console.error("Backend response:", error.response.data);
      }

      alert("Failed to update event.");
    }
  };

  if (loading) {
    return <h2>Loading event...</h2>;
  }

  return (
    <div className="edit-event-page">
      <div className="edit-event-container">
        <div className="edit-event-header">
          <h1>Edit Event</h1>
          <p>Update your event details</p>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          {/* Event Name */}
          <div className="form-group">
            <label>Event Name</label>

            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          {/* Category + Location */}
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={eventData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Concert">Concert</option>
                <option value="Festival">Festival</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Meetup">Meetup</option>
                <option value="Cultural">Cultural</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>

              <select
                name="location"
                value={eventData.location}
                onChange={handleChange}
                required
              >
                <option value="">Select Location</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
          </div>

          {/* Date + Time */}
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>

              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Time</label>

              <input
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Price + Seats */}
          <div className="form-row">
            <div className="form-group">
              <label>Ticket Price</label>

              <input
                type="number"
                name="price"
                value={eventData.price}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Total Seats</label>

              <input
                type="number"
                name="seats"
                value={eventData.seats}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          {/* Image */}
          <div className="form-group">
            <label>Change Event Image</label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />

            <small>
              Leave empty if you don't want to change the current image.
            </small>
          </div>

          {/* Update Button */}
          <button type="submit" className="update-event-btn">
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;
