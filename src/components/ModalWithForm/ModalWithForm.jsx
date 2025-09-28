import React from "react";

/**
 * Ortak modal form bileşeni.
 * Login / Register gibi form içeren tüm modallar bunu kullansın.
 * Stil için mevcut LoginModal.css sınıflarını (app-modal, app-modal__card, modal__actions) kullanır.
 */
export default function ModalWithForm({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  actions, // footer düğmeleri
  ariaLabel, // erişilebilirlik etiketi
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

        {actions && <div className="modal__actions">{actions}</div>}
      </form>
    </div>
  );
}
