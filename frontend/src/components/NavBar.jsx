import "../css/NavBar.css";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="left">
        <a href="/">
          <img src={Logo} alt="Logo" />
        </a>
      </div>
      <div className="right">
        <ul>
          <li>
            <NavLink to="/" end>
              <FontAwesomeIcon icon={faHouse} color="#a662f4" />
              <span className="nav-label">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              <FontAwesomeIcon icon={faMagnifyingGlass} color="#a662f4" />
              <span className="nav-label">Search</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorite">
              <FontAwesomeIcon icon={faHeart} color="#a662f4" />
              <span className="nav-label">Favorites</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
