import { useState } from "react";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onClose, onAddItem, isSaving = false }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, link: imageUrl, weather };
    onAddItem(newItem); // POST işlemi parent’ta
    // Not: Kapatmayı ve reset’i parent başarıdan sonra yapacak.
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          x
        </button>
        <h2 className="modal__title">Add New Clothing</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
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

          <button type="submit" className="modal__submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Add Garment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
