import "./ToggleSwitch.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnit";

export default function ToggleSwitch() {
  const { currentTemperatureUnit, setCurrentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
  const isChecked = currentTemperatureUnit === "C";

  const handleToggle = () => {
    setCurrentTemperatureUnit(isChecked ? "F" : "C");
  };

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className="toggle-switch__circle"></span>
      <span
        className={`toggle-switch__text toggle-switch__text_F ${
          !isChecked ? "active" : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text_C ${
          isChecked ? "active" : ""
        }`}
      >
        C
      </span>
    </label>
  );
}
