import "../CSS/Confirmation.css";
import axios from "axios";
import IMG from "../assets/logo1.png";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Confirmation = ({
  datos,
  datos2,
  paymentData,
  codigo,
  plan,
  extraPlan,
  selectedCedulaImg,
  selectedImage
}) => {
  console.log(" cedula:", selectedCedulaImg);
  console.log(" imagen ocr:", selectedImage);

  const tableRef = useRef();

  useEffect(() => {
    // Este efecto se ejecutará cada vez que editableData cambie
    console.log(" Data2:", datos2);

    const marca = datos2 ? datos2.marca : null;
  }, [datos2]);

  // useEffect(() => {
  //   const sendEmail = async () => {
  //     try {
  //       const response = await axios.post("https://rcv.gocastgroup.com:3100/sendEmail", {
  //         datos_correo: datos.correo,
  //         // Otros datos que necesites enviar al servidor para el correo
  //       });
  //       console.log("Correo electrónico enviado correctamente:", response.data);
  //     } catch (error) {
  //       console.error("Error al enviar el correo electrónico:", error);
  //     }
  //   };

  //   sendEmail();
  // }, [datos.correo]);

  const postData = async () => {
    try {
      // Crear una instancia de FormData
      const formData = new FormData();

      // Agregar los datos al FormData
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
      formData.append("plans", plan);
      formData.append("extra_plans", extraPlan);
      
      formData.append("paymentData_referencia", paymentData.referencia);
      formData.append("paymentData_monto", paymentData.monto);
      formData.append("paymentData_banco", paymentData.banco);
     
      formData.append("serial_vehiculo", datos2.serial);
      formData.append("placa_vehiculo", datos2.placa);
      formData.append("marca_vehiculo", datos2.marca);
      formData.append("ano_vehiculo", datos2.año);
      
      formData.append("modelo", datos2.modelo);
      formData.append("tipo", datos2.tipo);
      formData.append("estilo", datos2.estilo);

      // Agregar las imágenes al FormData
      formData.append("imagen_cedula", selectedCedulaImg);
      formData.append("imagen", selectedImage);
      
      const response = await axios.post("https://rcv.gocastgroup.com:2053/vivirseguros/intermediarios", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      }); 

      console.log("Datos insertados correctamente:", response.data);
    } catch (error) {
      console.error("Error al insertar datos:", error);
    }
  };

  
  const calcularVigencia = () => {
    // Obtener la fecha actual
    const fechaActual = new Date();
  
    // Formatear la fecha actual
    const diaActual = String(fechaActual.getDate()).padStart(2, '0');
    const mesActual = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const anioActual = fechaActual.getFullYear();
  
    // Calcular la fecha un año después
    const fechaUnAnioDespues = new Date(fechaActual);
    fechaUnAnioDespues.setFullYear(fechaUnAnioDespues.getFullYear() + 1);
  
    // Formatear la fecha un año después
    const diaDespues = String(fechaUnAnioDespues.getDate()).padStart(2, '0');
    const mesDespues = String(fechaUnAnioDespues.getMonth() + 1).padStart(2, '0');
    const anioDespues = fechaUnAnioDespues.getFullYear();
  
    return `${diaActual}/${mesActual}/${anioActual} al ${diaDespues}/${mesDespues}/${anioDespues}`;
  };
  
  const vigencia = calcularVigencia();

  useEffect(() => {
    // Llama a la función postData con los datos que deseas enviar
    postData({ datos, datos2 })
      .then((data) => {
        console.log("Datos insertados correctamente:", data);
      })
      .catch((error) => {
        console.error("Error al insertar datos:", error);
      });
  }, [datos, datos2]);

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Título del documento
    doc.text("Confirmación de Información y Pago de Póliza", 10, 10);
  
    // Información del propietario
    doc.autoTable({
      head: [['Propietario']],
      body: [
        [`Nombre: ${datos.nombre} ${datos.apellido}`],
        [`Cédula: ${datos.cedula}`],
        [`Fecha de nacimiento: ${datos.fnacimiento}`],
        [`Teléfono: ${datos.telefono}`],
        [`Correo: ${datos.correo}`],
      ],
      startY: 20, // Espaciado entre el título y la tabla
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
    });
  
    // Información del vehículo
    doc.autoTable({
      head: [['Vehículo']],
      body: [
        [`Serial: ${datos2.serial}`],
        [`Placa: ${datos2.placa}`],
        [`Marca: ${datos2.marca}`],
        [`Modelo: ${datos2.modelo}`],
        [`Año: ${datos2.año}`],
        [`Tipo: ${datos2.tipo}`],
        [`Estilo: ${datos2.estilo}`],
      ],
      startY: doc.autoTable.previous.finalY + 10, // Iniciar la tabla después de la anterior
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
    });
  
    // Información del pago
    doc.autoTable({
      head: [['Pago']],
      body: [
        [`Referencia: ${paymentData.referencia}`],
        [`Monto: ${paymentData.monto} Bs`],
        [`Banco: ${paymentData.banco}`],
        [`Fecha de Pago: ${paymentData.fecha}`],
      ],
      startY: doc.autoTable.previous.finalY + 10, // Iniciar la tabla después de la anterior
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
    });
  
    // Guardar el PDF
    doc.save("confirmacion.pdf");
  };
  

  const handleDownloadPDF = (e) => {
    e.preventDefault();  // Previene cualquier comportamiento no deseado como la redirección
    downloadPDF();       // Llama a la función para descargar el PDF
  };

  console.log("confirmacion datos 2", datos2);

  return (
    <div className="confirmation">
      <p style={{ fontWeight: "bold" }}>
        ¡Felicidades! Ha finalizado exitosamente la carga de información y el
        pago para su póliza de R.C.V. Ahora cuenta con cobertura. Recibirá el
        comprobante de pago a su correo electrónico de inmediato.
        <h3 style={{ textAlign: "center" }}>Formulario para {codigo}</h3>
      </p>
      <div className="rcv">
        <div className="grid">
         <div className="grid-item">
            <table>
              <thead>
                <tr>
                  <th className="table-header" colspan="2">
                    Plan
                  </th>
                  <th className="table-header" colspan="2">
                    Cliente
                  </th>

                  <th className="table-header">Pago</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="table-data" colspan="2">
                    {plan}
                  </td>
                  <td className="table-data" colspan="2">
                    {datos.nombre} {datos.apellido}
                  </td>
                  <td className="table-data"> {datos.fnacimiento}</td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td className="table-data" colspan="2">
                    {extraPlan}
                  </td>
                  <td className="table-data" colspan="2">
                    {datos.fnacimiento}
                  </td>
                  <td className="table-data">Ref. {paymentData.referencia}</td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td className="table-data" colspan="2"></td>
                  <td className="table-data" colspan="2">
                    {datos.requestTypeCode} {datos.cedula}
                  </td>
                  <td className="table-data"> {paymentData.monto} Bs</td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td className="table-data" colspan="2"></td>
                  <td className="table-data" colspan="2">
                    {datos.telefono}
                  </td>
                  <td className="table-data"> {paymentData.banco}</td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td className="table-data" colspan="2">
                    Vigencia {vigencia}
                  </td>
                  <td className="table-data" colspan="2">
                    {datos.correo}
                  </td>
                  <td className="table-data">{datos2.serial}</td>
                </tr>
              </tbody>
            </table>

            <div className="vehiculo">
              <table>
                <thead>
                  <tr>
                    <th className="table-header" colSpan="2">
                      Vehiculo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{datos2.serial}</td>
                  </tr>
                  <tr>
                    <td>{datos2.placa}</td>
                  </tr>
                  <tr>
                    {" "}
                    <td>{datos2.marca}</td>
                  </tr>
                  <tr>
                    {" "}
                    <td>{datos2.modelo}</td>
                  </tr>
                  <tr>
                    {" "}
                    <td>{datos2.año}</td>
                  </tr>
                  <tr>
                    {" "}
                    <td>{datos2.tipo}</td>
                  </tr>
                  <tr>
                    {" "}
                    <td>{datos2.estilo}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table>
              <tbody>
                {/* {datos2.map((item, index) => (
                  <tr key={index}>
                    <td>{item.tipo}</td>
                    <td>{item.valor}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
      <br />
      <p>
        En el trascurso de las próximas 24 horas usted va a recibir en su correo
        la respectiva póliza con la constancia de pago y cualquier información
        la puede canalizar mediante.
      </p>

      <div className="contacto">
        <table>
          <tbody>
            <tr>
              <td className="table-data" colSpan="2">
                <FaWhatsapp />
                +58412-3210083
              </td>
              <td className="table-data" colSpan="2">
                <BiLogoGmail />
                cisscavirtual@vivirseguros.web.ve
              </td>
              <td className="table-data" colSpan="2">
                <FaPhoneAlt />
                +58212-2124800
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <FaLocationDot />
      <p>
        Av. Venezuela cruce con Alameda, Torre Vivir Seguros, Urb. El Rosal,
        Chacao, Venezuela
      </p>
      <br />
      <img src={IMG} alt="" />
      <p>
        Le agradecemos su confianza por habernos seleccionado como su Compañía
        de Seguros, donde estamos para servirle…
      </p>
      <div className="buttons">
  <button type="button" onClick={() => (window.location.href = "/")}>
    Ir al inicio
  </button>
  <button type="button" onClick={(e) => handleDownloadPDF(e)}>
    Descargar recibo
  </button>
</div>

    </div>
  );
};

export default Confirmation;
