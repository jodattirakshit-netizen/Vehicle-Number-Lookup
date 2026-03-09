import { motion } from 'framer-motion';

const Item = ({ label, value }) => (
  <div className="rounded-lg border border-white/10 bg-black/20 p-3">
    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
    <p className="mt-1 text-sm font-semibold text-white">{value || '-'}</p>
  </div>
);

const VehicleCard = ({ vehicle }) => {
  if (!vehicle) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      className="glass-card mx-auto mt-8 max-w-4xl rounded-2xl p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-bold text-neonBlue">Vehicle Details</h3>
        <span className="rounded-full bg-neonBlue/20 px-3 py-1 text-xs text-neonBlue">Verified Record</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Item label="Vehicle Number" value={vehicle.vehicle_number} />
        <Item label="Owner Name" value={vehicle.owner_name} />
        <Item label="Vehicle Model" value={vehicle.model} />
        <Item label="Vehicle Type" value={vehicle.vehicle_type} />
        <Item label="Fuel Type" value={vehicle.fuel_type} />
        <Item label="Registration Date" value={String(vehicle.registration_date).slice(0, 10)} />
        <Item label="RTO Location" value={vehicle.rto_location} />
      </div>
    </motion.div>
  );
};

export default VehicleCard;
