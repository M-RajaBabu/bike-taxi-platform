const { calculateDistance, calculateFare, calculateFinalFare } = require('../utils/fare');

// Mock: Find nearest rider (in production, query DB for online/nearby riders)
const findNearestRider = (pickup_lat, pickup_lng) => {
  return {
    id: 1,
    name: 'Captain Raj',
    phone: '+919876543220',
    vehicle_number: 'KA01AB1234',
    vehicle_model: 'Honda Activa',
    vehicle_color: 'White',
    distance_km: 0.5
  };
};

// POST /api/rides/estimate
const estimateRide = (req, res) => {
  try {
    const { pickup_latitude, pickup_longitude, drop_latitude, drop_longitude } = req.body;
    if (
      pickup_latitude == null || pickup_longitude == null ||
      drop_latitude == null || drop_longitude == null
    ) {
      return res.status(400).json({ error: 'Pickup and drop coordinates are required' });
    }

    // Calculate distance
    const distance = calculateDistance(
      Number(pickup_latitude),
      Number(pickup_longitude),
      Number(drop_latitude),
      Number(drop_longitude)
    );
    // Assume average speed 20km/h for duration
    const duration = Math.ceil((distance / 20) * 60);
    // Get fare config (could be from DB)
    const baseFare = 30, perKmRate = 15, perMinuteRate = 2, minimumFare = 50;
    const fareBreakdown = calculateFare(distance, duration, baseFare, perKmRate, perMinuteRate, minimumFare);
    const finalFare = calculateFinalFare(fareBreakdown, 1.0); // No surge for now
    // Find nearest rider (mocked)
    const nearestRider = findNearestRider(pickup_latitude, pickup_longitude);

    res.json({
      estimated_distance_km: Math.round(distance * 100) / 100,
      estimated_duration_min: duration,
      fare: finalFare,
      nearest_rider: nearestRider
    });
  } catch (error) {
    console.error('Estimate ride error:', error);
    res.status(500).json({ error: 'Failed to estimate ride' });
  }
};

const bookRide = (req, res) => {
  // TODO: Book ride and save to DB
  res.json({ message: 'Ride booked (stub)' });
};

const getCurrentRide = (req, res) => {
  // TODO: Fetch current ride from DB
  res.json({ message: 'Current ride endpoint (stub)' });
};

const getRideHistory = (req, res) => {
  // TODO: Fetch ride history from DB
  res.json({ message: 'Ride history endpoint (stub)' });
};

const cancelRide = (req, res) => {
  // TODO: Cancel ride in DB
  res.json({ message: 'Ride cancelled (stub)' });
};

const triggerSOS = (req, res) => {
  // TODO: Trigger SOS alert in DB
  res.json({ message: 'SOS triggered (stub)' });
};

module.exports = {
  estimateRide,
  bookRide,
  getCurrentRide,
  getRideHistory,
  cancelRide,
  triggerSOS
}; 