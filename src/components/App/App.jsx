import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnit";
import { coordinates, APIkey } from "../../utils/constants";
import { getItems } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: true,
    condition: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleAddClick = () => setIsAddModalOpen(true);
  const closeActiveModal = () => setIsAddModalOpen(false);

  const handleAddItem = (newItem) => {
    setClothingItems([newItem, ...clothingItems]);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseCardModal = () => {
    setSelectedCard(null);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);

    getItems()
      .then((data) => {
        const fixedItems = data.map((item) => ({
          ...item,
          link: item.imageUrl, // 👈 Bu satır kritik
        }));
        setClothingItems(fixedItems);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitProvider>
      <div className="page">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                handleCardClick={handleCardClick}
                clothingItems={clothingItems}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                onCardClick={handleCardClick}
                onAddClick={handleAddClick}
              />
            }
          />
        </Routes>

        <Footer />
        <AddItemModal
          isOpen={isAddModalOpen}
          onClose={closeActiveModal}
          onAddItem={handleAddItem}
        />
        {selectedCard && (
          <ItemModal
            card={selectedCard}
            onClose={handleCloseCardModal}
            activeModal="preview"
          />
        )}
      </div>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
