import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <span className="footer__left">Developed by Eray Ege</span>
      <span className="footer__right">{year}</span>
    </footer>
  );
}

export default Footer;
