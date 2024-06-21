import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './Componentes/Nav';
import Hero from './Componentes/Hero';
import About from './Componentes/About';
import Info from './Componentes/Info';
import Plans from './Componentes/Plans';
import Form from './Componentes/Form';
import Footer from './Componentes/Footer';
import Confirmation from './Componentes/Confirmation';
import Modal from './Modal';
import Login from './Componentes/Login';

function App() {
  const [establishment, setEstablishment] = useState(null);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get('codigo');
    const nombre = params.get('nombre');

    console.log(codigo, nombre);

    if (codigo && nombre) {
      // Si se encuentran el código y el nombre en la URL, establecer el establecimiento
      setEstablishment({ codigo, nombre });
    }
  }, []);


  

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<MainContent establishment={establishment} />} />
          <Route path="/formulario/:establecimiento" element={<Form codigo={establishment?.codigo} nombre={establishment?.nombre} />} />
          <Route path="/formulario/confirmacion" element={<Confirmation />} />
          <Route path="/login" element={<Login />} />
          {/* Redirige a la página principal si la ruta no coincide */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function MainContent({ establishment }) {
  return (
    <div>
      <Hero />
      <About id='about'/>
      <Info id='info'/>
      <Plans id='plans' establishment={establishment}/>
    </div>
  );
}

export default App;
