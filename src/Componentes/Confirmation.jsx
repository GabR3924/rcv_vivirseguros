import "../CSS/Confirmation.css";
import axios from "axios";
import IMG from "../assets/figlogo.png";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect } from "react";

const Confirmation = ({
  datos,
  datos2,
  codigo,
  paymentData,
  plan,
  extraPlan,
}) => {

  useEffect(() => {
    console.log('paymentData:', paymentData);
  }, [paymentData]);

  const postData = async () => {
    try {
      // Crear una instancia de FormData
      const formData = new FormData();
      
      // Agregar los datos al FormData
      formData.append('codigo', codigo);
      formData.append('cedula_propietario', datos.cedula);
      formData.append('nombre_propietario', datos.nombre);
      formData.append('apellido_propietario', datos.apellido);
      formData.append('fecha_nacimiento', datos.fnacimiento);
      formData.append('genero', datos.genero);
      formData.append('estado_civil', datos.estadoCivil);
      formData.append('telefono', datos.telefono);
      formData.append('correo', datos.correo);
      formData.append('ciudad', datos.ciudad);
      formData.append('estado', datos.estado);
      formData.append('municipio', datos.municipio);
      formData.append('direccion', datos.direccion);
      formData.append('imagen_cedula', datos.imagen);
      formData.append('marca_vehiculo', datos2.marca);
      formData.append('serial_vehiculo', datos2.serial);
      formData.append('placa_vehiculo', datos2.placa);
      formData.append('año_vehiculo', datos2.año);
      formData.append('imagen_vehiculo', datos2.imagen); 
      formData.append('paymentData_referencia', paymentData.referencia);
      formData.append('paymentData_monto', paymentData.monto);
      formData.append('paymentData_banco', paymentData.banco);
      formData.append('plans', plan);
      formData.append('extra_plans', extraPlan);
  
      console.log('Datos antes de inserción:');
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
        // URL de tu servidor Express dnde está la ruta /insertarDatos
      const url = 'https://rcv.gocastgroup.com:3100/insertarDatos';
  
      // Enviar la solicitud POST con Axios
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Datos insertados correctamente:', response.data);
    } catch (error) {
      console.error('Error al insertar datos:', error);
    }
  };
  


  useEffect(() => {
    // Llama a la función postData con los datos que deseas enviar
    postData({ datos, datos2, codigo,plan,extraPlan, paymentData })
      .then((data) => {
        console.log( datos, datos2, codigo,plan,extraPlan, paymentData)
        console.log("Datos insertados correctamente:",  datos, datos2, codigo,plan,extraPlan, paymentData);
      })
      .catch((error) => {
        console.log( datos, datos2, codigo,plan,extraPlan, paymentData)
        console.error("Error al insertar datos:", error);
      });
  }, [datos, datos2]);

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


  return (
    <div className="confirmation">
      <p style={{ fontWeight: "bold" }}>
        ¡Felicidades! Ha finalizado exitosamente la carga de información y el
        pago para su póliza de R.C.V. Ahora cuenta con cobertura. Recibirá el
        comprobante de pago a su correo electrónico de inmediato.
        <h3 style={{ textAlign: "center" }}>
          Formulario para {codigo}
        </h3>
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
              <td className="table-data" colspan="2">
                <FaWhatsapp />
                04242335368

              </td>
              <td className="table-data" colspan="2">
                <BiLogoGmail />
                lifesolution@gocastgroup.com
              </td>
              <td className="table-data" colspan="2">
                <FaPhoneAlt />
                0212720532
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <FaLocationDot />
     
      <br />
      {/* <img src={IMG} alt="" /> */}
      <p>
        Le agradecemos su confianza por habernos seleccionado como su Compañía
        de Seguros, donde estamos para servirle…
      </p>
      <div className="buttons">
        <button onClick={() => (window.location.href = "/")}>
          Ir al inicio
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
