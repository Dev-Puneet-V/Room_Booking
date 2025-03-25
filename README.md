# 🏨 Hotel Management System

A modern, secure, and scalable Hotel Management System built with React, Node.js, and MySQL. Features role-based access control and secure payment processing.

## ✨ Features

### 🔐 Security & Authentication

- Role-based access control (Admin/Guest)
- JWT-based authentication with HTTP-only cookies
- Password hashing using bcrypt
- SQL injection prevention using parameterized queries

### 🏢 Room Management

- Dynamic room status tracking (Empty/Occupied/Maintenance)
- Room type categorization (Single/Double/Deluxe/Suite)
- Admin dashboard for room management
- Room status updates with booking integration

### 💳 Booking System

- Secure transaction handling with Razorpay integration
- Atomic transactions for booking operations
- Booking history tracking
- Room locking during booking process (5-minute lock)

### 🔄 Booking Process Flow

1. **Room Viewing (5-minute lock)**

   ```
   Guest -> Views Room -> Room Locked for 5 minutes
   ```

   - When a guest views a room, it's locked for 5 minutes
   - Prevents double booking during decision time
   - Lock automatically expires if no action taken

2. **Booking Initiation (15-minute payment window)**

   ```
   Guest -> Initiates Booking -> Room Locked for 15 minutes
   ```

   - Guest fills booking details (dates, guests)
   - Room is locked for 15 minutes
   - Payment must be completed within this window

3. **Payment Process**

   ```
   Guest -> Razorpay Payment -> Booking Confirmation
   ```

   - Secure Razorpay integration
   - Real-time payment status updates
   - Automatic booking confirmation on success

4. **Booking States**

   ```
   View -> Lock -> Payment Pending -> Confirmed/Failed
   ```

   - View: Initial room inspection
   - Lock: Room temporarily reserved
   - Payment Pending: Awaiting payment completion
   - Confirmed: Booking successful
   - Failed: Payment/booking unsuccessful

5. **Lock Expiration**
   - View lock: 5 minutes
   - Payment lock: 15 minutes
   - Auto-release if process not completed
   - Room becomes available for others

### 📊 Dashboard & Analytics

- Role-specific dashboards (Admin/Guest)
- Admin Dashboard:
  - Total rooms overview
  - Room status distribution
- Guest Dashboard:
  - Booking history
  - Upcoming stays
  - Completed stays

### 📈 Key Metrics

- **System Architecture**

  - 3-tier architecture (Frontend/Backend/Database)
  - 4 user roles (Admin/Employee/Guest/Viewer)
  - 5 room types (Single/Double/Deluxe/Suite)

- **Database Design**

  - 7 optimized indexes for performance
  - 6 interconnected tables
  - 3 unique constraints for data integrity

- **Security Implementation**

  - JWT-based authentication
  - Role-based access control
  - HTTP-only cookies
  - SQL injection prevention

- **Business Logic**
  - 5-minute room viewing lock
  - 15-minute payment window
  - 3-step booking process
  - Real-time room status updates

### 🚀 Performance Optimizations

- Database indexing on frequently queried fields
- Connection pooling for database operations

## 🛠️ Technical Implementation

### Database Design

```sql
-- User Authentication Indexes
CREATE UNIQUE INDEX email ON guest(email);        -- Fast email lookup for guest authentication
CREATE UNIQUE INDEX email ON admin(email);        -- Fast email lookup for admin authentication
CREATE UNIQUE INDEX email ON employee(email);     -- Fast email lookup for employee authentication

-- Room Management Indexes
CREATE UNIQUE INDEX number ON room(number);       -- Fast room number lookups
CREATE INDEX fk_room_viewer_user ON room(viewer_user_id);  -- Optimize room viewing queries

-- Booking and Payment Indexes
CREATE INDEX fk_room ON booking(room_id);         -- Optimize room booking queries
CREATE INDEX fk_payment ON booking(payment_id);   -- Fast payment status lookups
CREATE INDEX idx_guest_id ON booking(guest_id);   -- Quick access to guest bookings
CREATE INDEX fk_user ON payment(user_id);         -- Payment user relationship
CREATE UNIQUE INDEX booking_id ON payment(booking_id);  -- One-to-one booking-payment relationship
```

These indexes optimize:

- User authentication (unique email constraints)
- Room availability checks
- Booking history retrieval
- Payment processing
- Room viewing status

### Transaction Handling

```javascript
// Example of Atomic Transaction in Booking
await db.beginTransaction();
try {
  // Check if room is available
  const [room] = await db.query(
    "SELECT * FROM rooms WHERE number = ? FOR UPDATE",
    [roomNumber]
  );

  // Create booking record
  await db.query("INSERT INTO bookings SET ?", bookingData);

  // Update room status
  await db.query("UPDATE rooms SET status = 'Occupied' WHERE number = ?", [
    roomNumber,
  ]);

  await db.commit();
} catch (error) {
  await db.rollback();
  throw error;
}
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v14+)
- MySQL (v8+)
- npm or yarn
- Docker (optional)

### Environment Variables

Create `.env` files in both client and server directories:

#### Server (.env)

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=hotel_db
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

#### Client (.env)

```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

### 🐳 Running with Docker

1. Clone the repository

```bash
git clone https://github.com/Dev-Puneet-V/Room_Booking.git
cd Room_Booking
```

2. Start the application

```bash
docker-compose up --build
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### 🔨 Running without Docker

1. Setup Database

```bash
mysql -u root -p
CREATE DATABASE hotel_db;
```

2. Start Backend

```bash
cd server
npm install
npm run dev
```

3. Start Frontend

```bash
cd client
npm install
npm run dev
```

## 📚 API Documentation

### Authentication Endpoints

- POST `/auth/login` - User login
- POST `/auth/register` - Guest registration (only guests can register)
- GET `/auth/check` - Check auth status

### Room Endpoints

- GET `/room` - Get all rooms
- POST `/room` - Create new room (Admin only)
- PUT `/room/:number` - Update room (Admin only)
- DELETE `/room/:number` - Delete room (Admin only)

### Booking Endpoints

- POST `/booking/:roomId` - Create booking
- GET `/booking/user` - Get user bookings
- GET `/booking/:id` - Get booking details

## 🔒 Security Features

1. **Data Protection**

   - Password hashing with bcrypt

2. **Database Security**

   - Prepared statements
   - Connection pooling
   - Transaction integrity
   - SQL injection prevention

[Watch the video](https://www.loom.com/share/7e56a35ca2ce4f18b3d88e8a8e91baf5?sid=3db2575f-4656-4833-801b-6ec8fc1316f6)

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🎯 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
