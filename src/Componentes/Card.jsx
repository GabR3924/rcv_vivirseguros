import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircleCheck } from 'react-icons/fa6';
import '../CSS/Card.css';

const Card = ({ title, precio, data, establishment, extraServicePrice, onBuyClick, extraServiceName }) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    onBuyClick(precio);
    console.log("Nombre del plan:", title);
    console.log("Nombre del servicio extra:", extraServiceName);
    // Redirigir al formulario con los datos del plan
    navigate(`/formulario/${establishment}?planPrice=${precio}&extraServicePrice=${extraServicePrice}&planName=${title}&extraServiceName=${extraServiceName}`);
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
    </div>
  );
};

export default Card;
