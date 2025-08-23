import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
    <h1 className="logo">
    <b>
      <span className="logo-q-blue">Q</span>
    </b>
    <span className="logo-r">r</span>
    <strong>
      <span className="logo-q-green">Q</span>
    </strong>
    <span className="logo-e">e</span>
    <span className="logo-text"> Management, </span>
    <span className="logo-llc">LLC</span>
    </h1>

      <ul className="ul">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/upload">Want to work with us?</Link></li>
      </ul>
    </nav>
  );
}

