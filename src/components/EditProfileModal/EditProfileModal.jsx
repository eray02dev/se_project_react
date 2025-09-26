import React from "react";
import "./EditProfileModal.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  onSubmit,
  initial,
  busy,
}) {
  const [form, setForm] = React.useState({ name: "", avatar: "" });

  React.useEffect(() => {
    if (!isOpen) return;
    setForm({
      name: initial?.name || "",
      avatar: initial?.avatar || "",
    });
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, initial, onClose]);

  if (!isOpen) return null;

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div
      className="modal modal_opened"
      role="dialog"
      aria-modal="true"
      aria-label="Change profile data"
    >
      <div className="modal__backdrop" onClick={onClose} />

      <form
        className="modal__card"
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        noValidate
      >
        <button
          type="button"
          className="modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="modal__title">Change profile data</h3>

        <label className="field required">
          <span className="field__label">Name</span>
          <input
            className="input"
            name="name"
            value={form.name}
            onChange={handle}
            autoComplete="name"
            required
            autoFocus
          />
        </label>

        <label className="field required">
          <span className="field__label">Avatar</span>
          <input
            className="input"
            name="avatar"
            type="url"
            placeholder="https://..."
            value={form.avatar}
            onChange={handle}
            autoComplete="url"
            required
          />
        </label>

        <div className="modal__actions">
          <button className="button" disabled={busy} type="submit">
            {busy ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
