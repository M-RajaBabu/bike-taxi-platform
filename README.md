# Bike Taxi Platform Backend API

A complete backend API for a Bike Taxi Platform (like Rapido) built with Node.js (Express.js) and SQLite.

## Features
- JWT-based authentication for Users and Riders (Captains)
- OTP generation and verification
- User, Rider, Ride, Payment, Ratings, Promo, SOS, and Admin APIs
- Real-time location tracking (Socket.io)
- Dynamic fare calculation and surge pricing
- Rider assignment (nearest rider)
- Rider earnings and incentives
- Input validation, error handling, and request logging
- Security best practices (rate limiting, SQL injection prevention)

## Folder Structure
```
controllers/    # Route handlers
routes/         # API route definitions
models/         # Database access and business logic
middleware/     # Express middlewares (auth, validation, error, logging)
utils/          # Helper utilities (OTP, fare, distance, etc.)
database/       # schema.sql, seeds.sql
scripts/        # DB init/seed scripts
uploads/        # Uploaded documents
```

## Setup Instructions
1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   - Copy `env.example` to `.env` and fill in the values
4. **Initialize the database**
   ```bash
   npm run init-db
   npm run seed
   ```
5. **Start the server**
   ```bash
   npm run dev
   ```

## Database Design
- See `database/schema.sql` for full schema
- See `database/seeds.sql` for sample data

## Assumptions
- OTPs are sent via Twilio (SMS) or email (Nodemailer)
- Payments are simulated (Stripe keys for future integration)
- Real-time tracking via Socket.io (can be extended)
- Admin APIs are protected and require admin JWT

## API Documentation
- Postman collection included (see `postman_collection.json`)

## Authentication API Endpoints (for Postman)

### User APIs
- **Send OTP (User Registration)**
  - `POST /api/auth/user/send-otp`
  - Body:
    ```json
    {
      "phone": "+919876543210",
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```
- **Verify OTP & Register User**
  - `POST /api/auth/user/verify-otp`
  - Body:
    ```json
    {
      "phone": "+919876543210",
      "otp": "<OTP_FROM_CONSOLE>",
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```
- **User Login**
  - `POST /api/auth/user/login`
  - Body:
    ```json
    {
      "phone": "+919876543210"
    }
    ```

### Rider APIs
- **Send OTP (Rider Registration)**
  - `POST /api/auth/rider/send-otp`
  - Body:
    ```json
    {
      "phone": "+919876543220",
      "name": "Captain Raj",
      "email": "captain.raj@example.com",
      "vehicle_number": "KA01AB1234",
      "vehicle_model": "Honda Activa",
      "vehicle_color": "White"
    }
    ```
- **Verify OTP & Register Rider**
  - `POST /api/auth/rider/verify-otp`
  - Body:
    ```json
    {
      "phone": "+919876543220",
      "otp": "<OTP_FROM_CONSOLE>",
      "name": "Captain Raj",
      "email": "captain.raj@example.com",
      "vehicle_number": "KA01AB1234",
      "vehicle_model": "Honda Activa",
      "vehicle_color": "White"
    }
    ```
- **Rider Login**
  - `POST /api/auth/rider/login`
  - Body:
    ```json
    {
      "phone": "+919876543220"
    }
    ```

### Token Refresh
- **Refresh Token**
  - `POST /api/auth/refresh`
  - Body:
    ```json
    {
      "refresh_token": "<REFRESH_TOKEN_FROM_LOGIN>"
    }
    ```

## Ride APIs
- **Estimate Fare & Find Nearest Rider**
  - `POST /api/rides/estimate`
  - Body:
    ```json
    {
      "pickup_latitude": 12.9716,
      "pickup_longitude": 77.5946,
      "drop_latitude": 12.9789,
      "drop_longitude": 77.5917
    }
    ```
- **Book Ride**
  - `POST /api/rides/book`
  - Body:
    ```json
    {
      "pickup_latitude": 12.9716,
      "pickup_longitude": 77.5946,
      "pickup_address": "123 Main Street, Bangalore",
      "drop_latitude": 12.9789,
      "drop_longitude": 77.5917,
      "drop_address": "456 Tech Park, Bangalore"
    }
    ```
- **Cancel Ride**
  - `POST /api/rides/:id/cancel`
- **Get Current Ride**
  - `GET /api/rides/current`
- **Get Ride History**
  - `GET /api/rides/history`

## Payment APIs
- **Add Payment Method**
  - `POST /api/payments/methods`
  - Body:
    ```json
    {
      "payment_type": "upi",
      "payment_details": "{\"upi_id\":\"john.doe@okicici\"}"
    }
    ```
- **Process Payment**
  - `POST /api/payments/process`
  - Body:
    ```json
    {
      "ride_id": 1,
      "payment_method_id": 1
    }
    ```

## Rating APIs
- **Submit Ride Feedback**
  - `POST /api/ratings/ride`
  - Body:
    ```json
    {
      "ride_id": 1,
      "rating": 5,
      "comment": "Great ride!"
    }
    ```

## Location APIs
- **Save Location**
  - `POST /api/locations/save`
  - Body:
    ```json
    {
      "name": "Home",
      "address": "123 Main Street, Bangalore",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "location_type": "home"
    }
    ```
- **Get Saved Locations**
  - `GET /api/locations/saved`

## Admin APIs
- **Verify Rider**
  - `POST /api/admin/riders/:id/verify`
- **Get Ride Analytics**
  - `GET /api/admin/analytics/rides`

## License
MIT 

Bike Taxi Platform API running on port 3001
Connected to SQLite database. 