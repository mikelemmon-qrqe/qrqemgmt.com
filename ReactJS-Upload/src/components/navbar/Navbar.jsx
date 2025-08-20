import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">🌌 QrQe Mgmt</h1>
      <ul className="ul">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/upload">Upload Videos</Link></li>
      </ul>
    </nav>
  );
}
