import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Step4.css";

function Step3({
  establishment,
  planName,
  planPrice,
  extraServiceName,
  extraServicePrice,
  handlePaymentData,
}) {
  const [showPagoMovilModal, setShowPagoMovilModal] = useState(false);
  const [showTajetaModal, setShowTajetaModal] = useState(false);
  const [precioBolivares, setPrecioBolivares] = useState(null);
  const [bancosHTML, setBancosHTML] = useState(""); // Estado para la cadena de opciones HTML
  const [selectedBanco, setSelectedBanco] = useState(""); // Estado para el banco seleccionado
  const [pagoMovilResponse, setPagoMovilResponse] = useState(null);
  const [tarjetaResponse, setTarjetaResponse] = useState(null);

  //estados pago movil
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [referencia, setReferencia] = useState("");
  const [correo, setCorreo] = useState("");
  //estados transferencia
  const [tipCuenta, setTipCuenta] = useState("");
  const [afiliacion, setAfiliacion] = useState("");
  const [montoTarjeta, setMontoTarjeta] = useState("");
  const [documento, setDocumento] = useState("");
  const [nomTarjeta, setNomTarjeta] = useState("");
  const [numTarjeta, setNumTarjeta] = useState("");
  const [pin, setPin] = useState("");
  const [cvv, setCvv] = useState("");
  const [fechExp, setFechExp] = useState("");
  const [tipTarjeta, setTipTarjeta] = useState("");
  const [identificador, setIdentificador] = useState("");
  
  const totalAmount = parseFloat(planPrice) + parseFloat(extraServicePrice);
  const totalBolivares = precioBolivares * totalAmount;
  const [monto, setMonto] = useState(totalBolivares);

  useEffect(() => {
    setMonto(totalBolivares);
  }, [totalBolivares]);

  const handleGuardarPago = () => {

    axios
      .post("https://apidev.gocastgroup.com/api/bnc/p2p.php", {
        montop2p: monto,
        correo: correo,
        banco: selectedBanco,
        cedula: cedula,
        telefono: telefono,
        Reference: referencia,
        clienteNombre: VivirSeguros
      })
      .then((response) => {
        console.log("res api", response.data.message);
        // Verificar si la transacción fue exitosa
        if (response && response.data.status === "success") {
          // Si la transacción fue exitosa, llamar a la función handlePaymentData
          handlePaymentData({
            fecha: new Date(), // Aquí puedes obtener la fecha actual u otra fecha relevante
            referencia: response.data.reference,
            monto: monto, // Aquí puedes pasar cualquier otro dato necesario
            banco: selectedBanco,
          });

          setPagoMovilResponse({
            message: message,
            additionalMessage: "enviamos la factura a tu correo",
            reference: message2,
          });
        } else {
          // Manejar la transacción fallida
          console.error(response.message);
        }

        console.error(
          "La solicitud no fue exitosa. Código de estado:",
          response.status
        );
      })
      .catch((error) => {
        setPagoMovilResponse("Error en Tu Transaccion"); // Almacenar el mensaje en el estado

        console.error("Error al hacer el POST a la API:", error);
      });
  };
  const handleGuardarTarjeta = () => {
    const afiliacionValue = "860112192"; // Valor predeterminado de afiliación
    const identificadorValue = "23000760"; // Valor predeterminado de afiliación

    var paymentData = {
      tipCuenta: tipCuenta,
      afiliacion: afiliacionValue,
      monto: montoTarjeta,
      documento: documento,
      nomTarjeta: nomTarjeta,
      numTarjeta: numTarjeta,
      pin: pin,
      cvv: cvv,
      fechExp: fechExp,
      tipTarjeta: tipTarjeta,
      identificador: identificadorValue,
      clienteNombre: VivirSeguros
    };

    console.log("tarjeta", paymentData);

    axios
      .post("https://apidev.gocastgroup.com/api/bnc/vpos.php", paymentData)
      .then((response) => {
        // Crear un blob con el contenido del PDF recibido
        console.log("respuesta", response.data);
        console.log("res api", response.data.message);
        // Verificar si la transacción fue exitosa
        if (response && response.data.status === "OK") {
          // Si la transacción fue exitosa, llamar a la función handlePaymentData
          handlePaymentData({
            fecha: new Date(), // Aquí puedes obtener la fecha actual u otra fecha relevante
            referencia: response.data.Reference,
            monto: montoTarjeta, // Aquí puedes pasar cualquier otro dato necesario
          });

          setTarjetaResponse({
            message: response.data.message,
            additionalMessage: "enviamos la factura a tu correo",
            reference: response.data.Reference,
          });
        } else {
          // Manejar la transacción fallida
          console.error(response.message);
        }
      })
      .catch((error) => {
        console.error("Error al hacer el POST a la API:", error);
        // Aquí puedes manejar los errores según tus necesidades
      });
  };

  useEffect(() => {
    // Llama a la ruta tasadia para obtener la tasa del día
    axios
      .get("https://apidev.gocastgroup.com/API/index.php?ruta=tasadia")
      .then((response) => {
        // Actualiza el estado con la tasa del día
        console.log(response.data);
        setPrecioBolivares(response.data);
      })
      .catch((error) => {
        // console.error("Error al obtener la tasa del día:", error);
        setPrecioBolivares("36.56");
      });
  }, []);

  useEffect(() => {
    // Check if establishment prop is available
    if (establishment) {
      console.log("Establecimiento:", establishment); // For debugging
    } else {
      console.error("No establishment found in props"); // Handle missing establishment
    }
  }, [establishment]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedBanco(selectedValue);
  };
  useEffect(() => {
    console.log("banco", selectedBanco);
    // Realiza cualquier otra acción que necesites con el valor actualizado de selectedBanco
  }, [selectedBanco]);

  return (
    <div>
      <fieldset>
        <h3>Plan seleccionado:</h3>

        <p>
          <span>{planName}</span>: <span>{planPrice}</span>
        </p>

        <p>
          <span>{extraServiceName}</span>: <span>{extraServicePrice}$</span>
        </p>

        <p>
          <span>Total en bolivares: {totalBolivares}</span>
        </p>

        <h3 className="fs-title">Seleccione su método de pago</h3>

        <div className="btns">
          <button
            type="button"
            className="modal-button"
            onClick={() => setShowPagoMovilModal(true)}
            style={{ background: "green !important" }}
          >
            Pago Móvil
          </button>
          {showPagoMovilModal && (
            <div id="modal-pagomovil" className="modal">
              <div className="modal-content">
                <span
                  className="close"
                  onClick={() => setShowPagoMovilModal(false)}
                >
                  &times;
                </span>
                {pagoMovilResponse ? (
                  <p>{pagoMovilResponse}</p>
                ) : (
                  <div>
                    <div className="datos">
                      <p>BNC</p>
                      <p>04125568925</p>
                      <p>755986</p>
                    </div>
                    <form
                      className="modal-pago-movil"
                      id="pagoForm"
                      method="post"
                    >
                      <h2>Pagomovil P2P</h2>
                      <label htmlFor="banco">Seleccionar banco:</label>
                      <br />

                      <select
                        id="banco"
                        name="banco"
                        value={selectedBanco}
                        onChange={handleSelectChange}
                      >
                        <option value="">Seleccione un banco</option>
                        <option value="0102">Banco de Venezuela</option>
                        <option value="0105">Banco Mercantil</option>
                        <option value="0108">BBVA Banco Provincial</option>
                        <option value="0114">BanCaribe</option>
                        <option value="0115">Banco Exterior</option>
                        <option value="0128">Banco Caroní</option>
                        <option value="0134">Banesco</option>
                        <option value="0137">Banco Sofitasa</option>
                        <option value="0138">Banco Plaza</option>
                        <option value="0146">BanGente</option>
                        <option value="0151">Banco Fondo Común (BFC)</option>
                        <option value="0156">100% Banco</option>
                        <option value="0157">Del Sur</option>
                        <option value="0163">Banco del Tesoro</option>
                        <option value="0166">Banco Agrícola de Venezuela</option>
                        <option value="0168">BanCrecer, Banco de Desarrolo</option>
                        <option value="0169">Mi banco, Banco Microfinanciero, C.A.</option>
                        <option value="0171">Banco Activo</option>
                        <option value="0172">Bancamiga Banco Universal, C.A.</option>
                        <option value="0174">BanPlus, Banco Comercial</option>
                        <option value="0177">Banco de las Fuerzas Armadas</option>
                        <option value="0191">Banco Nacional de Crédito, C.A. Banco Universal</option>
                      </select>

                    <p color="red">El Monto debe ser exacto</p>
                      <label htmlFor="monto">Monto:</label>
                      <br />
                      <input
                        type="number"
                        id="monto"
                        name="monto"
                        value={totalBolivares}
                        // 
                        readOnly
                      />

                      <label htmlFor="cedula">Cédula:</label>
                      <br />
                      <input
                        type="text"
                        id="cedula"
                        name="cedula"
                        onChange={(e) => setCedula(e.target.value)}
                      />
                    <p >EJ: 58412025893</p>

                      <label htmlFor="telefono">Teléfono:</label>
                      <br />
                      <input
                        type="number"
                        id="telefono"
                        name="telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />

                      <label htmlFor="referencia">Referencia:</label>
                      <br />
                      <input
                        type="number"
                        id="referencia"
                        name="referencia"
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value)}
                      />
                    </form>
                    <button
                      className="modal-btn"
                      id="guardarPagoButton"
                      style={{ background: "green !important" }}
                      onClick={handleGuardarPago}
                    >
                      Guardar
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            type="button"
            className="modal-button"
            onClick={() => setShowTajetaModal(true)}
            style={{ background: "green !important" }}
          >
            Tarjeta
          </button>
          {showTajetaModal && (
            <div id="modal-tarjeta" className="modal">
              <div className="modal-content">
                <span
                  className="close"
                  onClick={() => setShowTajetaModal(false)} // Correctly close the tarjeta modal
                >
                  &times;
                </span>
                {tarjetaResponse ? (
                  <p>{tarjetaResponse}</p>
                ) : (
                  <form
                    className="modal-pago-movil"
                    id="pagoForm"
                    method="post"
                  >
                    <h2>Punto De Venta Virtual BNC</h2>
                    <div className="scrollable-form">
                      <div className="form-left">
                        {/* Input fields for tarjeta details */}
                        <label htmlFor="tipCuenta">Tipo de Cuenta:</label>

                        <select
                          id="tipCuenta"
                          name="tipCuenta"
                          value={tipCuenta}
                          onChange={(e) => setTipCuenta(e.target.value)}
                        >
                          <option value="00">00-Principal</option>
                          <option value="10" selected>
                            10-Ahorro
                          </option>
                          <option value="20">20-Corriente</option>
                        </select>

                        <input
                          type="number"
                          id="afiliacion"
                          name="afiliacion"
                          placeholder="Afiliación"
                          value={afiliacion}
                          onChange={(e) => setAfiliacion("860112192")}
                          hidden
                        />

                        <label htmlFor="monto">Monto:</label>
                        <input
                          type="number"
                          step="0.01"
                          id="monto"
                          name="monto"
                          placeholder="Monto"
                          value={montoTarjeta}
                          onChange={(e) => setMontoTarjeta(e.target.value)}
                        />

                        <label htmlFor="documento">Documento:</label>
                        <input
                          type="number"
                          step="0.01"
                          id="documento"
                          name="documento"
                          placeholder="Documento"
                          value={documento}
                          onChange={(e) => setDocumento(e.target.value)}
                        />

                        <label htmlFor="nomTarjeta">Nombre del Titular:</label>
                        <input
                          type="text"
                          id="nomTarjeta"
                          name="nomTarjeta"
                          placeholder="Nombre del Titular"
                          value={nomTarjeta}
                          onChange={(e) => setNomTarjeta(e.target.value)}
                        />
                        <br />
                        <label htmlFor="nomTarjeta">Numero de tarjeta</label>
                        <input
                          type="text"
                          id="numTarjeta"
                          name="numTarjeta"
                          placeholder="Numero de tarjeta"
                          value={numTarjeta}
                          onChange={(e) => setNumTarjeta(e.target.value)}
                        />
                        <br />
                        <label htmlFor="tipTarjeta">Tipo de Tarjeta:</label>
                        <select
                          id="tipTarjeta"
                          name="tipTarjeta"
                          value={tipTarjeta}
                          onChange={(e) => setTipTarjeta(e.target.value)}
                        >
                          <option value="1">VISA</option>
                          <option value="2">MasterCard</option>
                          <option value="3">Debito Maestro</option>
                        </select>

                        <label htmlFor="pin">PIN:</label>
                        <input
                          type="number"
                          id="pin"
                          name="pin"
                          placeholder="PIN"
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                        />

                        <label htmlFor="cvv">CVV:</label>
                        <input
                          type="number"
                          id="cvv"
                          name="cvv"
                          placeholder="CVV"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />

                        <label htmlFor="fechExp">Fecha de Expiración:</label>
                        <input
                          type="number"
                          id="fechExp"
                          name="fechExp"
                          placeholder="Fecha de Expiración"
                          value={fechExp}
                          onChange={(e) => setFechExp(e.target.value)}
                        />

                        <input
                          type="text"
                          id="identificador"
                          name="identificador"
                          placeholder="Identificador"
                          value={identificador}
                          onChange={(e) => setIdentificador()}
                          hidden
                        />
                      </div>
                    </div>

                    <button
                      className="modal-button"
                      id="guardarTarjetaButton"
                      style={{ background: "green" }}
                      type="button" // Especificar el tipo de botón como "button"
                      onClick={handleGuardarTarjeta}
                    >
                      Realizar Pago
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
}

export default Step3;
