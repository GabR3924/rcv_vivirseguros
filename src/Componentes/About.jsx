import { motion } from 'framer-motion';
import React from 'react';
import info from '../assets/info.jpg';
import '../CSS/about.css';

const About = () => {
  return (
    <motion.div 
      id='about'
      className='about'
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="info"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        <h2>¿Quienes Somos?</h2>
        <p>Somos un grupo profesionales de asistencia y consultoría que actúa como canal e intermediario entre el proveedor y el usuario.


Contamos con un equipo de trabajo innovador y comprometido, que a través de la tecnología (una aplicación online), ayuda a solucionar las necesidades y cumplir las expectativas de los usuarios.</p>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <a href="#plans" style={{ color: 'white', textDecoration:'none' }}>Servicios</a>

        </motion.button>
      </motion.div>

      <motion.div 
        className="info-img"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
      >
        <img src={info} alt="" />
      </motion.div>
    </motion.div>
  );
}

export default About;
