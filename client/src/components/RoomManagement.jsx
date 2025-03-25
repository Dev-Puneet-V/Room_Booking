import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "../styles/RoomManagement.css";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    type: "Single",
    price: "",
    status: "Empty",
    image_url: "",
  });
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await api.get("/room");
      setRooms(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/room", formData);
      setShowForm(false);
      setFormData({
        number: "",
        type: "Single",
        price: "",
        status: "Empty",
        image_url: "",
      });
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create room");
    }
  };

  const handleDelete = async (roomNumber) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await api.delete(`/room/${roomNumber}`);
        fetchRooms();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete room");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="room-management">
      <div className="header">
        <h2>Room Management</h2>
        <button onClick={() => setShowForm(true)} className="add-btn">
          Add New Room
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="room-form">
          <div className="form-group">
            <label>Room Number:</label>
            <input
              type="text"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Room Type:</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              required
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price per Night:</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Create Room
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="cancel-btn"
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
              <th>Room Number</th>
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
                  <span className={`status ${room.status.toLowerCase()}`}>
                    {room.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(room.number)}
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
  );
};

export default RoomManagement;
