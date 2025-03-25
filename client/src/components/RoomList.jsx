import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import "../styles/RoomList.css";

const RoomList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedRoom, setEditedRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await api.get("/room");
      setRooms(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleViewRoom = async (room) => {
    if (user?.type === "admin") {
      // For admin, show modal with room details
      setSelectedRoom(room);
      setEditedRoom({ ...room });
      setShowModal(true);
    } else {
      // For guests, proceed with view/lock request
      try {
        await api.post(`/room/${room.number}/view`);
        navigate(`/booking/${room.number}`);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to view room");
      }
    }
  };

  const handleEditRoom = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/room/${selectedRoom.number}`, {
        type: editedRoom.type,
        price: editedRoom.cost,
        status: editedRoom.status,
        image_url: editedRoom.image,
      });

      // Refresh rooms list and close modal
      await fetchRooms();
      setShowModal(false);
      setEditMode(false);
      setSelectedRoom(null);
      setEditedRoom(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update room");
    }
  };

  if (loading) return <div className="loading">Loading rooms...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="room-list">
      <h1>Available Rooms</h1>
      <div className="room-grid">
        {rooms.map((room) => (
          <div key={room.number} className="room-card">
            <img
              src={room.image || `/images/room-${room.type.toLowerCase()}.jpg`}
              alt={`Room ${room.number}`}
              className="room-image"
            />
            <div className="room-info">
              <h2>Room {room.number}</h2>
              <p className="room-type">{room.type}</p>
              <p className="room-price">₹{room.cost}/night</p>
              <span className={`room-status ${room.status.toLowerCase()}`}>
                {room.status}
              </span>
              <button
                onClick={() => handleViewRoom(room)}
                className={
                  user?.type === "admin" ? "admin-view-btn" : "view-btn"
                }
                disabled={
                  (room.status !== "Empty" && user?.type !== "admin") ||
                  (room.status === "Occupied" && user?.type === "admin")
                }
              >
                {user?.type === "admin" ? "Manage Room" : "View Room"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Modal */}
      {showModal && selectedRoom && user?.type === "admin" && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                {editMode ? "Edit Room" : `Room ${selectedRoom.number} Details`}
              </h2>
              <button
                className="close-btn"
                onClick={() => {
                  setShowModal(false);
                  setEditMode(false);
                  setSelectedRoom(null);
                  setEditedRoom(null);
                }}
              >
                ×
              </button>
            </div>

            {editMode ? (
              <form onSubmit={handleEditRoom} className="edit-form">
                <div className="form-group">
                  <label>Room Type:</label>
                  <select
                    value={editedRoom.type}
                    onChange={(e) =>
                      setEditedRoom({ ...editedRoom, type: e.target.value })
                    }
                    required
                  >
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Suite">Suite</option>
                    <option value="Deluxe">Deluxe</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price per Night:</label>
                  <input
                    type="number"
                    value={editedRoom.cost}
                    onChange={(e) =>
                      setEditedRoom({ ...editedRoom, cost: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Status:</label>
                  <select
                    value={editedRoom.status}
                    onChange={(e) =>
                      setEditedRoom({ ...editedRoom, status: e.target.value })
                    }
                    required
                  >
                    <option value="Empty">Empty</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Under maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Image URL:</label>
                  <input
                    type="text"
                    value={editedRoom.image}
                    onChange={(e) =>
                      setEditedRoom({ ...editedRoom, image: e.target.value })
                    }
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setEditMode(false);
                      setEditedRoom({ ...selectedRoom });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="room-details">
                <div className="detail-row">
                  <span>Room Number:</span>
                  <span>{selectedRoom.number}</span>
                </div>
                <div className="detail-row">
                  <span>Type:</span>
                  <span>{selectedRoom.type}</span>
                </div>
                <div className="detail-row">
                  <span>Price per Night:</span>
                  <span>₹{selectedRoom.cost}</span>
                </div>
                <div className="detail-row">
                  <span>Status:</span>
                  <span
                    className={`status-badge ${selectedRoom.status.toLowerCase()}`}
                  >
                    {selectedRoom.status}
                  </span>
                </div>
                <div className="detail-row">
                  <span>Total Bookings:</span>
                  <span>{selectedRoom.total_bookings || 0}</span>
                </div>
                <div className="detail-row">
                  <span>Views:</span>
                  <span>{selectedRoom.views || 0}</span>
                </div>
                <button className="edit-btn" onClick={() => setEditMode(true)}>
                  Edit Room
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomList;
