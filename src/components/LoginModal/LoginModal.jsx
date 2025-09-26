import React from "react";
import "./LoginModal.css";

export default function LoginModal({ isOpen, onClose, onSubmit, busy, error }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (!isOpen) return;
    setEmail("");
    setPassword("");
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  const filled = email.trim() && password.trim();

  return (
    <div
      className="app-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Log In"
    >
      <form
        className="app-modal__card"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
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

        {/* Hatalı <h> yerine h3 */}
        <h3 className="app-modal__title">Log In</h3>

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

        <div className="modal__actions">
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
              /* open signup modal from parent */
            }}
            disabled={busy}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
