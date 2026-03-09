import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import VehicleTable from '../components/VehicleTable';
import Loader from '../components/Loader';
import { vehicleApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const initialForm = {
  vehicle_number: '',
  owner_name: '',
  model: '',
  vehicle_type: '',
  fuel_type: '',
  registration_date: '',
  rto_location: ''
};

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [query, setQuery] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadDashboard = async () => {
    setLoading(true);
    setError('');
    try {
      const [vehicleRes, analyticsRes] = await Promise.all([vehicleApi.getAll(), vehicleApi.getAnalytics()]);
      setVehicles(vehicleRes.data);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to load dashboard data.';
      setError(message);
      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const filteredVehicles = useMemo(() => {
    const key = query.toLowerCase();
    return vehicles.filter((v) =>
      [v.vehicle_number, v.owner_name, v.model, v.vehicle_type, v.fuel_type, v.rto_location]
        .join(' ')
        .toLowerCase()
        .includes(key)
    );
  }, [vehicles, query]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (editingId) {
        await vehicleApi.update(editingId, form);
      } else {
        await vehicleApi.add(form);
      }
      clearForm();
      await loadDashboard();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save vehicle record.');
      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id);
    setForm({
      vehicle_number: vehicle.vehicle_number,
      owner_name: vehicle.owner_name,
      model: vehicle.model,
      vehicle_type: vehicle.vehicle_type,
      fuel_type: vehicle.fuel_type,
      registration_date: String(vehicle.registration_date).slice(0, 10),
      rto_location: vehicle.rto_location || ''
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this vehicle record?')) return;
    try {
      await vehicleApi.remove(id);
      await loadDashboard();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed.');
    }
  };

  if (loading) return <Loader label="Loading admin dashboard..." />;

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <button onClick={logout} className="rounded-lg bg-red-500/80 px-4 py-2 text-sm font-semibold text-white">
          Logout
        </button>
      </div>

      {error && <p className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}

      {analytics && (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="glass-card rounded-xl p-4">
            <p className="text-sm text-slate-300">Total Vehicles</p>
            <p className="mt-2 text-3xl font-bold text-neonBlue">{analytics.totalVehicles}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-sm text-slate-300">Top Vehicle Type</p>
            <p className="mt-2 text-lg font-semibold text-white">{analytics.vehicleTypeCount?.[0]?.vehicle_type || '-'}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-sm text-slate-300">Recent Searches</p>
            <p className="mt-2 text-lg font-semibold text-white">{analytics.recentSearches?.length || 0}</p>
          </div>
        </div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card mt-6 rounded-2xl p-5"
      >
        <h2 className="text-xl font-bold text-neonBlue">{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {Object.keys(initialForm).map((field) => (
            <input
              key={field}
              name={field}
              type={field === 'registration_date' ? 'date' : 'text'}
              value={form[field]}
              onChange={handleChange}
              required={field !== 'rto_location'}
              placeholder={field.replace('_', ' ').replace(/\b\w/g, (m) => m.toUpperCase())}
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:ring focus:ring-neonBlue/40"
            />
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-neonBlue px-4 py-2 text-sm font-semibold text-asphalt disabled:opacity-50"
          >
            {saving ? 'Saving...' : editingId ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
          {editingId && (
            <button type="button" onClick={clearForm} className="rounded-lg border border-white/20 px-4 py-2 text-sm">
              Cancel Edit
            </button>
          )}
        </div>
      </motion.form>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search by number, owner, model..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:ring focus:ring-neonBlue/40"
        />
      </div>

      <VehicleTable vehicles={filteredVehicles} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminDashboard;
