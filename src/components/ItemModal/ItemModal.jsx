import "./ItemModal.css";

function ItemModal({
  activeModal,
  onClose,
  card,
  onRequestDelete,
  isDeleting = false,
  // 🆕 Sprint 14: sahiplik kontrolü için currentUser
  currentUser,
}) {
  if (!card) return null;

  const isOpen = activeModal === "preview";
  const isOwn = card?.owner === currentUser?._id; // sadece owner silsin

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close preview"
        >
          x
        </button>

        <img src={card.link} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div className="modal__footer-top">
            <h2 className="modal__caption">{card.name}</h2>

            {/* 🆕 Delete sadece owner'a görünür */}
            {isOwn && (
              <button
                className="modal__delete-text"
                onClick={onRequestDelete}
                disabled={isDeleting}
                aria-label="Delete item"
              >
                {isDeleting ? "Deleting..." : "Delete item"}
              </button>
            )}
          </div>

          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
