import React from "react";

const Step1 = ({ datos, handleChange,handleImageCedulaChange }) => {


  return (
    <div>
      <div id="step1">
        <fieldset>
          <h2 className="fs-title">Complete sus datos</h2>
          <h3 className="fs-subtitle">Todos los campos son obligatorios</h3>
          <br />

          <div className="container-select">
            <select
              className="form-select mb-3"
              name="requestTypeCode"
              value={datos.requestTypeCode}
              onChange={handleChange}
              required
            >
              <option value="V">V</option>
              <option value="E">E</option>
            </select>
            <input
              type="text"
              name="cedula"
              value={datos.cedula}
              onChange={handleChange}
              placeholder="Cedula"
              required
            />
          </div>

          <div className="container-input">
            <input
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
            <input
              type="text"
              name="apellido"
              value={datos.apellido}
              onChange={handleChange}
              placeholder="Apellido"
              required
            />
          </div>

          <span>Fecha de nacimiento</span>
          <input
            type="date"
            name="fnacimiento"
            value={datos.fnacimiento}
            onChange={handleChange}
            placeholder="Fecha de nacimiento"
            required
          />
          <div>
            <input
              type="text"
              name="telefono"
              value={datos.telefono}
              onChange={handleChange}
              placeholder="Telefono"
              required
            />
          </div>

          <input
            type="text"
            name="correo"
            value={datos.correo}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <div>
            <select
              style={{ width: "250px" }}
              name="genero"
              value={datos.genero}
              onChange={handleChange}
              required
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
            <select
              style={{ width: "250px" }}
              className="form-select mb-3"
              name="estadoCivil"
              value={datos.estadoCivil}
              onChange={handleChange}
              required
            >
              <option value="soltero">Soltera/o</option>
              <option value="casado">Casada/o</option>
              <option value="viuda">Viuda/o</option>
              <option value="divorciado">Divorciada/o</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <span>Dirección</span>
          <div className="container-select">
            <select
              style={{ width: "170px" }}
              value={datos.estado}
              onChange={handleChange}
              className="form-select mb-3"
              name="estado"
            >
              <option value="Amazonas">Amazonas</option>
              <option value="Anzoátegui">Anzoátegui</option>
              <option value="Apure">Apure</option>
              <option value="Aragua">Aragua</option>
              <option value="Barinas">Barinas</option>
              <option value="Bolívar">Bolívar</option>
              <option value="Carabobo">Carabobo</option>
              <option value="Cojedes">Cojedes</option>
              <option value="Delta Amacuro">Delta Amacuro</option>
              <option value="Distrito Capital">Distrito Capital</option>
              <option value="Falcón">Falcón</option>
              <option value="Guárico">Guárico</option>
              <option value="La Guaira">La Guaira</option>
              <option value="Lara">Lara</option>
              <option value="Miranda">Miranda</option>
              <option value="Monagas">Monagas</option>
              <option value="Mérida">Mérida</option>
              <option value="Nueva Esparta">Nueva Esparta</option>
              <option value="Portuguesa">Portuguesa</option>
              <option value="Sucre">Sucre</option>
              <option value="Trujillo">Trujillo</option>
              <option value="Táchira">Táchira</option>
              <option value="Yaracuy">Yaracuy</option>
              <option value="Zulia">Zulia</option>
            </select>
          </div>

          <input
            type="text"
            name="direccion"
            value={datos.direccion}
            onChange={handleChange}
            placeholder="Dirección Completa"
            required
          />
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            value={datos.ciudad}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="municipio"
            placeholder="Municipio"
            value={datos.municipio}
            onChange={handleChange}
            required
          />
          <br />
          <span>Foto del Documento de Identidad</span>
          <input
            type="file"
            id="imagen_cedula"
            name="imagen_cedula"
            onChange={handleImageCedulaChange}
          />

        </fieldset>
      </div>
    </div>
  );
};

export default Step1;
