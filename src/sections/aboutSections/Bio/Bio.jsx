import line from "../../../assets/design/line2.svg";
import "./bio.css";

export function Bio({ bioImg, bioName, bioInfo, reverse = false }) {
  return (
    <section className={`bio-main ${reverse && "reverse"}`}>
      {reverse ? (
        <>
          <img
            src={line}
            style={{ right: "-20px", transform: "scaleX(-1) rotate(-28deg)" }}
            className="bio-line"
          />
          <div className="bio-white-bg-reverse"></div>
          <div className="bio-name-info ">
            <h1 className="protest-font">{bioName}</h1>
            <p className="archivo-font">{bioInfo}</p>
          </div>
          <img src={bioImg} className="bio-img" />
        </>
      ) : (
        <>
          <img
            src={line}
            className="bio-line"
            style={{ left: "-20px", transform: "rotate(-28deg)" }}
          />

          <div style={{ right: "20px" }} className="bio-white-bg"></div>
          <img src={bioImg} className="bio-img" />
          <div className="bio-name-info">
            <h1 className="protest-font">{bioName}</h1>
            <p className="archivo-font">{bioInfo}</p>
          </div>
        </>
      )}
    </section>
  );
}
