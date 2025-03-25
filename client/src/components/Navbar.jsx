import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        Hotel Booking
      </Link>

      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/rooms" className="nav-link">
              Rooms
            </Link>
            {user?.type === "guest" && (
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            )}
            {user?.type === "admin" && (
              <Link to="/manage-rooms" className="nav-link">
                Manage Rooms
              </Link>
            )}
            <span className="user-email">{user?.email}</span>
            <button onClick={handleLogout} className="nav-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
