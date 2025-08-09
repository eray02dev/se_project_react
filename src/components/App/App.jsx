import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnit";
import { coordinates, APIkey } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";

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

  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddClick = () => setIsAddModalOpen(true);
  const closeActiveModal = () => setIsAddModalOpen(false);

  const handleAddItem = (newItem) => {
    setIsSaving(true);
    const payload = {
      name: newItem.name,
      imageUrl: newItem.link,
      weather: newItem.weather,
    };

    addItem(payload)
      .then((saved) => {
        const clientShape = { ...saved, link: saved.imageUrl };
        setClothingItems((prev) => [clientShape, ...prev]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsSaving(false));
  };

  const handleCardClick = (card) => setSelectedCard(card);
  const handleCloseCardModal = () => setSelectedCard(null);

  const openConfirm = () => {
    if (!selectedCard) return;
    setPendingDeleteId(selectedCard.id ?? selectedCard._id);
    setSelectedCard(null);
    setIsConfirmOpen(true);
  };

  const closeConfirm = () => setIsConfirmOpen(false);

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) return;
    setIsDeleting(true);

    deleteItem(pendingDeleteId)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((it) => (it.id ?? it._id) !== pendingDeleteId)
        );
        setPendingDeleteId(null);
        closeConfirm();
      })
      .catch(console.error)
      .finally(() => setIsDeleting(false));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);

    getItems()
      .then((data) => {
        const fixed = data.map((item) => ({ ...item, link: item.imageUrl }));
        setClothingItems(fixed);
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
          isSaving={isSaving}
        />

        {selectedCard && (
          <ItemModal
            card={selectedCard}
            onClose={handleCloseCardModal}
            activeModal="preview"
            onRequestDelete={openConfirm}
            isDeleting={isDeleting}
          />
        )}

        <ConfirmDeleteModal
          isOpen={isConfirmOpen}
          onClose={closeConfirm}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      </div>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
