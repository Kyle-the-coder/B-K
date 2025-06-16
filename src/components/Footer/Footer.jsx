import logo from "../../assets/logo/b-k.svg";
import fb from "../../assets/icons/facebookBlack.png";
import insta from "../../assets/icons/instagramBlack.png";
import email from "../../assets/icons/email.png";
import "./footer.css";

export function Footer() {
  return (
    <section className="footer-main charcoal-bg">
      <div className="footer-blerb">
        <h1 className="archivo-font">Bianca and Kyle</h1>
        <p className="archivo-font">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
      <img src={logo} className="footer-logo" />
      <div className="footer-contact">
        <h1 className="archivo-font text-underline">Contact:</h1>
        <div className="footer-social-container">
          <div className="social-info">
            <img src={fb} className="social-icon" />
            <p>text/text/fb.com</p>
          </div>
          <div className="social-info">
            <img src={insta} className="social-icon" />
            <p>text/text/insta.com</p>
          </div>
          <div className="social-info">
            <img src={email} className="social-icon" />
            <p>text@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
