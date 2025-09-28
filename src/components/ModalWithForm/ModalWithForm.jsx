import React from "react";

/**
 * Ortak modal form bileşeni.
 * Login / Register / AddItem gibi form içeren tüm modallar bunu kullanır.
 *
 * - `actions` verilirse aynen basılır.
 * - `actions` verilmezse, `buttonText` ile default submit butonu render edilir.
 */
export default function ModalWithForm({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  actions, // özel footer düğmeleri (opsiyonel)
  ariaLabel, // erişilebilirlik etiketi (opsiyonel)
  buttonText, // default submit butonu metni (opsiyonel)
  submitDisabled = false, // default submit butonu için disabled durumu
}) {
  React.useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="app-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title}
    >
      <form
        className="app-modal__card"
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
        noValidate
      >
        <button
          type="button"
          className="app-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {title && <h3 className="app-modal__title">{title}</h3>}

        {children}

        {/* Footer */}
        {actions ? (
          <div className="modal__actions">{actions}</div>
        ) : buttonText ? (
          <div className="modal__actions">
            <button
              type="submit"
              className="modal__submit"
              disabled={submitDisabled}
            >
              {buttonText}
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
