import "./Header.css";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      {/* ✅ Logo artık NavLink içinde */}
      <NavLink to="/" className="header__logo-link">
        <img src={logo} alt="WTWR logo" className="header__logo" />
      </NavLink>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>

      <nav className="header__nav">
        <NavLink to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img src={avatar} alt="User avatar" className="header__avatar" />
          </div>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
