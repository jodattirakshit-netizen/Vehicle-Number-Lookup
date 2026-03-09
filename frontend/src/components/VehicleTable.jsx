import { motion } from 'framer-motion';

const VehicleTable = ({ vehicles, onEdit, onDelete }) => {
  return (
    <div className="glass-card mt-6 overflow-x-auto rounded-2xl p-4">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-slate-300">
            <th className="px-3 py-3">Vehicle No.</th>
            <th className="px-3 py-3">Owner</th>
            <th className="px-3 py-3">Model</th>
            <th className="px-3 py-3">Type</th>
            <th className="px-3 py-3">Fuel</th>
            <th className="px-3 py-3">Reg Date</th>
            <th className="px-3 py-3">RTO</th>
            <th className="px-3 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <motion.tr
              key={vehicle.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className="border-b border-white/5 text-slate-100 hover:bg-white/5"
            >
              <td className="px-3 py-3 font-semibold">{vehicle.vehicle_number}</td>
              <td className="px-3 py-3">{vehicle.owner_name}</td>
              <td className="px-3 py-3">{vehicle.model}</td>
              <td className="px-3 py-3">{vehicle.vehicle_type}</td>
              <td className="px-3 py-3">{vehicle.fuel_type}</td>
              <td className="px-3 py-3">{String(vehicle.registration_date).slice(0, 10)}</td>
              <td className="px-3 py-3">{vehicle.rto_location}</td>
              <td className="px-3 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(vehicle)}
                    className="rounded-md bg-electric px-3 py-1 text-xs font-semibold text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(vehicle.id)}
                    className="rounded-md bg-red-500/80 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      {!vehicles.length && <p className="py-8 text-center text-slate-300">No vehicles available.</p>}
    </div>
  );
};

export default VehicleTable;
