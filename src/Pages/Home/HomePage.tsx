import React from 'react';
import { motion } from 'framer-motion';




const HomePage: React.FC = () => {
  return (
    <motion.div className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 , ease: 'easeInOut' }}
    >
    </motion.div>
  );
}

export default HomePage;