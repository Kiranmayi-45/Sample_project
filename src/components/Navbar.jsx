import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();

  return (
    <nav className={`nav ${open ? "open" : "closed"}`}>
      <div className="nav-top">
        <button className="toggle-btn" onClick={() => setOpen(o => !o)}>
          ☰
        </button>
        {open && <span className="brand">My App</span>}
      </div>

      <ul className="nav-links">
        <li className={pathname === "/" ? "active" : ""}>
          <Link to="/">🏠 {open && "Home"}</Link>
        </li>
        <li className={pathname === "/login" ? "active" : ""}>
          <Link to="/login">🔐 {open && "Login"}</Link>
        </li>
        <li className={pathname === "/register" ? "active" : ""}>
          <Link to="/register">📝 {open && "Register"}</Link>
        </li>
      </ul>
    </nav>
  );
}
