import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Modal.css';

function Modal({ onSelectEstablishment }) {
    const [selectedEstablishment, setSelectedEstablishment] = useState([]);
  
    const handleEstablishmentSelection = (establishment) => {
      setSelectedEstablishment(establishment);
    };
  
    const handleConfirmSelection = () => {
      onSelectEstablishment(selectedEstablishment);
    };
  
    useEffect(() => {
      // Realiza la solicitud HTTP para obtener los nombres de las tiendas
      axios.get('http://localhost:3000/tiendas')
        .then(response => {
          // Convierte el objeto de respuesta en un array de valores
          const establishmentsArray = Object.values(response.data);
          console.log('establecimiento json:', establishmentsArray)
          setSelectedEstablishment(establishmentsArray);
        })
        .catch(error => {
          console.error('Error al obtener nombres de tiendas:', error);
        });
    }, []);

    return (
      <div className="modal-container">
        <div className="modal">
          <div className="modal-content">
            <h2>Selecciona tu establecimiento</h2>
            <ul>
              {Array.isArray(selectedEstablishment) && selectedEstablishment.map((tienda) => (
                <li key={tienda.id} onClick={() => handleEstablishmentSelection(tienda)}>
                  {tienda.nombre}
                </li>
              ))}
            </ul>
            <button onClick={handleConfirmSelection}>Confirmar</button>
          </div>
        </div>
      </div>
    );
  }
  
export default Modal;
