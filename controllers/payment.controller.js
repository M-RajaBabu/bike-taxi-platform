// Payment Controller
exports.addMethod = (req, res) => {
  // TODO: Add payment method to DB
  res.json({ message: 'Payment method added (stub)' });
};

exports.getMethods = (req, res) => {
  // TODO: Fetch payment methods from DB
  res.json({ message: 'Payment methods endpoint (stub)' });
};

exports.processPayment = (req, res) => {
  // TODO: Process payment and save to DB
  res.json({ message: 'Payment processed (stub)' });
}; 