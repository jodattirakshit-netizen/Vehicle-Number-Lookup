import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import VehicleCard from '../components/VehicleCard';
import Loader from '../components/Loader';
import { vehicleApi } from '../services/api';

const SearchVehicle = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!vehicleNumber.trim()) {
      setError('Please enter a vehicle number.');
      return;
    }

    setLoading(true);
    setError('');
    setVehicle(null);

    try {
      const response = await vehicleApi.searchByNumber(vehicleNumber.trim());
      setVehicle(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Vehicle not found.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-3 text-3xl font-bold text-white">Search Vehicle</h1>
        <p className="mb-8 text-slate-300">Enter registration number to fetch vehicle details.</p>

        <SearchBar value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} onSubmit={handleSearch} />

        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>

        {error && <p className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
        {vehicle && <VehicleCard vehicle={vehicle} />}
      </div>
    </motion.div>
  );
};

export default SearchVehicle;
