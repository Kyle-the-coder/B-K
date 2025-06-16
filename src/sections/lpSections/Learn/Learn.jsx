import line from "../../../assets/design/line2.svg";
import "./learn.css";

export function Learn() {
  return (
    <section className="learn-main">
      <img src={line} className="learn-line" />
      <h1
        className="protest-font"
        style={{
          height: "fit-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          fontSize: "clamp(5rem, 6vw, 7rem",
          zIndex: "2",
          textAlign: "center",
          marginTop: "100px",
          marginBottom: "100px",
        }}
      >
        What Will You Learn?
      </h1>

      <div className="learn-blerb">
        <p className="archivo-font">
          Bianca and Kyle teach a wide range of street styles dance. They have
          taken the time to learn from some of the best and put what they
          learned to the test. Below is some examples and detailed info of these
          street styles.
        </p>
      </div>

      <div className="card-main-container">
        <div className="card">
          <div className="card-title"></div>
        </div>
      </div>
    </section>
  );
}
