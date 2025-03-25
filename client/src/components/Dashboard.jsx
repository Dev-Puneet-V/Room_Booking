import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For admin room management
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomData, setRoomData] = useState({
    number: "",
    type: "",
    price: "",
    status: "Empty",
    image_url: "",
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [roomsResponse, bookingsResponse] = await Promise.all([
        api.get("/room"),
        api.get("/booking/user"),
      ]);
      setRooms(roomsResponse.data);
      setBookings(bookingsResponse.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRoom) {
        await api.put(`/room/${selectedRoom.number}`, roomData);
      } else {
        await api.post("/room", roomData);
      }
      fetchDashboardData();
      setShowRoomForm(false);
      setSelectedRoom(null);
      setRoomData({
        number: "",
        type: "",
        price: "",
        status: "Empty",
        image_url: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save room");
    }
  };

  const handleDeleteRoom = async (roomNumber) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await api.delete(`/room/${roomNumber}`);
        fetchDashboardData();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete room");
      }
    }
  };

  const editRoom = (room) => {
    setSelectedRoom(room);
    setRoomData(room);
    setShowRoomForm(true);
  };

  // Calculate statistics
  const calculateStats = () => {
    if (user?.type === "admin") {
      const totalRooms = rooms.length;
      const emptyRooms = rooms.filter((room) => room.status === "Empty").length;
      const occupiedRooms = rooms.filter(
        (room) => room.status === "Occupied"
      ).length;
      const maintenanceRooms = rooms.filter(
        (room) => room.status === "Maintenance"
      ).length;
      const totalRevenue = bookings.reduce(
        (sum, booking) => sum + booking.amount,
        0
      );

      return {
        totalRooms,
        emptyRooms,
        occupiedRooms,
        maintenanceRooms,
        totalRevenue,
      };
    } else {
      // Filter confirmed bookings first
      const confirmedBookings = bookings.filter(
        (booking) => booking.status === "confirmed"
      );
      const totalBookings = confirmedBookings.length;

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

      const upcomingBookings = confirmedBookings.filter((booking) => {
        const bookingDate = new Date(booking.from_date);
        bookingDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
        return bookingDate >= currentDate;
      }).length;

      const completedBookings = confirmedBookings.filter((booking) => {
        const endDate = new Date(booking.end_date);
        endDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
        return endDate < currentDate;
      }).length;

      return { totalBookings, upcomingBookings, completedBookings };
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  const stats = calculateStats();

  // Admin Dashboard
  if (user?.type === "admin") {
    return (
      <div className="dashboard">
        <h1>Admin Dashboard</h1>

        {/* Stats Section */}
        <div className="stats-section">
          <h2>Hotel Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Rooms</h3>
              <p>{stats.totalRooms}</p>
            </div>
            <div className="stat-card">
              <h3>Available Rooms</h3>
              <p>{stats.emptyRooms}</p>
            </div>
            <div className="stat-card">
              <h3>Occupied Rooms</h3>
              <p>{stats.occupiedRooms}</p>
            </div>
            <div className="stat-card">
              <h3>Under Maintenance</h3>
              <p>{stats.maintenanceRooms}</p>
            </div>
            <div className="stat-card highlight">
              <h3>Total Revenue</h3>
              <p>₹{stats.totalRevenue}</p>
            </div>
          </div>
        </div>

        {/* Room Management Section */}
        <div className="admin-section">
          <div className="section-header">
            <h2>Room Management</h2>
            <button
              onClick={() => setShowRoomForm(true)}
              className="add-room-btn"
            >
              Add New Room
            </button>
          </div>

          {showRoomForm && (
            <form onSubmit={handleRoomSubmit} className="room-form">
              <input
                type="text"
                placeholder="Room Number"
                value={roomData.number}
                onChange={(e) =>
                  setRoomData({ ...roomData, number: e.target.value })
                }
                disabled={selectedRoom}
                required
              />
              <select
                value={roomData.type}
                onChange={(e) =>
                  setRoomData({ ...roomData, type: e.target.value })
                }
                required
              >
                <option value="">Select Room Type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
              <input
                type="number"
                placeholder="Price per Night"
                value={roomData.price}
                onChange={(e) =>
                  setRoomData({ ...roomData, price: e.target.value })
                }
                required
              />
              <select
                value={roomData.status}
                onChange={(e) =>
                  setRoomData({ ...roomData, status: e.target.value })
                }
              >
                <option value="Empty">Empty</option>
                <option value="Occupied">Occupied</option>
                <option value="Under maintenance">Maintenance</option>
              </select>
              <input
                type="text"
                placeholder="Image URL"
                value={roomData.image}
                onChange={(e) =>
                  setRoomData({ ...roomData, image_url: e.target.value })
                }
              />
              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  {selectedRoom ? "Update" : "Create"} Room
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowRoomForm(false);
                    setSelectedRoom(null);
                    setRoomData({
                      number: "",
                      type: "",
                      price: "",
                      status: "Empty",
                      image_url: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="rooms-table">
            <table>
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.number}>
                    <td>{room.number}</td>
                    <td>{room.type}</td>
                    <td>₹{room.cost}</td>
                    <td>
                      <span
                        className={`status-badge ${room.status.toLowerCase()}`}
                      >
                        {room.status}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button
                        onClick={() => editRoom(room)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room.number)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Guest Dashboard
  if (user?.type === "guest" || user?.type === "user") {
    return (
      <div className="dashboard guest-dashboard">
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <p>Welcome back, {user.name}!</p>
        </div>

        {/* Booking Summary */}
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Bookings</h3>
            <p className="number">{stats.totalBookings}</p>
          </div>
          <div className="summary-card">
            <h3>Upcoming Stays</h3>
            <p className="number">{stats.upcomingBookings}</p>
          </div>
          <div className="summary-card">
            <h3>Completed Stays</h3>
            <p className="number">{stats.completedBookings}</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bookings-section">
          <h2>My Bookings</h2>
          {bookings.length === 0 ? (
            <div className="no-bookings">
              <p>You haven't made any bookings yet.</p>
              <button
                onClick={() => (window.location.href = "/rooms")}
                className="book-now-btn"
              >
                Book a Room
              </button>
            </div>
          ) : (
            <div className="bookings-grid">
              {bookings
                .filter((booking) => booking.status === "confirmed")
                .map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-info">
                      <h3>Room {booking.room_number}</h3>
                      <p className="room-type">{booking.room_type}</p>
                      <div className="booking-dates">
                        <div>
                          <span>Check In:</span>
                          <p>
                            {new Date(booking.from_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span>Check Out:</span>
                          <p>
                            {new Date(booking.end_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="booking-footer">
                        <span
                          className={`booking-status ${booking.status.toLowerCase()}`}
                        >
                          {booking.status}
                        </span>
                        <span className="booking-amount">
                          ₹{booking.amount}
                        </span>
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

  // Default view for unauthenticated users
  return <div>Please log in to view your dashboard.</div>;
};

export default Dashboard;
