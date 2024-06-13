import React, { useState, useEffect } from "react";
import cards from '../data.js';
import Card from "./Card";
import "../CSS/Plans.css";
import { MdVideoCall } from "react-icons/md";
import { GiTowTruck } from "react-icons/gi";

const Plans = ({ establishment }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedExtraService, setSelectedExtraService] = useState(""); // Estado para almacenar el nombre del servicio extra seleccionado

  const handleServiceClick = (id, precio, title) => {
    let newTotalPrice = totalPrice;
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(serviceId => serviceId !== id));
      newTotalPrice -= precio;
    } else {
      setSelectedServices([...selectedServices, id]);
      if (id === "telemedicina" || id === "grua") {
        newTotalPrice += precio;
        setSelectedExtraService(title); // Actualiza el nombre del servicio extra seleccionado
      } else {
        const extraServicePrice = selectedServices.reduce((acc, curr) => {
          if (curr === "telemedicina" || curr === "grua") {
            acc += btnService.find(service => service.id === curr).precio;
          }
          return acc;
        }, 0);
        newTotalPrice = precio + extraServicePrice;
        setSelectedPlan(title); // Actualiza el nombre del plan seleccionado
      }
    }
  
    console.log("Precio total:", newTotalPrice);
    setTotalPrice(newTotalPrice);
  };

  const handleBuyClick = (precio) => {
    console.log("Precio servicio:", precio);
  };

  // useEffect(() => {
  //   console.log("Nombre del servicio extra:", selectedExtraService);
  // }, [selectedExtraService]);

  const btnService = [
    {
      icon: <MdVideoCall className="icon" />,
      title: "Telemedicina",
      precio: 10,
      id: "telemedicina"
    },
    {
      icon: <GiTowTruck className="icon" />,
      title: "Grua",
      precio: 60,
      id: "grua"
    },
  ];

  return (
    <div id="plans" className="plans">
      <div className="titulo">
        <h1>Nuestros Planes</h1>
      </div>
      <h3>Cuida Lo Tuyo</h3>

      <div className="services">
        {btnService.map((svc, index) => (
          <button
            className={`service ${selectedServices.includes(svc.id) ? 'selected' : 'not-selected'}`}
            key={index}
            onClick={() => handleServiceClick(svc.id, svc.precio, svc.title)}
          >
            <span>{svc.icon}</span> 
            <span style={{color: "#182850"}}>{svc.title}</span>
            <span style={{color: "#182850"}}>{svc.precio}</span>
          </button>
        ))}
      </div>
      <div className="total-price">
        <p>Potencia tu protección con nuestras opciones extra: telemedicina y grúa.Disponibles con cualquier plan, añaden seguridad y conveniencia a tu experiencia. </p>
        {/* <p>Total: {totalPrice}</p> */}
      </div>
      <div className="cards">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            precio={card.precio}
            data={card.data}
            establishment={establishment}
            extraServicePrice={totalPrice}
            extraServiceName={selectedExtraService} // Pasar el nombre del servicio extra seleccionado
            onBuyClick={handleBuyClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Plans;
