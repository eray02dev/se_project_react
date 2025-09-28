import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
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
  }, [isOpen, initial]);

  if (!isOpen) return null;

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Change profile data"
      ariaLabel="Change profile data"
      onSubmit={submit}
      actions={
        <button className="button" disabled={busy} type="submit">
          {busy ? "Saving..." : "Save changes"}
        </button>
      }
    >
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
    </ModalWithForm>
  );
}
