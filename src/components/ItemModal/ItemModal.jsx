import "./ItemModal.css";
import closeicon from "../../assets/closeingcardicon.png";

function ItemModal({
  activeModal,
  onClose,
  card,
  onDelete,
  isDeleting = false,
}) {
  if (!card) return null;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeicon} alt="close" />
        </button>

        <img src={card.link} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          <button
            className="modal__submit"
            onClick={() => onDelete && onDelete(card.id ?? card._id)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
