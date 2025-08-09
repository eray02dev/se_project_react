import { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onClose, onAddItem, isSaving = false }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, link: imageUrl, weather };
    onAddItem(newItem);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Add New Clothing"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isSaving ? "Saving..." : "Add Garment"}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          placeholder="Name"
          className="modal__input"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Image URL
        <input
          type="url"
          placeholder="Image URL"
          className="modal__input"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Weather</legend>

        <label className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="hot"
            className="modal__radio-input"
            checked={weather === "hot"}
            onChange={(e) => setWeather(e.target.value)}
            required
          />
          Hot
        </label>

        <label className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="warm"
            className="modal__radio-input"
            checked={weather === "warm"}
            onChange={(e) => setWeather(e.target.value)}
          />
          Warm
        </label>

        <label className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="cold"
            className="modal__radio-input"
            checked={weather === "cold"}
            onChange={(e) => setWeather(e.target.value)}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
