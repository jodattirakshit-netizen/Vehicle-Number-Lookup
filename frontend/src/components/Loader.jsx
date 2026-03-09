import { motion } from 'framer-motion';

const Loader = ({ label = 'Searching vehicle records...' }) => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <motion.div
        className="text-5xl"
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        ??
      </motion.div>
      <motion.p
        className="text-sm text-slate-200"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {label}
      </motion.p>
    </div>
  );
};

export default Loader;
