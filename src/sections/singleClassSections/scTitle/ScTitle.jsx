import DOMPurify from "dompurify";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";
import "./sctitle.css";

export function ScTitle({
  classTitle,
  categoryTitle,
  teachers,
  datePosted,
  titleImg,
  partUrl,
  partName,
  description,
}) {
  const formattedDate = datePosted?.toDate
    ? datePosted.toDate().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date(datePosted).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  return (
    <section className="sc-title-main-container charcoal-bg white-text">
      <p className="sc-sub outfit-font">{categoryTitle}</p>
      <h1 className="sc-title playfair-font" style={{ marginBottom: "40px" }}>
        {classTitle}
      </h1>

      <img src={titleImg || placeholder} alt="Blog banner" />

      <p
        className="sc-title-blerb outfit-thin-font"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(description),
        }}
      />

      {partName && (
        <WordButton
          onClick={() => (window.location.href = partUrl)}
          text={partName}
        />
      )}

      <div className="sc-title-info-container">
        <div className="sc-title-info">
          <h6 className="outfit-xthin-font">Teacher:</h6>
          <h5 className="playfair-font">{teachers || "Unknown"}</h5>
        </div>

        <div className="sc-title-info">
          <h6 className="outfit-xthin-font">Date Posted:</h6>
          <h5 className="playfair-font">{formattedDate}</h5>
        </div>
      </div>
    </section>
  );
}
