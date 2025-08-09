import "../ModalWithForm/ModalWithForm.css"; // modal iskeleti
import "./ConfirmDeleteModal.css"; // bu dosyayı ekliyoruz

function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""} confirm`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          x
        </button>

        <h3 className="confirm__title">
          Are you sure you want to delete this item?
        </h3>
        <h3 className="confirm__subtitle">This action is irreversible.</h3>

        <div className="confirm__actions">
          <button
            type="button"
            className="confirm__danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, delete item"}
          </button>

          <button type="button" className="confirm__cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
