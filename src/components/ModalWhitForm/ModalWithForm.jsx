import "./ModalWithForm.css";
import closeicon from "../../assets/closeicon.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  onSubmit, // ✅ yeni prop eklendi
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeicon} alt="close" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {" "}
          {/* ✅ form submit desteği */}
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
