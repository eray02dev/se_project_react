import React from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  isOpen,
  onClose,
  onSubmit,
  busy,
  error,
  onShowRegister, // Register modala geçiş
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (!isOpen) return;
    setEmail("");
    setPassword("");
  }, [isOpen]);

  if (!isOpen) return null;

  const filled = email.trim() && password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log In"
      ariaLabel="Log In"
      onSubmit={handleSubmit}
      actions={
        <>
          <button
            className="button button--muted"
            disabled={!filled || busy}
            type="submit"
          >
            {busy ? "Logging in..." : "Log In"}
          </button>
          <span className="sep">or</span>
          <button
            className="link_button"
            type="button"
            onClick={() => {
              onClose?.();
              onShowRegister?.(); // ➜ Register modalını aç
            }}
            disabled={busy}
          >
            Sign Up
          </button>
        </>
      }
    >
      <label className="field" htmlFor="email">
        <span className="field__label">Email</span>
        <input
          id="email"
          className={`input input--underline ${error ? "input--error" : ""}`}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </label>

      <label className="field" htmlFor="password">
        <span className="field__label">Password</span>
        <input
          id="password"
          className={`input input--underline ${error ? "input--error" : ""}`}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </label>

      {error && <p className="form-error">Invalid email or password</p>}
    </ModalWithForm>
  );
}
