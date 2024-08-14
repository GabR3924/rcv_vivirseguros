import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CSS/Form.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Confirmation from "../Componentes/Confirmation";

const Form = ({ codigo, nombre }) => {
  const [step, setStep] = useState(1);
  const [planPrice, setPlanPrice] = useState(0);
  const [extraServicePrice, setExtraServicePrice] = useState(0);
  const [planName, setPlanName] = useState("");
  const [extraServiceName, setExtraServiceName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [paymentData, setPaymentData] = useState(null); 
  const [selectedCedulaImg, setSelectedCedulaImg] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [datos, setDatos] = useState({
    requestTypeCode: "V",
    cedula: "",
    nombre: "",
    apellido: "",
    fnacimiento: "",
    telefono: "",
    correo: "",
    genero: "F",
    estadoCivil: "S",
    estado: "Miranda",
    ciudad: "",
    municipio: "",
    direccion: "",
    imagen_cedula: null 
  });

  const [datos2, setDatos2] = useState({
    cedula: "",
    serial: "",
    placa: "",
    marca: "",
    año: "",
    modelo: "",
    tipo: "",
    imageOcr: null
  });

    const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageCedulaChange = (event) => {
    setSelectedCedulaImg(event.target.files[0]);
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prevDatos) => {
      const newDatos = { ...prevDatos, [name]: value };
      return newDatos;
    });
  };

  // const handleImageCedulaChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) { 
  //     setDatos((prevDatos) => {
  //       const newDatos = { ...prevDatos, imagen_cedula: file };
  //       return newDatos;
  //     });
  //   }
  // };
  

  const handleStep2Data = (data) => {
  
    setDatos2({
      cedula:data.vehicleData.cedula,
      serial:data.vehicleData.serial,
      nombre:data.vehicleData.nombre,
      placa:data.vehicleData.placa,
      marca:data.vehicleData.marca,
      año:data.vehicleData.año,
      imagen:data.image
    });
    };

  const handlePaymentData = (data) => {
    setPaymentData(data);
    setStep(4); 
  };
  
  
  const goToNextStep = () => {
    // Verifica si todos los campos requeridos en datos están llenos
    const isStep1Complete =
      datos.requestTypeCode &&
      datos.cedula &&
      datos.nombre &&
      datos.apellido &&
      datos.fnacimiento &&
      datos.telefono &&
      datos.correo &&
      datos.genero &&
      datos.estadoCivil &&
      datos.estado &&
      datos.ciudad &&
      datos.municipio &&
      datos.direccion;

    if (!isStep1Complete) {
      // Si algún campo está vacío, muestra una alerta y no avances al Step2
      alert("Por favor, complete todos los campos antes de continuar.");
    } else {
      // Si todos los campos están llenos, avanza al Step2
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      datos.requestTypeCode,
      datos.cedula,
      datos.nombre,
      datos.apellido,
      datos.fnacimiento,
      datos.telefono,
      datos.correo,
      datos.genero,
      datos.estadoCivil,
    ];


    const emptyFields = requiredFields.filter((field) => field === "");

    if (emptyFields.length > 0) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    console.log("Datos enviados:", datos, datos2, codigo);
    setStep(3);
  };

  // Función para obtener los parámetros de consulta de la URL
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const queryParams = {
      planPrice: searchParams.get("planPrice"),
      extraServicePrice: searchParams.get("extraServicePrice"),
      planName: searchParams.get("planName"),
      extraServiceName: searchParams.get("extraServiceName"),
    };
    return queryParams;
  };

  useEffect(() => {
    // Obtener los precios del plan y del servicio extra al cargar el componente
    const queryParams = getQueryParams();
    setPlanPrice(queryParams.planPrice);
    setExtraServicePrice(queryParams.extraServicePrice);
    setPlanName(queryParams.planName);
    setExtraServiceName(queryParams.extraServiceName);
  }, [location.search]); // Vuelve a cargar cuando cambia la búsqueda de la ubicación



  return (
    <form
      id="msform"
      method="post"
      target="hidden-iframe"
      onSubmit={handleSubmit}
    >
      {formSubmitted || step > 3 ? null : (
        <>
          <ul id="progressbar">
            <li className={step === 1 ? "active" : ""}>datos</li>
            <li className={step === 2 ? "active" : ""}>datos</li>
            <li className={step === 3 ? "active" : ""}>datos</li>
          </ul>
          <h2 style={{ textAlign: "center", color: "#344570"}}>
           {nombre}, {codigo}
          </h2>
        </>
      )}

      {/* Renderizar el componente correspondiente al paso actual */}
      {step === 1 && <Step1 datos={datos} handleChange={handleChange} handleImageCedulaChange={handleImageCedulaChange} />}
      {step === 2 && (
        <Step2 handleStep2Data={handleStep2Data} handleImageChange={handleImageChange} selectedImage={selectedImage} />
      )}

      {step === 3 && codigo && (
        <Step3
          establishment={codigo}
          planName={planName}
          planPrice={planPrice}
          extraServiceName={extraServiceName}
          extraServicePrice={extraServicePrice}
          handlePaymentData={handlePaymentData} 
        />
      )}
     {step === 4 && 
     <Confirmation
     datos={datos}
     datos2={datos2}
     paymentData={paymentData}
     codigo={codigo}
     plan={planName} 
     extraPlan={extraServiceName} 
     selectedCedulaImg={selectedCedulaImg} 
     selectedImage={selectedImage} 
   />
     }


      {/* Botones para navegar entre los pasos */}
      <div className="buttons">
        {!formSubmitted && step > 1 && step < 4 && (
          <button onClick={() => setStep(step - 1)}>Anterior</button>
        )}
        {!formSubmitted && step < 3 && (
          <button onClick={goToNextStep}>Siguiente</button>
        )}

        {step === 3 && (
          <button type="submit" onClick={handleSubmit}>
            Enviar
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
