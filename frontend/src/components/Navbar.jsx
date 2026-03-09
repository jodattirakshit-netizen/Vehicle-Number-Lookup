import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSearchLink from './AnimatedSearchLink';

const links = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Search Vehicle' },
  { to: '/admin/login', label: 'Admin Login' }
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-asphalt/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="text-lg font-bold tracking-wide text-neonBlue">
          Vehicle Lookup
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          {links.map((link) =>
            link.to === '/search' ? (
              <AnimatedSearchLink
                key={link.to}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  location.pathname === '/search'
                    ? 'bg-white/15 text-neonBlue'
                    : 'text-slate-200 hover:bg-white/10 hover:text-neonBlue'
                }`}
              >
                {link.label}
              </AnimatedSearchLink>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm transition ${
                    isActive ? 'bg-white/15 text-neonBlue' : 'text-slate-200 hover:bg-white/10 hover:text-neonBlue'
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
          <motion.div whileHover={{ scale: 1.05 }}>
            <AnimatedSearchLink className="rounded-lg bg-electric px-4 py-2 text-sm font-semibold text-white shadow-neon">
              Go
            </AnimatedSearchLink>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
