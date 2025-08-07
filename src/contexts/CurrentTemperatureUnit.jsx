import { createContext, useState } from "react";

// Sıcaklık birimi için context oluşturuluyor
export const CurrentTemperatureUnitContext = createContext();

// Provider bileşeni: Uygulama genelinde sıcaklık birimini yönetir
export const CurrentTemperatureUnitProvider = ({ children }) => {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const value = { currentTemperatureUnit, setCurrentTemperatureUnit };

  return (
    <CurrentTemperatureUnitContext.Provider value={value}>
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
};
