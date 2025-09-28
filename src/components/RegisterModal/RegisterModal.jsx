import React from "react";
import "../LoginModal/LoginModal.css"; // aynı modal stillerini paylaş
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  busy,
  error,
  onShowLogin, // Login modala geçiş
}) {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  React.useEffect(() => {
    if (!isOpen) return;
    setForm({ email: "", password: "", name: "", avatar: "" });
  }, [isOpen]);

  if (!isOpen) return null;

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const filled =
    form.email.trim() &&
    form.password.trim() &&
    form.name.trim() &&
    form.avatar.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign Up"
      ariaLabel="Sign Up"
      onSubmit={handleSubmit}
      actions={
        <>
          <button
            className="button button--muted"
            disabled={!filled || busy}
            type="submit"
          >
            {busy ? "Signing up..." : "Sign Up"}
          </button>
          <span className="sep">or</span>
          <button
            className="link_button"
            type="button"
            onClick={() => {
              onClose?.();
              onShowLogin?.(); // ➜ Login modalını aç
            }}
            disabled={busy}
          >
            Log In
          </button>
        </>
      }
    >
      <label className="field" htmlFor="reg-email">
        <span className="field__label">Email*</span>
        <input
          id="reg-email"
          className={`input input--underline ${error ? "input--error" : ""}`}
          name="email"
          type="email"
          value={form.email}
          onChange={handle}
          placeholder="Email"
          required
          autoComplete="email"
        />
      </label>

      <label className="field" htmlFor="reg-password">
        <span className="field__label">Password*</span>
        <input
          id="reg-password"
          className={`input input--underline ${error ? "input--error" : ""}`}
          name="password"
          type="password"
          value={form.password}
          onChange={handle}
          placeholder="Password"
          required
          autoComplete="new-password"
        />
      </label>

      <label className="field" htmlFor="reg-name">
        <span className="field__label">Name*</span>
        <input
          id="reg-name"
          className="input input--underline"
          name="name"
          value={form.name}
          onChange={handle}
          placeholder="Name"
          required
          autoComplete="name"
        />
      </label>

      <label className="field" htmlFor="reg-avatar">
        <span className="field__label">Avatar URL*</span>
        <input
          id="reg-avatar"
          className="input input--underline"
          name="avatar"
          value={form.avatar}
          onChange={handle}
          placeholder="https://..."
          autoComplete="url"
          required
        />
      </label>

      {error && (
        <p className="form-error">
          Could not sign up. Check your inputs or try another email.
        </p>
      )}
    </ModalWithForm>
  );
}
