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
        <p>Una empresa que nace con el objetivo de brindar bienestar a todos nuestros intermediarios, clientes y aliados. A través de la propuesta “Cuida lo tuyo”, nos orientamos a una promesa de valor enfocada en ofrecer productos y servicios flexibles e innovadores, adaptados a las dinámicas del entorno, abordando los negocios desde una perspectiva abierta y cercana en línea con las nuevas exigencias del negocio asegurador.</p>
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
