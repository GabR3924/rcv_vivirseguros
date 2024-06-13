import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { MdMenu } from "react-icons/md";
import { Link } from 'react-router-dom';
import figlogo from '../assets/figlogo.png';
import '../CSS/Nav.css';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav  initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}>
      <div className="brand-container">
        <motion.div 
          className="brand" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={figlogo} alt="logo" />
        </motion.div>

        {/* Menú para dispositivos normales */}
        <motion.div s
          className="links-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <ul className="links">
            <li><Link to="/">Inicio</Link></li>
            <li><a href="/#about">Productos</a></li>
            <li><a href="/#info">Servicios</a></li>
            <li><a href="/#plans">Nosotros</a></li>
          </ul>
        </motion.div>

        <motion.div 
          className="contacto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <a href=""><FaInstagram className="icon" /></a>
          <a href=""><FaFacebookF className="icon" /></a>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="contact-btn"
          >
            Contactanos
          </motion.button>
        </motion.div>
      </div>

      {/* Menú para dispositivos móviles */}
      <div className="menu-responsive-mobile">
        <MdMenu className="menu-icon" onClick={toggleMenu} />

        {isMenuOpen && (
          <motion.ul 
            className="links"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
          >
            <li><Link to="/">Inicio</Link></li>
            <li><a href="/#about">Productos</a></li>
            <li><a href="/#info">Servicios</a></li>
            <li><a href="/#plans">Nosotros</a></li>
          </motion.ul>
        )}

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="contact-btn"
          >
            Contactanos
          </motion.button>
      </div>
     
    </motion.nav>
  );
}

export default Nav;
