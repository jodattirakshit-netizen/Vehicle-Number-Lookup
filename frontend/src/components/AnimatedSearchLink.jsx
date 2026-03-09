import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

const AnimatedSearchLink = ({ className = '', children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    if (isAnimating) return;

    setIsAnimating(true);
    timerRef.current = setTimeout(() => {
      navigate('/search');
      setIsAnimating(false);
    }, 2000);
  };

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const animationOverlay = (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-black via-slateDark to-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.97 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_76%_52%,rgba(0,229,255,0.32),transparent_36%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.7, 0.35] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          />

          <motion.div
            className="absolute bottom-12 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-neonBlue/90 to-transparent"
            initial={{ x: 280 }}
            animate={{ x: -340 }}
            transition={{ duration: 0.95, repeat: 1, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-8 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-electric/80 to-transparent"
            initial={{ x: 360 }}
            animate={{ x: -380 }}
            transition={{ duration: 1.05, repeat: 1, delay: 0.15, ease: 'linear' }}
          />

          <motion.svg
            viewBox="0 0 460 190"
            className="absolute bottom-20 h-[180px] w-[420px] drop-shadow-[0_20px_28px_rgba(0,229,255,0.5)]"
            initial={{ x: '-48vw', opacity: 0 }}
            animate={{ x: '125vw', opacity: [0, 1, 1, 0.2] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.95, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <defs>
              <linearGradient id="carPaint" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="52%" stopColor="#0FB4FF" />
                <stop offset="100%" stopColor="#136DFF" />
              </linearGradient>
              <linearGradient id="glassTint" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#BDF6FF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#6FD9FF" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            <path
              d="M42 122C56 92 83 76 115 76H238C269 76 294 86 319 110L361 110C381 110 396 126 396 145H32C31 136 35 127 42 122Z"
              fill="url(#carPaint)"
            />
            <path d="M132 74L173 36H256L311 74Z" fill="url(#glassTint)" />
            <rect x="126" y="95" width="188" height="9" rx="4.5" fill="#7EECFF" fillOpacity="0.45" />
            <ellipse cx="95" cy="149" rx="30" ry="30" fill="#0A1424" stroke="#C8F4FF" strokeWidth="8" />
            <ellipse cx="300" cy="149" rx="30" ry="30" fill="#0A1424" stroke="#C8F4FF" strokeWidth="8" />
            <rect x="392" y="118" width="55" height="11" rx="5.5" fill="#AAFFE4" fillOpacity="0.92" />
            <rect x="18" y="121" width="20" height="8" rx="4" fill="#8CEBFF" fillOpacity="0.8" />
          </motion.svg>

          <motion.div
            className="absolute bottom-[118px] left-0 h-[5px] w-[220px] rounded-full bg-gradient-to-r from-transparent via-mint/95 to-transparent blur-[1px]"
            initial={{ x: '-45vw', opacity: 0 }}
            animate={{ x: '128vw', opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: 1.9, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        {children}
      </button>
      {mounted ? createPortal(animationOverlay, document.body) : null}
    </>
  );
};

export default AnimatedSearchLink;
