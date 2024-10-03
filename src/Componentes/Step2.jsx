import axios from 'axios';
import React, { useState, useEffect } from 'react';


function Step2({ handleStep2Data, handleImageChange, selectedImage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      console.log('Imagen seleccionada:', selectedImage);
    }
  }, [selectedImage]); // Se ejecuta cada vez que selectedImage cambia


  const handleProcessImage = async () => {
    setIsLoading(true);
    const formData = new FormData();
    
    formData.append('image', selectedImage);
//prueba
    try {
      const response = await axios.post('https://rcv.gocastgroup.com:2053/data/procesar-imagen', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }); 
      console.log('data:', response)
      setVehicleInfo(response.data);
      setModalIsOpen(true);

      const vehicleData = {
        cedula: response.data.resultados.find(item => item.tipo === 'Cédula del propietario')?.valor || '',
        serial: response.data.resultados.find(item => item.tipo === 'Serial del vehículo')?.valor || '',
        placa: response.data.resultados.find(item => item.tipo === 'Placa del vehículo')?.valor || '',
        marca: response.data.resultados.find(item => item.tipo === 'Marca del vehículo')?.valor || '',
        año: response.data.resultados.find(item => item.tipo === 'Año del vehículo')?.valor || '',
        modelo: response.data.resultados.find(item => item.tipo === 'Modelo del vehículo')?.valor || '',
        tipo: response.data.resultados.find(item => item.tipo === 'Tipo de vehículo')?.valor || '',
      };

      console.log('vehiculdata', vehicleData)

      handleStep2Data({
        vehicleData,
        image: selectedImage // Pass the image along with the data
      });

    } catch (error) {
      console.error('Error al enviar la imagen al backend:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="step2">
      <fieldset>
        <div className="img">
          <label htmlFor="image">Carnet De Circulacion</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            required
          />
          <br />
          <button
            type="button"
            onClick={handleProcessImage}
            disabled={isLoading || !selectedImage}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              outline: "none",
            }}
          >
            {isLoading ? "Procesando..." : "Procesar imagen"}
          </button>
        </div>
      </fieldset>

      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Información del Vehículo</h2>
            {vehicleInfo && vehicleInfo.resultados.map((resultado, index) => (
              <div key={index}>
                <h3>{resultado.tipo}</h3>
                <p>{resultado.valor}</p>
              </div>
            ))}
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Step2;
