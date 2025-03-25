import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import "../styles/Booking.css";

const Booking = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  useEffect(() => {
    let isSubscribed = true;

    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        // First check/refresh the view lock
        const viewResponse = await api.post(`/room/${roomId}/view`);
        if (!viewResponse.data.data) {
          throw new Error("Room is no longer available");
        }
        if (isSubscribed) {
          setRoom(viewResponse.data.data);
          setError("");
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err.response?.data?.message || err.message);
          // If we can't view the room, redirect back to room list
          setTimeout(() => navigate("/rooms"), 2000);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchRoomDetails();

    // Set up periodic refresh of the view lock
    const refreshInterval = setInterval(fetchRoomDetails, 4 * 60 * 1000); // Refresh every 4 minutes

    // Cleanup: unlock room and clear interval when leaving
    return () => {
      isSubscribed = false;
      clearInterval(refreshInterval);
      if (room?.viewer_user_id === user?.id) {
        api.patch(`/room/${roomId}/unlock`).catch(console.error);
      }
    };
  }, [roomId, user, navigate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      // Calculate number of days and total amount
      const start = new Date(bookingData.checkIn);
      const end = new Date(bookingData.checkOut);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const amount = room.cost * days;

      const response = await api.post(`/room/${roomId}/book`, {
        from_date: bookingData.checkIn,
        days: days,
        amount: amount,
      });

      if (!response.data?.data?.orderId) {
        throw new Error("Failed to create booking");
      }

      // Initialize Razorpay payment
      const options = {
        key: "rzp_test_r9x0083Lr1W1nI", // Replace with your key from environment variables
        amount: response.data.data.amount * 100, // Amount in paise
        currency: response.data.data.currency,
        order_id: response.data.data.orderId,
        name: "Hotel Room Booking",
        description: `Room ${response.data.data.room.number} Booking`,
        handler: function (response) {
          // On successful payment
          window.location.href = `/dashboard`;
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || "",
        },
        notes: {
          booking_id: response.data.data.bookingId,
        },
        theme: {
          color: "#4CAF50",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create booking");
    }
  };

  // Prevent booking if user doesn't have the lock
  useEffect(() => {
    console.log("HDJFJJD", room, room?.viewer_user_id, user?.id);
    if (room && room.viewer_user_id !== user?.id) {
      setError("You don't have access to book this room");
      setTimeout(() => navigate("/rooms"), 2000);
    }
  }, [room, user, navigate]);

  if (loading) return <div className="loading">Loading room details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!room) return null;

  const minCheckIn = new Date().toISOString().split("T")[0];
  const minCheckOut = bookingData.checkIn
    ? new Date(new Date(bookingData.checkIn).getTime() + 86400000)
        .toISOString()
        .split("T")[0]
    : new Date(new Date().getTime() + 86400000).toISOString().split("T")[0];

  return (
    <div className="booking-container">
      <div className="room-preview">
        <img
          src={room.image || `/images/room-${room.type.toLowerCase()}.jpg`}
          alt={`Room ${room.number}`}
          className="room-image"
        />
        <div className="room-details">
          <h2>Room {room.number}</h2>
          <p className="room-type">{room.type}</p>
          <p className="room-price">₹{room.cost}/night</p>
          <span className={`room-status ${room.status.toLowerCase()}`}>
            {room.status}
          </span>
          <p className="lock-info">
            Room locked for your booking until{" "}
            {new Date(room.lock_until).toLocaleTimeString()}
          </p>
        </div>
      </div>

      <form onSubmit={handleBooking} className="booking-form">
        <h3>Book Your Stay</h3>
        <div className="date-picker">
          <div className="form-group">
            <label>Check-in Date</label>
            <input
              type="date"
              min={minCheckIn}
              value={bookingData.checkIn}
              onChange={(e) =>
                setBookingData({ ...bookingData, checkIn: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Check-out Date</label>
            <input
              type="date"
              min={minCheckOut}
              value={bookingData.checkOut}
              onChange={(e) =>
                setBookingData({ ...bookingData, checkOut: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Number of Guests</label>
          <input
            type="number"
            min="1"
            max={room.capacity || 2}
            value={bookingData.guests}
            onChange={(e) =>
              setBookingData({
                ...bookingData,
                guests: parseInt(e.target.value),
              })
            }
            required
          />
        </div>

        <div className="price-summary">
          <h4>Price Summary</h4>
          <div className="price-details">
            <span>Room Rate</span>
            <span>₹{room.cost}/night</span>
          </div>
          {bookingData.checkIn && bookingData.checkOut && (
            <div className="price-details total">
              <span>Total</span>
              <span>
                ₹
                {calculateTotal(
                  room.cost,
                  bookingData.checkIn,
                  bookingData.checkOut
                )}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="book-button"
          disabled={!room.lock_until || new Date(room.lock_until) <= new Date()}
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

const calculateTotal = (pricePerNight, checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return pricePerNight * nights;
};

export default Booking;
