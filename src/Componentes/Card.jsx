import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FaCircleCheck } from 'react-icons/fa6';
import '../CSS/Card.css';

// Estilos personalizados para el modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0', // Remueve el padding por defecto
    border: 'none', // Remueve el borde por defecto
    background: '#fff', // Fondo blanco
    borderRadius: '8px', // Bordes redondeados
    maxWidth: '400px', // Ancho máximo
    margin: 'auto', // Centrado
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra
  },
};

// Estilos para el overlay del modal
const overlayStyles = {
  background: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
};

const Card = ({ title, precio, data, establishment, extraServicePrice, onBuyClick, extraServiceName }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleBuyClick = () => {
    setModalIsOpen(true);
    onBuyClick(precio);
    console.log("Nombre del plan:", title);
    console.log("Nombre del servicio extra:", extraServiceName);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación aquí (por ejemplo, validar usuario y contraseña)
    // Si la autenticación es exitosa, redirigir al formulario con los datos del plan
    navigate(`/formulario/${establishment}?planPrice=${precio}&extraServicePrice=${extraServicePrice}&planName=${title}&extraServiceName=${extraServiceName}`);
    closeModal();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div id="card">
      <h2>{title}</h2>
      <h1>{precio}</h1>
      <ul>
        {Object.keys(data).map((key, index) => (
          <li key={index}>
            <FaCircleCheck className="icon" />
            {data[key]}
          </li>
        ))}
      </ul>
      <button className="card-btn" onClick={handleBuyClick}>Comprar</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{ content: customStyles.content, overlay: overlayStyles }}
        contentLabel="Login Modal"
        ariaHideApp={false}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '40px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', color: '#333' }}>Login</h2>
          <button onClick={closeModal} style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#999', padding: '40px'  }}>&times;</button>
        </div>
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', padding: '40px'  }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="username" style={{ fontSize: '14px', color: '#333', marginBottom: '5px', display: 'block' }}>Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ fontSize: '14px', color: '#333', marginBottom: '5px', display: 'block' }}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', width: '100%' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px', border: 'none', borderRadius: '4px', background: '#007bff', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>Login</button>
        </form>
      </Modal>
    </div>
  );
};

export default Card;
