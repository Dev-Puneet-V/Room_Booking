import db from "../db.js";

// Function to release expired locks
const releaseExpiredLocks = () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection:", err);
      return;
    }

    connection.beginTransaction(async (err) => {
      try {
        // Release locks that have expired and are not for occupied rooms
        await connection.query(
          `UPDATE room 
           SET lock_until = NULL 
           WHERE lock_until IS NOT NULL 
           AND lock_until < NOW() 
           AND status != 'Occupied'`
        );

        await connection.commit();
        console.log("Released expired room locks");
      } catch (error) {
        await connection.rollback();
        console.error("Error releasing expired locks:", error);
      } finally {
        connection.release();
      }
    });
  });
};

// Run the check every minute
const startLockCleanup = () => {
  setInterval(releaseExpiredLocks, 60000); // 60000 ms = 1 minute
  console.log("Started automatic lock cleanup scheduler");
};

export default startLockCleanup;
