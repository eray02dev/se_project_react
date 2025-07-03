import { useEffect, useState } from "react";

import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWhitForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  // ✅ clothingItems state’i localStorage’tan başlatılıyor
  const [clothingItems, setClothingItems] = useState(() => {
    const saved = localStorage.getItem("clothingItems");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("localStorage parse hatası:", err);
      }
    }
    return defaultClothingItems;
  });

  const [activeModal, setActiveModal] = useState("");
  const [SelectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddGarment = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const link = e.target.imageUrl.value;
    const weather = e.target.weather.value;

    const newItem = {
      _id: Date.now(),
      name,
      link,
      weather,
    };

    const updatedItems = [newItem, ...clothingItems];
    setClothingItems(updatedItems);

    // ✅ localStorage'a da kaydediyoruz
    localStorage.setItem("clothingItems", JSON.stringify(updatedItems));

    closeActiveModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </div>

      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        onSubmit={handleAddGarment}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
            name="name"
            required
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
            name="imageUrl"
            required
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              name="weather"
              id="hot"
              type="radio"
              className="modal__radio-input"
              value="hot"
              required
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="weather"
              id="warm"
              type="radio"
              className="modal__radio-input"
              value="warm"
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="weather"
              id="cold"
              type="radio"
              className="modal__radio-input"
              value="cold"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>

      <ItemModal
        activeModal={activeModal}
        card={SelectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
