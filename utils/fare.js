/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} - Distance in kilometers
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Calculate estimated fare based on distance and time
 * @param {number} distance - Distance in kilometers
 * @param {number} duration - Duration in minutes
 * @param {number} baseFare - Base fare amount
 * @param {number} perKmRate - Rate per kilometer
 * @param {number} perMinuteRate - Rate per minute
 * @param {number} minimumFare - Minimum fare amount
 * @returns {Object} - Fare breakdown
 */
const calculateFare = (distance, duration, baseFare = 30, perKmRate = 15, perMinuteRate = 2, minimumFare = 50) => {
  const distanceFare = distance * perKmRate;
  const timeFare = duration * perMinuteRate;
  const totalFare = baseFare + distanceFare + timeFare;
  
  return {
    baseFare,
    distanceFare: Math.round(distanceFare * 100) / 100,
    timeFare: Math.round(timeFare * 100) / 100,
    totalFare: Math.max(Math.round(totalFare * 100) / 100, minimumFare)
  };
};

/**
 * Calculate surge pricing multiplier based on demand
 * @param {number} activeRides - Number of active rides in area
 * @param {number} availableRiders - Number of available riders in area
 * @param {number} maxMultiplier - Maximum surge multiplier (default: 3.0)
 * @returns {number} - Surge multiplier
 */
const calculateSurgeMultiplier = (activeRides, availableRiders, maxMultiplier = 3.0) => {
  if (availableRiders === 0) return maxMultiplier;
  
  const demandRatio = activeRides / availableRiders;
  const multiplier = 1 + (demandRatio * 0.5);
  
  return Math.min(multiplier, maxMultiplier);
};

/**
 * Calculate final fare with surge pricing
 * @param {Object} baseFareBreakdown - Base fare breakdown
 * @param {number} surgeMultiplier - Surge pricing multiplier
 * @returns {Object} - Final fare breakdown with surge
 */
const calculateFinalFare = (baseFareBreakdown, surgeMultiplier = 1.0) => {
  const surgeFare = (baseFareBreakdown.totalFare * surgeMultiplier) - baseFareBreakdown.totalFare;
  
  return {
    ...baseFareBreakdown,
    surgeMultiplier,
    surgeFare: Math.round(surgeFare * 100) / 100,
    finalFare: Math.round((baseFareBreakdown.totalFare + surgeFare) * 100) / 100
  };
};

/**
 * Calculate rider earnings (after commission)
 * @param {number} totalFare - Total fare amount
 * @param {number} commissionPercentage - Commission percentage (default: 20%)
 * @param {number} incentiveAmount - Additional incentive amount (default: 0)
 * @returns {Object} - Earnings breakdown
 */
const calculateRiderEarnings = (totalFare, commissionPercentage = 20, incentiveAmount = 0) => {
  const commissionAmount = (totalFare * commissionPercentage) / 100;
  const netAmount = totalFare - commissionAmount;
  const totalEarnings = netAmount + incentiveAmount;
  
  return {
    baseAmount: totalFare,
    commissionPercentage,
    commissionAmount: Math.round(commissionAmount * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
    incentiveAmount,
    totalAmount: Math.round(totalEarnings * 100) / 100
  };
};

module.exports = {
  calculateDistance,
  calculateFare,
  calculateSurgeMultiplier,
  calculateFinalFare,
  calculateRiderEarnings
}; 