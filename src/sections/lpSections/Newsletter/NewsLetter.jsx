import { useEffect, useState } from "react";
import bandk from "../../../assets/design/BandKphoto.png";
import line from "../../../assets/design/line2.svg";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";
import "./newsletter.css";

export function Newsletter() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const photo = <img src={bandk} className="nl-img" />;

  const title = (
    <h1
      className="archivo-font white-text"
      style={{
        fontSize: windowWidth < 900 ? "5rem" : "clamp(3rem, 5vw, 6rem",
        textAlign: "center",
        textWrap: "wrap",
      }}
    >
      <span className="orange-text">Bianca</span> and
      <span className="red-text"> Kyle</span>
    </h1>
  );

  const text = (
    <p
      className="archivo-font white-text"
      style={{
        fontSize: windowWidth < 900 ? "1.3rem" : "clamp(1.2rem, 2vw, 3rem)",
        textAlign: "center",
        lineHeight: windowWidth < 900 ? "1.5" : "1.3",
        marginBottom: windowWidth < 900 ? "40px" : "0px",
      }}
    >
      Bianca and Kyle have been dancing together for over 10 years. They have
      built multiple teams, communities, and programs that have brought many
      people happiness and confidence. They continue their passion for dance and
      for helping others and are looking to build a new community in Idaho! They
      strive to build a community and eventually a full program filled with
      weekly classes, performances, and other dance oppurtunities. Stay up to
      date with us to find out about new things happening in the future!
    </p>
  );

  const input = (
    <div className="display-column">
      <input
        type="text"
        style={{
          width: "90%",
          padding: "15px 10px",
          borderRadius: "2rem",
          marginBottom: "20px",
        }}
        placeholder="email...."
      />
      <WordButton text="Submit" />
    </div>
  );

  return (
    <section className="newsletter-main charcoal-bg">
      {windowWidth < 900 ? (
        <>
          <img src={line} className="nl-line" />
          {title}
          {photo}
          {text}
          {input}
        </>
      ) : (
        <>
          <img src={line} className="nl-line" />
          {photo}
          <div className="nl-info-container">
            {title}
            {text}
            {input}
          </div>
        </>
      )}
    </section>
  );
}
