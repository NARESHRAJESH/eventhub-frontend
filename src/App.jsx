import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Navbar from "./components/Navbar";
import Booking from "./pages/Booking";
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import CreateEvent from "./pages/organizer/CreateEvent";
import BookingConfirm from "./pages/BookingConfirm";
import BookingSuccess from "./pages/BookingSuccess";
import EditEvent from "./pages/organizer/EditEvent";
import Register from "./pages/Register";
import Login from "./pages/Login";
import OrganizerLogin from "./pages/OrganizerLogin";
import MyBookings from "./pages/MyBookings";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/eventdetails/:id" element={<EventDetails />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/booking/:id/confirm" element={<BookingConfirm />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/organizer/edit-event/:id" element={<EditEvent />} />
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        <Route path="/organizer/create-event" element={<CreateEvent />} />
        <Route path="/organizer" element={<OrganizerDashboard />} />
        <Route path="/organizer/login" element={<OrganizerLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
