const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = process.env.DB_PATH || path.join(__dirname, '../database/bike_taxi.db');
const seedsPath = path.join(__dirname, '../database/seeds.sql');

const db = new sqlite3.Database(dbPath);

// First, clear existing data to avoid unique constraint violations
const clearDataQueries = [
  'DELETE FROM rider_earnings',
  'DELETE FROM ratings',
  'DELETE FROM payments',
  'DELETE FROM rides',
  'DELETE FROM ride_requests',
  'DELETE FROM payment_methods',
  'DELETE FROM sos_contacts',
  'DELETE FROM promo_codes',
  'DELETE FROM emergency_contacts',
  'DELETE FROM locations',
  'DELETE FROM documents',
  'DELETE FROM riders',
  'DELETE FROM users',
  'DELETE FROM admin_users',
  'DELETE FROM fare_structure'
];

console.log('Clearing existing data...');

// Execute clear queries sequentially
let currentIndex = 0;
function executeClearQueries() {
  if (currentIndex >= clearDataQueries.length) {
    // All clear queries done, now seed the data
    seedData();
    return;
  }
  
  db.run(clearDataQueries[currentIndex], (err) => {
    if (err) {
      console.error(`Error clearing data: ${err.message}`);
    }
    currentIndex++;
    executeClearQueries();
  });
}

function seedData() {
  console.log('Seeding database with sample data...');
  const seeds = fs.readFileSync(seedsPath, 'utf8');
  
  db.exec(seeds, (err) => {
    if (err) {
      console.error('Error seeding database:', err.message);
      process.exit(1);
    }
    console.log('Database seeded successfully.');
    db.close();
  });
}

// Start the process
executeClearQueries(); 