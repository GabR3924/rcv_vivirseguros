import "../CSS/info.css";
import { GiTowTruck } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { GiHealing } from "react-icons/gi";
import { FaHandHoldingMedical } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";

const Info = () => {
  const infoCards = [
    {
        title: "Cobertura de Responsabilidad Civil Vehicular",
        img: <FaCar />, 
        data:
            "Cubre los daños a terceros causados por el vehículo asegurado en un accidente de tránsito donde el asegurado es responsable. Incluye daños a personas y a cosas, con límites definidos según el tipo y uso del vehículo.",
    },
    {
        title: "Cobertura de Exceso de Límite",
        img: <IoIosPeople />,
        data:
            "Proporciona cobertura adicional a la de Responsabilidad Civil Vehicular, ofreciendo mayor protección según la suma asegurada.",
    },
    {
        title: "Cobertura de Defensa Penal",
        img: <GiHealing />,
        data:
            "Cubre los gastos legales derivados de la detención del conductor y/o del vehículo asegurado tras un accidente de tránsito, hasta el límite asegurado.",
    },
    {
        title: "Cobertura de Accidentes para Ocupantes del Vehículo",
        img: <FaHandHoldingMedical />,
        data:
            "Establece sumas aseguradas para muerte accidental, invalidez permanente y gastos médicos para cada ocupante del vehículo asegurado en caso de accidente de tránsito.",
    },
    {
        title: "Telemedicina",
        img: <MdVideoCall />,
        data:
            "Permite al asegurado o propietario del vehículo consultar a un médico las 24 horas del día mediante llamada telefónica o videollamada.",
    },
    {
        title: "Asistencia en Viajes",
        img: <GiTowTruck />,
        data:
            "Ofrece tres servicios de grúa: uno de hasta 100 km y dos de hasta 45 km, para resolver imprevistos por avería o accidente y trasladar el vehículo a un lugar seguro. Válido para vehículos particulares, rústicos y pick-ups de hasta 20 años de antigüedad.",
    },
];

  

  return (
    <div id="info"
    className="info">
  
      <div
        className="tituloInfo"
        
      >
        <h1>Qué Incluyen</h1>
      
      </div>

      <div className="custom-info-cards-container">
        {infoCards.map((card, index) => (
          <div className="custom-info-card" key={index}>
            <div className="icon">{card.img}</div>
            <h2>{card.title}</h2>
            <p>{card.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
