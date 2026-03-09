import { motion } from 'framer-motion';
import AnimatedSearchLink from '../components/AnimatedSearchLink';

const features = [
  {
    title: 'Instant Vehicle Lookup',
    description: 'Retrieve owner and registration details securely by vehicle number in seconds.'
  },
  {
    title: 'Admin Vehicle Management',
    description: 'Admins can create, edit, delete, and search records from one dashboard.'
  },
  {
    title: 'Smart Insights',
    description: 'Monitor total records, type distribution, and recent lookup activity.'
  }
];

const Landing = () => {
  return (
    <div className="auto-grid min-h-[calc(100vh-70px)] px-5 pb-12 pt-10">
      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black leading-tight text-white md:text-6xl"
          >
            Vehicle Number <span className="text-neonBlue">Lookup System</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-xl text-slate-300"
          >
            A fast, secure platform for checking vehicle registration details with enterprise-grade admin controls.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-7"
          >
            <AnimatedSearchLink className="rounded-xl bg-neonBlue px-6 py-3 font-semibold text-asphalt shadow-neon">
              Search Vehicle
            </AnimatedSearchLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card relative overflow-hidden rounded-3xl p-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/10 to-electric/5" />
          <div className="relative z-10">
            <div className="car-scene">
              <div className="car-drive-in">
                <div className="car-body">
                  <div className="car-top" />
                  <div className="car-wheel car-wheel-left" />
                  <div className="car-wheel car-wheel-right" />
                </div>
              </div>
              <div className="road-line road-line-1" />
              <div className="road-line road-line-2" />
              <div className="road-line road-line-3" />
            </div>
            <p className="mt-5 text-lg text-slate-200">Realtime lookup • Secure JWT auth • Analytics dashboard</p>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mt-16 grid w-full max-w-7xl gap-5 md:grid-cols-3">
        {features.map((feature, idx) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-neonBlue">{feature.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{feature.description}</p>
          </motion.article>
        ))}
      </section>

      <footer className="mx-auto mt-16 w-full max-w-7xl border-t border-white/10 pt-6 text-sm text-slate-400">
        Vehicle Number Lookup System | Built with React, Express, MySQL, TailwindCSS, and Framer Motion.
      </footer>
    </div>
  );
};

export default Landing;
