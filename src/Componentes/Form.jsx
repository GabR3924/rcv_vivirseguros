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
  

  const handleStep2Data = (data) => {
  
    setDatos2({
      cedula:data.vehicleData.cedula,
      serial:data.vehicleData.serial,
      placa:data.vehicleData.placa,
      marca:data.vehicleData.marca,
      año:data.vehicleData.año,
      modelo:data.vehicleData.modelo,
      tipo:data.vehicleData.tipo,
      imagen:data.image
    });
    };

  const handlePaymentData = (data) => {
    setPaymentData(data);
  };
  
  
  const goToNextStep = () => {
    // Verifica si todos los campos requeridos en datos están llenos para el Step1
    if (step === 1) {
      const isStep1Complete =
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
        alert("Por favor, complete todos los campos antes de continuar.");
        return;
      }
      setStep(2); // Avanza al Step2
    } else if (step === 2) {
      // Verifica que los campos del Step2 estén completos
      const isStep2Complete = 
        datos2.cedula && 
        datos2.serial && 
        datos2.placa && 
        datos2.marca && 
        datos2.año &&
        selectedImage;
  
      if (!isStep2Complete) {
        alert("Por favor, complete todos los datos del vehículo.");
        return;
      }
      setStep(3); // Avanza al Step3
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = [
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
  
    // Crear un FormData para los datos del formulario e imágenes
    const formData = new FormData();
    formData.append("codigo", codigo);
    formData.append("cedula_propietario", datos.cedula);
    formData.append("nombre_propietario", datos.nombre);
    formData.append("apellido_propietario", datos.apellido);
    formData.append("fecha_nacimiento", datos.fnacimiento);
    formData.append("genero", datos.genero);
    formData.append("telefono", datos.telefono);
    formData.append("correo", datos.correo);
    formData.append("ciudad", datos.ciudad);
    formData.append("estado", datos.estado);
    formData.append("municipio", datos.municipio);
    formData.append("direccion", datos.direccion);
    // Añadir los datos del vehículo
    formData.append("plans", planName);
    formData.append("extra_plans", extraServiceName);

    formData.append("paymentData_referencia", paymentData.referencia);
    formData.append("paymentData_monto", paymentData.monto);
    formData.append("paymentData_banco", paymentData.banco);

    formData.append("serial_vehiculo", datos2.serial);
    formData.append("placa_vehiculo", datos2.placa);
    formData.append("marca_vehiculo", datos2.marca);
    formData.append("ano_vehiculo", datos2.año);
    formData.append("modelo", datos2.modelo);

    const fechaActual = obtenerFechaActual();
    formData.append("inicio_vigencia", fechaActual);
    formData.append("imagen_cedula", selectedCedulaImg);
    formData.append("imagen", selectedImage);


  
    try {
      const response = await axios.post("https://rcv.gocastgroup.com:2053/vivirseguros/intermediarios", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Manejar la respuesta del servidor
      if (response.status === 200) {
        alert("Formulario enviado correctamente.");
        setFormSubmitted(true);
        setStep(4); // Pasar a la confirmación o siguiente paso
      } else {
        alert("Error al enviar el formulario. Inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      alert("Hubo un error al enviar el formulario.");
    }
  };
  

  const obtenerFechaActual = () => {
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const anio = fechaActual.getFullYear();
    return `${dia}/${mes}/${anio}`;
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
        {!formSubmitted && step > 1 && step < 3 && (
          <button onClick={() => setStep(step - 1)}>Anterior</button>
        )}
        {!formSubmitted && step < 4 && (
         <button type="button" onClick={goToNextStep}>Siguiente</button>

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
