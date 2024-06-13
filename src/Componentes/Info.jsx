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
      title: "Cobertura de R.C.V",
      img: <FaCar />, // Asigna la imagen importada aquí
      data:
        "Ampara los daños que pueda ocasionar el vehículo asegurado a terceros como consecuencia de un accidente de tránsito donde el asegurado es responsable del accidente, vistos como Daños a Personas y como Daños a Cosas las cuales cada una de ellas tiene una suma asegurada definida y limitada, dependiendo del tipo y uso del vehículo asegurado.",
    },
    {
      title: "Cobertura de Exceso de Límite",
      img: <IoIosPeople />,
      data:
        "Ampara en exceso de las coberturas de R.C.V. y que se hace muy importante pues dependiendo de la suma asegurada el asegurado estará mejor amparado.",
    },
    {
      title: "Cobertura de Defensa Penal",
      img: <GiHealing />,
      data:
        "Cubre los gastos que se puedan incurrir por la detención del conductor y/o del vehículo asegurado a consecuencia de un accidente de tránsito, hasta el límite de la suma asegurada.",
    },
    {
      title: "Cobertura de Accidentes Para Ocupantes del Vehículo Asegurado",
      img: <FaHandHoldingMedical />,
      data:
        "Define una suma asegurada para Muerte Accidental, una para Invalidez Permanente y una para Gastos Médicos por cada uno de los ocupantes del vehículo asegurado que resulte afectado por un accidente de tránsito.",
    },
    {
      title: "Telemedicina",
      img: <MdVideoCall />,
      data:
        "Ofrece al asegurado o dueño del vehículo la posibilidad de consultar a un médico las 24 horas del día mediante llamada telefónica o video llamada.",
    },
    {
      title: "Asistencia en Viajes",
      img: <GiTowTruck />,
      data:
        "Ofrece 3 servicios de Grúa, uno de hasta 100 Kms y dos de hasta 45 Kms, que le permite resolver un imprevisto por avería o accidente y trasladar el vehículo hasta un sitio a buen resguardo, para Particulares, Rústicos y Pick Ups de hasta 20 años de antigüedad.",
    },
  ];
  

  return (
    <div id="info"
    className="info">
  
      <div
        className="tituloInfo"
        
      >
        <h1>Qué Incluyen</h1>
        <h3>Cuida Lo Tuyo</h3>
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
