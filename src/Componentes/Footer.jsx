import "../CSS/Footer.css";
import figlogo from "../assets/logo.png";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import Login from "./Login";
import { color } from "framer-motion";

const Footer = () => {
  const links = [
    {
      title: "Contacto",
      data: [" (58212) 43123535 / 2454"],
    },
    {
      title: "Productos",
      data: ["Automovil", "Personas y Salud", "Patrimoniales y Fianzas"],
    },
  ];
  const socialLink = [
    <BsFacebook />,
    <BsTwitter />,
    <BsInstagram />,
    <FaTiktok />,
  ];

  return (
    <footer>
      <div className="upper">
        <div className="brand-container">
          <div className="brand">
            <img src={figlogo} alt="logo" />
          </div>
          <a
            href="https://backoffice-vivirseguros.vercel.app"
            style={{ color: "black", textDecoration: "none" }}
          >
            Vivir Seguros
          </a>

          <ul>
            {socialLink.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>
        <div className="links">
          {links.map(({ title, data }, index) => {
            return (
              <div className="link" key={index}>
                <h4>{title}</h4>
                <ul>
                  {data.map((link, index2) => (
                    <li key={index2}>{link}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lower">
        <span>&copy; Copyright 2024</span>
        <span>GoCast Group 2024</span>
        <span>
          &Designe; By{" "}
          <a href="https://gocastgroup.com" target="blank">
            Grupo GoCast
          </a>{" "}
          Soluciones, C.A 2024
        </span>
      </div>
    </footer>
  );
};

export default Footer;
