import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Importa los iconos de Font Awesome
import "../CSS/AdminView.css"; // Archivo de estilos para el dashboard

const AdminView = () => {
  const [tiendas, setTiendas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual de tiendas
  const itemsPerPage = 20; // Número de elementos por página
  const [editTiendaId, setEditTiendaId] = useState(null);
  const [filtroActivo, setFiltroActivo] = useState(false);
  const [fechaFiltro, setFechaFiltro] = useState("");

  const [nuevaTienda, setNuevaTienda] = useState({
    nombre: "",
    codigo: "",
    categoria: "",
  });

  const obtenerTiendas = () => {
    axios
      .get("https://vivirseguros.gocastgroup.com:3100/tiendas")
      .then((response) => {
        if (response.data) {
          console.log("qr:", response.data.qr);
          setTiendas(response.data);
        } else {
          console.error(
            "La respuesta del servidor no contiene los datos esperados."
          );
        }
      })
      .catch((error) => {
        console.error("Error al obtener las tiendas:", error);
      });
  };

  useEffect(() => {
    // Llamada Axios para obtener las tiendas

    axios
      .get("https://vivirseguros.gocastgroup.com:3100/tiendas")
      .then((response) => {
        if (response.data) {
          console.log("qr:", response.data.qr);
          setTiendas(response.data);
        } else {
          console.error(
            "La respuesta del servidor no contiene los datos esperados."
          );
        }
      })
      .catch((error) => {
        console.error("Error al obtener las tiendas:", error);
      });

    // Llamada Axios para obtener los usuarios
    axios
      .get("https://vivirseguros.gocastgroup.com:3100/obtenerDatos")
      .then((response) => {
        
        console.log("usuario", response);
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }, []); 

  const handleCreateTienda = () => {
    axios
      .post(
        "https://vivirseguros.gocastgroup.com:3100/agregar-intermediario",
        nuevaTienda
      )
      .then((response) => {
        console.log("Tienda creada correctamente");
         obtenerTiendas();
        setTiendas([...tiendas, response.data]);
        // Reiniciar el formulario de nueva tienda
        setNuevaTienda({
          nombre: "",
          codigo: "",
          categoria: "",
        });
      })
      .catch((error) => {
        console.error("Error al crear la tienda:", error);
      });
  };

  // Función para manejar la eliminación de una tienda
  const handleDeleteTienda = (id) => {
    axios
      .delete(`https://vivirseguros.gocastgroup.com:3100/tiendas/${id}`)
      .then((response) => {
        console.log("Tienda eliminada correctamente");
        // Volver a obtener la lista de tiendas después de la eliminación
        setTiendas(tiendas.filter((tienda) => tienda.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar la tienda:", error);
      });
  };

  // Función para manejar la actualización de una tienda
  const handleUpdateTienda = (id, nuevoNombre) => {
    axios
      .put(`https://vivirseguros.gocastgroup.com:3100/${id}`, {
        nombre: nuevoNombre,
      })
      .then((response) => {
        console.log("Tienda actualizada correctamente");
        // Volver a obtener la lista de tiendas después de la actualización
        setTiendas(
          tiendas.map((tienda) =>
            tienda.id === id ? { ...tienda, nombre: nuevoNombre } : tienda
          )
        );
        // Reiniciar el estado de edición
        setEditTiendaId(null);
      })
      .catch((error) => {
        console.error("Error al actualizar la tienda:", error);
      });
  };

  const handleTiendaInputChange = (id, nombre) => {
    setTiendas(
      tiendas.map((tienda) =>
        tienda.id === id ? { ...tienda, nombre } : tienda
      )
    );
  };

  const handleToggleInfo = (id) => {
    setUsuarios(
      usuarios.map((usuario) =>
        usuario.id === id
          ? { ...usuario, expanded: !usuario.expanded }
          : usuario
      )
    );
  };

  // Calcular los índices de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTiendas = tiendas.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFechaFiltroChange = (event) => {
    const fechaSeleccionada = event.target.value;
    setFechaFiltro(fechaSeleccionada);
    // Si se ha seleccionado una fecha, activa el filtro
    setFiltroActivo(!!fechaSeleccionada);
  };

  let usuariosMostrados = usuarios;
  if (filtroActivo) {
    usuariosMostrados = usuarios.filter((usuario) =>
      usuario.datos_fnacimiento.includes(fechaFiltro)
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="content">
        <h1>Admin Dashboard</h1>
        <div className="tiendas">
          <h2>Tiendas/Usuario</h2>
          {/* Formulario para agregar una nueva tienda */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateTienda();
            }}
          >
            <input
              type="text"
              value={nuevaTienda.nombre}
              onChange={(e) =>
                setNuevaTienda({ ...nuevaTienda, nombre: e.target.value })
              }
              placeholder="Nombre de la Tienda/Usuario"
            />
            <input
              type="text"
              value={nuevaTienda.codigo}
              onChange={(e) =>
                setNuevaTienda({ ...nuevaTienda, codigo: e.target.value })
              }
              placeholder="Código"
            />
            <input
              type="text"
              value={nuevaTienda.categoria}
              onChange={(e) =>
                setNuevaTienda({ ...nuevaTienda, categoria: e.target.value })
              }
              placeholder="Categoría"
            />
            {/* Agregar más inputs según sea necesario */}
            <button type="submit">Agregar Tienda/Usuario</button>
          </form>

          <ul>
            {/* Renderizar la información de las tiendas */}
            {tiendas.slice(indexOfFirstItem, indexOfLastItem).map((tienda) => (
              <li key={tienda.id} className="tienda-item">
                {/* Renderizar la información de la tienda */}
                {editTiendaId === tienda.id ? (
                  <div className="edit-tienda">
                    <input
                      type="text"
                      value={tienda.NOMBRE}
                      onChange={(e) =>
                        handleTiendaInputChange(tienda.id, e.target.value)
                      }
                    />
                    <button
                      onClick={() =>
                        handleUpdateTienda(tienda.id, tienda.nombre)
                      }
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <div className="view-tienda">
                    <span>{tienda.CODIGO}</span>
                    <span>{tienda.NOMBRE}</span>
                    {tienda.qr ? (
                      <img
                        src={`data:image/png;base64,${tienda.qr}`}
                        alt={`QR de ${tienda.NOMBRE}`}
                      />
                    ) : (
                      <p>No QR Available</p>
                    )}
                    <FaEdit
                      className="iconAdmin"
                      onClick={() => setEditTiendaId(tienda.id)}
                    />
                  </div>
                )}
                <FaTrash
                  className="iconAdmin"
                  onClick={() => handleDeleteTienda(tienda.id)}
                />
              </li>
            ))}
          </ul>
          {/* Paginación */}
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(tiendas.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
        <div className="usuarios">
          <h2>Clientes</h2>
          <div className="filtro-fecha">
            <input
              type="date"
              value={fechaFiltro}
              onChange={handleFechaFiltroChange}
            />
            <button onClick={() => setFechaFiltro("")}>Filtrar</button>
          </div>
          {/* Renderizar la información de los usuarios */}
          {usuariosMostrados.map((usuario) => (
            <div key={usuario.id} className="usuario">
              <p className="fecha">
                {new Date(usuario.datos_fnacimiento).toLocaleDateString()}
              </p>
              <button onClick={() => handleToggleInfo(usuario.id)}>
                Mostrar Detalles
              </button>
              {usuario.expanded && (
                <div className="info-adicional">
                  <p>
                    <strong>Nombre:</strong> {usuario.datos_nombre}
                  </p>
                  <p>
                    <strong>Apellido:</strong> {usuario.datos_apellido}
                  </p>
                  <p>
                    <strong>Cédula:</strong> {usuario.datos_cedula}
                  </p>
                  <p>
                    <strong>Correo:</strong> {usuario.datos_correo}
                  </p>
                  <p>
                    <strong>Fecha de nacimiento:</strong>{" "}
                    {new Date(usuario.datos_fnacimiento).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {usuario.datos_telefono}
                  </p>
                  <p>
                    <strong>Marca:</strong> {usuario.marca}
                  </p>
                  <p>
                    <strong>Modelo:</strong> {usuario.modelo}
                  </p>
                  <p>
                    <strong>Placa:</strong> {usuario.placa}
                  </p>
                  <p>
                    <strong>Tipo de vehículo:</strong> {usuario.tipo}
                  </p>
                  <p>
                    <strong>Establecimiento:</strong>{" "}
                    {usuario.establishment_nombre}
                  </p>
                  <p>
                    <strong>Año:</strong> {usuario.ano}
                  </p>
                  <p>
                    <strong>Estilo:</strong> {usuario.estilo}
                  </p>
                  <p>
                    <strong>Serial:</strong> {usuario.serial}
                  </p>
                  <p>
                    <strong>Payment Data:</strong>
                  </p>
                  <ul>
                    <li>
                      <strong>Banco:</strong> {usuario.paymentData_banco}
                    </li>
                    <li>
                      <strong>Monto:</strong> {usuario.paymentData_monto}
                    </li>
                    <li>
                      <strong>Referencia:</strong>{" "}
                      {usuario.paymentData_referencia}
                    </li>
                  </ul>
                  {/* Mostrar imágenes */}

                  {usuarios.map((usuario, index) => (
                    <div key={index}>
                      {usuario.imagen_carnet && (
                        <div>
                          <p>
                            <strong>Imagen Carnet:</strong>
                          </p>
                          <img
                            src={`data:image/png;base64,${usuario.imagen_carnet}`}
                            alt="Imagen Carnet"
                            style={{ width: '200px', height: 'auto' }} 
                          />
                        </div>
                      )}

                      {usuario.imagen_cedula && (
                        <div>
                          <p>
                            <strong>Imagen Cédula:</strong>
                          </p>
                          <img

                            src={`data:image/png;base64,${usuario.imagen_cedula}`}
                            alt="Imagen Cédula"
                            style={{ width: '200px', height: 'auto' }} 
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminView;
