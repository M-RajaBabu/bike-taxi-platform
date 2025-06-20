-- Seed data for Bike Taxi Platform

-- Insert sample users
INSERT INTO users (phone, email, name, password_hash, is_verified, is_active) VALUES
('+919876543210', 'john.doe@example.com', 'John Doe', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', TRUE, TRUE),
('+919876543211', 'jane.smith@example.com', 'Jane Smith', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', TRUE, TRUE),
('+919876543212', 'mike.wilson@example.com', 'Mike Wilson', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', TRUE, TRUE),
('+919876543213', 'sarah.johnson@example.com', 'Sarah Johnson', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', TRUE, TRUE),
('+919876543214', 'david.brown@example.com', 'David Brown', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', TRUE, TRUE);

-- Insert sample riders
INSERT INTO riders (phone, email, name, password_hash, vehicle_number, vehicle_model, vehicle_color, is_verified, is_active, is_online, current_latitude, current_longitude, rating, total_rides, total_earnings) VALUES
('+919876543220', 'captain.raj@example.com', 'Captain Raj', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', 'KA01AB1234', 'Honda Activa', 'White', TRUE, TRUE, TRUE, 12.9716, 77.5946, 4.5, 150, 25000.00),
('+919876543221', 'captain.kumar@example.com', 'Captain Kumar', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', 'KA01CD5678', 'TVS Jupiter', 'Black', TRUE, TRUE, TRUE, 12.9789, 77.5917, 4.3, 120, 20000.00),
('+919876543222', 'captain.singh@example.com', 'Captain Singh', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', 'KA01EF9012', 'Bajaj Pulsar', 'Red', TRUE, TRUE, FALSE, 12.9750, 77.5925, 4.7, 200, 35000.00),
('+919876543223', 'captain.ahmed@example.com', 'Captain Ahmed', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', 'KA01GH3456', 'Hero Splendor', 'Blue', TRUE, TRUE, TRUE, 12.9720, 77.5930, 4.2, 80, 15000.00),
('+919876543224', 'captain.patel@example.com', 'Captain Patel', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', 'KA01IJ7890', 'Yamaha Fascino', 'Grey', TRUE, TRUE, FALSE, 12.9740, 77.5940, 4.6, 180, 30000.00);

-- Insert sample documents for riders
INSERT INTO documents (rider_id, document_type, document_number, is_verified, verified_by, expires_at) VALUES
(1, 'license', 'DL1234567890123', TRUE, 1, '2025-12-31'),
(1, 'rc', 'RC1234567890123', TRUE, 1, '2024-12-31'),
(1, 'insurance', 'INS1234567890123', TRUE, 1, '2024-06-30'),
(2, 'license', 'DL2345678901234', TRUE, 1, '2025-12-31'),
(2, 'rc', 'RC2345678901234', TRUE, 1, '2024-12-31'),
(2, 'insurance', 'INS2345678901234', TRUE, 1, '2024-06-30'),
(3, 'license', 'DL3456789012345', TRUE, 1, '2025-12-31'),
(3, 'rc', 'RC3456789012345', TRUE, 1, '2024-12-31'),
(3, 'insurance', 'INS3456789012345', TRUE, 1, '2024-06-30'),
(4, 'license', 'DL4567890123456', TRUE, 1, '2025-12-31'),
(4, 'rc', 'RC4567890123456', TRUE, 1, '2024-12-31'),
(4, 'insurance', 'INS4567890123456', TRUE, 1, '2024-06-30'),
(5, 'license', 'DL5678901234567', TRUE, 1, '2025-12-31'),
(5, 'rc', 'RC5678901234567', TRUE, 1, '2024-12-31'),
(5, 'insurance', 'INS5678901234567', TRUE, 1, '2024-06-30');

-- Insert sample emergency contacts
INSERT INTO emergency_contacts (user_id, name, phone, relationship, is_primary) VALUES
(1, 'Mary Doe', '+919876543215', 'Spouse', TRUE),
(1, 'Tom Doe', '+919876543216', 'Father', FALSE),
(2, 'John Smith', '+919876543217', 'Spouse', TRUE),
(3, 'Lisa Wilson', '+919876543218', 'Sister', TRUE),
(4, 'Robert Johnson', '+919876543219', 'Brother', TRUE),
(5, 'Emily Brown', '+919876543220', 'Spouse', TRUE);

-- Insert sample locations
INSERT INTO locations (user_id, name, address, latitude, longitude, location_type, is_favorite) VALUES
(1, 'Home', '123 Main Street, Bangalore', 12.9716, 77.5946, 'home', TRUE),
(1, 'Office', '456 Tech Park, Bangalore', 12.9789, 77.5917, 'work', TRUE),
(1, 'Mall', 'Phoenix MarketCity, Bangalore', 12.9750, 77.5925, 'saved', FALSE),
(2, 'Home', '789 Park Avenue, Bangalore', 12.9720, 77.5930, 'home', TRUE),
(2, 'Office', '321 Business Center, Bangalore', 12.9740, 77.5940, 'work', TRUE),
(3, 'Home', '654 Lake View, Bangalore', 12.9730, 77.5950, 'home', TRUE),
(4, 'Home', '987 Garden Road, Bangalore', 12.9760, 77.5960, 'home', TRUE),
(5, 'Home', '147 Hill Station, Bangalore', 12.9770, 77.5970, 'home', TRUE);

-- Insert fare structure
INSERT INTO fare_structure (base_fare, per_km_rate, per_minute_rate, minimum_fare, cancellation_fee, is_active) VALUES
(30.00, 15.00, 2.00, 50.00, 20.00, TRUE);

-- Insert sample promo codes
INSERT INTO promo_codes (code, description, discount_type, discount_value, minimum_amount, maximum_discount, usage_limit, valid_from, valid_until, is_active) VALUES
('WELCOME50', 'Welcome discount for new users', 'percentage', 50.00, 100.00, 100.00, 1000, '2024-01-01 00:00:00', '2024-12-31 23:59:59', TRUE),
('FIRST25', 'First ride discount', 'percentage', 25.00, 50.00, 50.00, 500, '2024-01-01 00:00:00', '2024-12-31 23:59:59', TRUE),
('FLAT20', 'Flat discount of Rs. 20', 'fixed', 20.00, 100.00, 20.00, 200, '2024-01-01 00:00:00', '2024-12-31 23:59:59', TRUE),
('WEEKEND30', 'Weekend special discount', 'percentage', 30.00, 80.00, 60.00, 300, '2024-01-01 00:00:00', '2024-12-31 23:59:59', TRUE);

-- Insert sample SOS contacts
INSERT INTO sos_contacts (user_id, name, phone, relationship, is_primary) VALUES
(1, 'Emergency Contact 1', '+919876543225', 'Family', TRUE),
(2, 'Emergency Contact 2', '+919876543226', 'Family', TRUE),
(3, 'Emergency Contact 3', '+919876543227', 'Family', TRUE),
(4, 'Emergency Contact 4', '+919876543228', 'Family', TRUE),
(5, 'Emergency Contact 5', '+919876543229', 'Family', TRUE);

-- Insert admin users
INSERT INTO admin_users (username, email, password_hash, role, is_active) VALUES
('admin', 'admin@biketaxi.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', 'super_admin', TRUE),
('support1', 'support1@biketaxi.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', 'support', TRUE),
('support2', 'support2@biketaxi.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uOeG', 'support', TRUE);

-- Insert sample ride requests (for testing)
INSERT INTO ride_requests (user_id, pickup_latitude, pickup_longitude, pickup_address, drop_latitude, drop_longitude, drop_address, estimated_distance, estimated_duration, estimated_fare, status, rider_id, actual_distance, actual_duration, actual_fare, surge_multiplier) VALUES
(1, 12.9716, 77.5946, '123 Main Street, Bangalore', 12.9789, 77.5917, '456 Tech Park, Bangalore', 2.5, 15, 75.00, 'completed', 1, 2.3, 14, 72.00, 1.0),
(2, 12.9720, 77.5930, '789 Park Avenue, Bangalore', 12.9740, 77.5940, '321 Business Center, Bangalore', 1.8, 12, 60.00, 'completed', 2, 1.7, 11, 58.00, 1.0),
(3, 12.9730, 77.5950, '654 Lake View, Bangalore', 12.9750, 77.5925, 'Phoenix MarketCity, Bangalore', 3.2, 20, 90.00, 'completed', 3, 3.0, 19, 87.00, 1.2);

-- Insert sample rides
INSERT INTO rides (ride_request_id, user_id, rider_id, pickup_latitude, pickup_longitude, pickup_address, drop_latitude, drop_longitude, drop_address, distance, duration, base_fare, distance_fare, time_fare, surge_fare, total_fare, status, started_at, completed_at, payment_status) VALUES
(1, 1, 1, 12.9716, 77.5946, '123 Main Street, Bangalore', 12.9789, 77.5917, '456 Tech Park, Bangalore', 2.3, 14, 30.00, 34.50, 28.00, 0.00, 92.50, 'completed', '2024-01-15 09:00:00', '2024-01-15 09:14:00', 'completed'),
(2, 2, 2, 12.9720, 77.5930, '789 Park Avenue, Bangalore', 12.9740, 77.5940, '321 Business Center, Bangalore', 1.7, 11, 30.00, 25.50, 22.00, 0.00, 77.50, 'completed', '2024-01-15 10:00:00', '2024-01-15 10:11:00', 'completed'),
(3, 3, 3, 12.9730, 77.5950, '654 Lake View, Bangalore', 12.9750, 77.5925, 'Phoenix MarketCity, Bangalore', 3.0, 19, 30.00, 45.00, 38.00, 10.40, 123.40, 'completed', '2024-01-15 11:00:00', '2024-01-15 11:19:00', 'completed');

-- Insert sample payments
INSERT INTO payments (ride_id, user_id, rider_id, amount, payment_type, transaction_id, status) VALUES
(1, 1, 1, 92.50, 'upi', 'TXN123456789', 'completed'),
(2, 2, 2, 77.50, 'card', 'TXN123456790', 'completed'),
(3, 3, 3, 123.40, 'wallet', 'TXN123456791', 'completed');

-- Insert sample ratings
INSERT INTO ratings (ride_id, rated_by, rated_user_id, rated_rider_id, rating, comment) VALUES
(1, 'user', 1, 1, 5, 'Great service, very professional'),
(1, 'rider', 1, 1, 5, 'Good passenger, on time'),
(2, 'user', 2, 2, 4, 'Good ride, clean vehicle'),
(2, 'rider', 2, 2, 5, 'Excellent passenger'),
(3, 'user', 3, 3, 5, 'Best ride experience'),
(3, 'rider', 3, 3, 4, 'Good passenger');

-- Insert sample rider earnings
INSERT INTO rider_earnings (rider_id, ride_id, base_amount, commission_percentage, commission_amount, net_amount, incentive_amount, total_amount, payment_status) VALUES
(1, 1, 92.50, 20.00, 18.50, 74.00, 5.00, 79.00, 'paid'),
(2, 2, 77.50, 20.00, 15.50, 62.00, 3.00, 65.00, 'paid'),
(3, 3, 123.40, 20.00, 24.68, 98.72, 8.00, 106.72, 'paid');

-- Insert sample payment methods
INSERT INTO payment_methods (user_id, payment_type, payment_details, is_default, is_active) VALUES
(1, 'upi', '{"upi_id": "john.doe@okicici"}', TRUE, TRUE),
(1, 'card', '{"card_last4": "1234", "card_brand": "visa"}', FALSE, TRUE),
(2, 'wallet', '{"wallet_balance": 500.00}', TRUE, TRUE),
(2, 'upi', '{"upi_id": "jane.smith@paytm"}', FALSE, TRUE),
(3, 'card', '{"card_last4": "5678", "card_brand": "mastercard"}', TRUE, TRUE),
(4, 'cash', '{}', TRUE, TRUE),
(5, 'upi', '{"upi_id": "david.brown@phonepe"}', TRUE, TRUE); 