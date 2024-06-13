import React, { useState } from "react";
import '../CSS/Login.css'
import { Navigate } from 'react-router-dom'; // Importa Navigate para redireccionar
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false); // Estado para controlar la redirección

  const handleLogin = () => {
    axios.post('https://vivirseguros.gocastgroup.com:3100/login', { username, password })
      .then((response) => {
        // Manejar el inicio de sesión exitoso
        // Establecer el estado de redirección a true
        setRedirect(true);
      })
      .catch((error) => {
        // Manejar el error de inicio de sesión
        alert("Error: Nombre de usuario o contraseña incorrectos.");
      });
  };

  // Si redirect es true, redirigir al usuario a la vista de administrador
  if (redirect) {
    return <Navigate to="/adminview" />;
  }

  return (
    <div className="login">
      <form>
      <h2>Login</h2>
        <div>
          <label>Username:</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
