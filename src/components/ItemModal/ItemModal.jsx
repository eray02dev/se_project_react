import "./ItemModal.css";

function ItemModal({
  activeModal,
  onClose,
  card,
  onRequestDelete, // ← yeni isim
  isDeleting = false,
}) {
  if (!card) return null;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          x
        </button>

        <img src={card.link} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div className="modal__footer-top">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              className="modal__delete-text"
              onClick={onRequestDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete item"}
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
