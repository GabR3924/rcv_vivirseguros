import "../CSS/Confirmation.css";
import axios from "axios";
import IMG from "../assets/logo1.png";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Confirmation = ({
  datos,
  datos2,
  paymentData,
  codigo,
  plan,
  planId,
  extraPlan,
  selectedCedulaImg,
  selectedImage
}) => {
  const tableRef = useRef();

  const handleDownloadPDF = async (e) => {
    e.preventDefault();
    const pdfBlob = await createPDFBlob();
    sendPDF(pdfBlob);
  };

  const createPDFBlob = () => {
    const doc = new jsPDF();
    doc.text("Confirmación de Información y Pago de Póliza", 10, 10);
    
    doc.autoTable({
      head: [['Propietario']],
      body: [
        [`Nombre: ${datos.nombre} ${datos.apellido}`],
        [`Cédula: ${datos.cedula}`],
        [`Fecha de nacimiento: ${datos.fnacimiento}`],
        [`Teléfono: ${datos.telefono}`],
        [`Correo: ${datos.correo}`],
        [`Vigencia: ${vigencia}`],
      ],
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
    });
    
    doc.autoTable({
      head: [['Vehículo']],
      body: [
        [`Serial: ${datos2.serial}`],
        [`Placa: ${datos2.placa}`],
        [`Marca: ${datos2.marca}`],
        [`Modelo: ${datos2.modelo}`],
        [`Año: ${datos2.año}`],
        [`Tipo: ${datos2.tipo}`]
      ],
      startY: doc.autoTable.previous.finalY + 10,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
    });
    
    doc.autoTable({
      head: [['Pago']],
      body: [
        [`Referencia: ${paymentData.referencia}`],
        [`Monto: ${paymentData.monto} Bs`],
        [`Banco: ${paymentData.banco}`],
        [`Fecha de Pago: ${paymentData.fecha}`],
      ],
      startY: doc.autoTable.previous.finalY + 10,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
    });
    
    // Convert PDF to Blob
    return new Promise((resolve) => {
      doc.output('blob', (blob) => {
        resolve(blob);
      });
    });
  };

  const sendPDF = async (pdfBlob) => {
    const formData = new FormData();
    formData.append("pdf", pdfBlob, "confirmacion.pdf");

    try {
      const response = await axios.post(
        "https://apidev.gocastgroup.com/api/mail.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("PDF enviado con éxito:", response.data);
    } catch (error) {
      console.error("Error al enviar el PDF:", error);
    }
  };

  const calcularVigencia = () => {
    const fechaActual = new Date();
    const diaActual = String(fechaActual.getDate()).padStart(2, '0');
    const mesActual = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const anioActual = fechaActual.getFullYear();
    const fechaUnAnioDespues = new Date(fechaActual);
    fechaUnAnioDespues.setFullYear(fechaUnAnioDespues.getFullYear() + 1);
    const diaDespues = String(fechaUnAnioDespues.getDate()).padStart(2, '0');
    const mesDespues = String(fechaUnAnioDespues.getMonth() + 1).padStart(2, '0');
    const anioDespues = fechaUnAnioDespues.getFullYear();
    return `${diaActual}/${mesActual}/${anioActual} al ${diaDespues}/${mesDespues}/${anioDespues}`;
  };

  const vigencia = calcularVigencia();
  
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
