import { motion } from 'framer-motion';
import Nav from "./Nav";
import '../CSS/Hero.css';
import logo from '../assets/logo.png';

const Hero = () => {
  return (
    <motion.div 
      id="hero" 
      className='hero'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="logo"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 1 }}
      >
        </motion.div>
      <motion.div 
        className="hero-txt"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>RCV</h2>
      </motion.div>
    </motion.div>
  );
}

export default Hero;
