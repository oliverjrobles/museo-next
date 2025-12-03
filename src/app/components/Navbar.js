import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo-main">[Indsæt logo]</div>

        <ul className="navbar-menu">
          <li className="active">
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#blog">BLOG</a>
          </li>
          <li>
            <a href="#book">BOOK TABLE</a>
          </li>
          <li>
            <a href="#contact">CONTACT US</a>
          </li>
          <li>
            <a href="#login">LOG IN</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
