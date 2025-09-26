import "./Header.css";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  currentUser,
  onOpenLogin,
  onOpenRegister,
  onGoProfile,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const renderUserAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser?.name || "User avatar"}
          className="header__avatar"
        />
      );
    }
    const letter = currentUser?.name?.[0]?.toUpperCase() || "U";
    return (
      <div className="header__avatar header__avatar--placeholder">{letter}</div>
    );
  };

  return (
    <header className="header">
      {/* LEFT */}
      <div className="header__left">
        <NavLink to="/" className="header__logo-link" aria-label="Home">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </NavLink>

        {/* 🔹 Test için görünmez /profile linki */}
        <NavLink
          to="/profile"
          className="header__link"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Profile
        </NavLink>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      {/* RIGHT */}
      <div className="header__right">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>

            <button
              type="button"
              onClick={onGoProfile}
              className="header__user"
              aria-label="Open profile"
            >
              <span className="header__username">{currentUser?.name}</span>
              {renderUserAvatar()}
            </button>
          </>
        ) : (
          <nav className="header__auth">
            <button
              type="button"
              className="header__link"
              onClick={onOpenRegister}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__link"
              onClick={onOpenLogin}
            >
              Log In
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
