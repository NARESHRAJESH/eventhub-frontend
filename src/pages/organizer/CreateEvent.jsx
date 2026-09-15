import { useState } from "react";
import axios from "axios";
import "./CreateEvent.css";
import { API_URL } from "../../config"; // ← rendu dot

function CreateEvent() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    time: "",
    price: "",
    seats: "",
    images: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setEventData({
      ...eventData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("category", eventData.category);
    formData.append("location", eventData.location);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("price", eventData.price);
    formData.append("seats", eventData.seats);
    formData.append("image", eventData.image);

    try {
      await axios.post(`${API_URL}/api/events/`, formData);

      alert("Event created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create event.");
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-container">
        <div className="create-event-header">
          <h1>Create New Event</h1>
          <p>Fill in the details to publish your event</p>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              name="title"
              placeholder="Enter event name"
              value={eventData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe your event"
              value={eventData.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

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

          <div className="form-row">
            <div className="form-group">
              <label>Ticket Price</label>

              <input
                type="number"
                name="price"
                placeholder="₹ Enter price"
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
                placeholder="Enter total seats"
                value={eventData.seats}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Event Image</label>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-event-btn">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
