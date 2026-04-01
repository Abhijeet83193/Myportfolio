import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: { width: 120, height: 36 },
    medium: { width: 200, height: 60 },
    large: { width: 280, height: 84 }
  };

  const { width, height } = sizes[size] || sizes.medium;

  return (
    <motion.a
      href="#home"
      className={`logo-container ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      style={{ width, height, display: 'block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 60"
        fill="none"
        width="100%"
        height="100%"
      >
        {/* Left bracket */}
        <motion.path
          d="M35 15 L15 30 L35 45"
          stroke="#354230"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        
        {/* AD monogram */}
        <motion.text
          x="50"
          y="42"
          fontFamily="Kranky, cursive"
          fontSize="28"
          fill="#354230"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          AD
        </motion.text>
        
        {/* Right bracket with slash */}
        <motion.path
          d="M125 15 L145 30 L125 45"
          stroke="#354230"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        />
        <motion.path
          d="M135 15 L125 45"
          stroke="#727D73"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
        />
        
        {/* Subtle accent dot */}
        <motion.circle
          cx="155"
          cy="40"
          r="3"
          fill="#727D73"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.7, type: 'spring' }}
        />
      </svg>
    </motion.a>
  );
};

export default Logo;
