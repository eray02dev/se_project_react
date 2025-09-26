import React from "react";
import "./RegisterModal.css";

export default function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  busy,
  error,
  onShowLogin, // opsiyonel: login modalını açtırmak için
}) {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  // Açılınca formu temizle + ESC ile kapanış
  React.useEffect(() => {
    if (!isOpen) return;
    setForm({ email: "", password: "", name: "", avatar: "" });

    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const filled =
    form.email.trim() &&
    form.password.trim() &&
    form.name.trim() &&
    form.avatar.trim();

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form); // { email, password, name, avatar }
  };

  const showLogin = onShowLogin || (() => {});

  return (
    <div
      className="register-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Sign Up"
    >
      <form
        className="register-card"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        noValidate
      >
        <button
          type="button"
          aria-label="Close"
          className="register-close"
          onClick={onClose}
          disabled={busy}
        >
          ✕
        </button>

        <h3 className="register-title">Sign Up</h3>

        <label className="register-field" htmlFor="reg-email">
          <span className="register-label">Email*</span>
          <input
            id="reg-email"
            className={`register-input ${error ? "register-input--error" : ""}`}
            name="email"
            type="email"
            value={form.email}
            onChange={handle}
            placeholder="Email"
            required
            autoComplete="email"
          />
        </label>

        <label className="register-field" htmlFor="reg-password">
          <span className="register-label">Password*</span>
          <input
            id="reg-password"
            className={`register-input ${error ? "register-input--error" : ""}`}
            name="password"
            type="password"
            value={form.password}
            onChange={handle}
            placeholder="Password"
            required
            autoComplete="new-password"
          />
        </label>

        <label className="register-field" htmlFor="reg-name">
          <span className="register-label">Name*</span>
          <input
            id="reg-name"
            className="register-input"
            name="name"
            value={form.name}
            onChange={handle}
            placeholder="Name"
            required
            autoComplete="name"
          />
        </label>

        <label className="register-field" htmlFor="reg-avatar">
          <span className="register-label">Avatar URL*</span>
          <input
            id="reg-avatar"
            className="register-input"
            name="avatar"
            value={form.avatar}
            onChange={handle}
            placeholder="Avatar URL"
            autoComplete="url"
            required // ← zorunlu oldu
          />
        </label>

        {error && (
          <p className="register-error">
            Could not sign up. Check your inputs or try another email.
          </p>
        )}

        <div className="register-actions">
          <button
            className="register-button"
            disabled={!filled || busy}
            type="submit"
          >
            {busy ? "Signing up..." : "Sign Up"}
          </button>

          <span className="register-or">or</span>

          {/* Log In: link-style */}
          <button
            type="button"
            className="register-login-link"
            onClick={() => {
              onClose(); // Register modalı kapat
              showLogin(); // Parent’tan login modalını açtır (varsa)
            }}
            disabled={busy}
            aria-label="Open Log In"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
