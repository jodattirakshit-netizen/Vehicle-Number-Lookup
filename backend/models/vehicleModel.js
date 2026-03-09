const pool = require('../config/db');

const RTO_MAP = {
  KA01: 'Karnataka Bangalore Central',
  KA02: 'Karnataka Bangalore West',
  MH01: 'Maharashtra Mumbai South',
  MH12: 'Maharashtra Pune',
  DL01: 'Delhi Mall Road',
  TN01: 'Tamil Nadu Chennai Central',
  UP32: 'Uttar Pradesh Lucknow',
  GJ01: 'Gujarat Ahmedabad'
};

const detectRtoLocation = (vehicleNumber) => {
  const normalized = String(vehicleNumber || '').toUpperCase().replace(/\s+/g, '');
  const code = normalized.slice(0, 4);
  return RTO_MAP[code] || null;
};

const getAllVehicles = async () => {
  const [rows] = await pool.query('SELECT * FROM vehicles ORDER BY created_at DESC');
  return rows;
};

const getVehicleByNumber = async (vehicleNumber) => {
  const [rows] = await pool.query('SELECT * FROM vehicles WHERE vehicle_number = ?', [vehicleNumber]);
  return rows[0] || null;
};

const createVehicle = async (payload) => {
  const [result] = await pool.query(
    `INSERT INTO vehicles
      (vehicle_number, owner_name, model, vehicle_type, fuel_type, registration_date, rto_location)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.vehicle_number,
      payload.owner_name,
      payload.model,
      payload.vehicle_type,
      payload.fuel_type,
      payload.registration_date,
      payload.rto_location
    ]
  );

  return result.insertId;
};

const updateVehicle = async (id, payload) => {
  const [result] = await pool.query(
    `UPDATE vehicles
     SET vehicle_number = ?, owner_name = ?, model = ?, vehicle_type = ?, fuel_type = ?,
         registration_date = ?, rto_location = ?
     WHERE id = ?`,
    [
      payload.vehicle_number,
      payload.owner_name,
      payload.model,
      payload.vehicle_type,
      payload.fuel_type,
      payload.registration_date,
      payload.rto_location,
      id
    ]
  );

  return result.affectedRows;
};

const deleteVehicle = async (id) => {
  const [result] = await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
  return result.affectedRows;
};

const createSearchHistory = async (vehicleNumber, found) => {
  await pool.query(
    'INSERT INTO search_history (vehicle_number, found) VALUES (?, ?)',
    [vehicleNumber, found ? 1 : 0]
  );
};

const getRecentSearches = async (limit = 10) => {
  const [rows] = await pool.query(
    'SELECT id, vehicle_number, found, searched_at FROM search_history ORDER BY searched_at DESC LIMIT ?',
    [Number(limit)]
  );
  return rows;
};

const getAnalyticsSummary = async () => {
  const [[totals]] = await pool.query('SELECT COUNT(*) AS total_vehicles FROM vehicles');
  const [vehicleTypeCount] = await pool.query(
    'SELECT vehicle_type, COUNT(*) AS count FROM vehicles GROUP BY vehicle_type ORDER BY count DESC'
  );
  const [fuelTypeCount] = await pool.query(
    'SELECT fuel_type, COUNT(*) AS count FROM vehicles GROUP BY fuel_type ORDER BY count DESC'
  );
  const recentSearches = await getRecentSearches(8);

  return {
    totalVehicles: totals.total_vehicles,
    vehicleTypeCount,
    fuelTypeCount,
    recentSearches
  };
};

module.exports = {
  detectRtoLocation,
  getAllVehicles,
  getVehicleByNumber,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  createSearchHistory,
  getRecentSearches,
  getAnalyticsSummary
};
