// Card.jsx
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import '../CSS/Card.css';

const Card = ({ title, precio, data, establishment, extraServicePrice, onBuyClick, extraServiceName }) => {
  const handleBuyClick = () => {
    // Llama a la función onBuyClick y pasa el precio como argumento
    onBuyClick(precio);
    console.log("Nombre del plan:", title);
    console.log("Nombre del servicio extra:", extraServiceName);
  };

  return (
    <div id="card">
      <h2>{title}</h2>
      <h1>{precio}</h1>
      <ul>
        {Object.keys(data).map((key, index) => (
          <li key={index}>
            <FaCircleCheck className="icon"/>
            {data[key]}
          </li>
        ))}
      </ul>
      <Link to={`/formulario/${establishment}?planPrice=${precio}&extraServicePrice=${extraServicePrice}&planName=${title}&extraServiceName=${extraServiceName}`}>
        <button className="card-btn" onClick={handleBuyClick}>Comprar</button>
      </Link>
    </div>
  );
};

export default Card;
