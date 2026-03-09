const {
  detectRtoLocation,
  getAllVehicles,
  getVehicleByNumber,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  createSearchHistory,
  getAnalyticsSummary
} = require('../models/vehicleModel');

const REQUIRED_FIELDS = [
  'vehicle_number',
  'owner_name',
  'model',
  'vehicle_type',
  'fuel_type',
  'registration_date'
];

const normalizeVehicleNumber = (value) => String(value || '').toUpperCase().replace(/\s+/g, '');

const validateVehiclePayload = (payload) => {
  for (const field of REQUIRED_FIELDS) {
    if (!payload[field]) {
      return `${field} is required.`;
    }
  }

  const isDateValid = !Number.isNaN(new Date(payload.registration_date).getTime());
  if (!isDateValid) {
    return 'registration_date must be a valid date.';
  }

  return null;
};

const fetchVehicles = async (_req, res, next) => {
  try {
    const vehicles = await getAllVehicles();
    return res.json(vehicles);
  } catch (error) {
    return next(error);
  }
};

const fetchVehicleByNumber = async (req, res, next) => {
  try {
    const vehicleNumber = normalizeVehicleNumber(req.params.number);
    const vehicle = await getVehicleByNumber(vehicleNumber);
    await createSearchHistory(vehicleNumber, Boolean(vehicle));

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }

    return res.json(vehicle);
  } catch (error) {
    return next(error);
  }
};

const addVehicle = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      vehicle_number: normalizeVehicleNumber(req.body.vehicle_number)
    };

    const validationError = validateVehiclePayload(payload);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    payload.rto_location = payload.rto_location || detectRtoLocation(payload.vehicle_number) || 'Unknown RTO';

    const insertedId = await createVehicle(payload);
    return res.status(201).json({ message: 'Vehicle created successfully.', id: insertedId });
  } catch (error) {
    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Vehicle number already exists.' });
    }
    return next(error);
  }
};

const editVehicle = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      vehicle_number: normalizeVehicleNumber(req.body.vehicle_number)
    };

    const validationError = validateVehiclePayload(payload);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    payload.rto_location = payload.rto_location || detectRtoLocation(payload.vehicle_number) || 'Unknown RTO';

    const affectedRows = await updateVehicle(req.params.id, payload);
    if (!affectedRows) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }

    return res.json({ message: 'Vehicle updated successfully.' });
  } catch (error) {
    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Vehicle number already exists.' });
    }
    return next(error);
  }
};

const removeVehicle = async (req, res, next) => {
  try {
    const affectedRows = await deleteVehicle(req.params.id);
    if (!affectedRows) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }

    return res.json({ message: 'Vehicle deleted successfully.' });
  } catch (error) {
    return next(error);
  }
};

const fetchAnalytics = async (_req, res, next) => {
  try {
    const analytics = await getAnalyticsSummary();
    return res.json(analytics);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  fetchVehicles,
  fetchVehicleByNumber,
  addVehicle,
  editVehicle,
  removeVehicle,
  fetchAnalytics
};
