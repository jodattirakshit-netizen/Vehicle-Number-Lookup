import { motion } from 'framer-motion';

const SearchBar = ({ value, onChange, onSubmit, placeholder = 'Enter vehicle number (e.g., KA01AB1234)' }) => {
  return (
    <form onSubmit={onSubmit} className="glass-card mx-auto flex w-full max-w-2xl flex-col gap-3 rounded-2xl p-4 md:flex-row">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none ring-neonBlue/60 transition focus:ring"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-xl bg-neonBlue px-5 py-3 text-sm font-semibold text-asphalt"
      >
        Search
      </motion.button>
    </form>
  );
};

export default SearchBar;
