import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { ClassesContext } from "../../../contexts/ClassesContext";
import "./classesgrid.css";
import { Loader } from "../../../components/Loader/Loader";

export function ClassesGrid() {
  const classes = useContext(ClassesContext); // ✅ Use context
  const [flyerIndex, setFlyerIndex] = useState(null);
  const navigate = useNavigate();

  function handleHover(index) {
    setFlyerIndex(index);
  }

  // ✅ Show loader only if classes aren't loaded yet
  if (!classes.length) {
    return (
      <section className="cg-main-loading">
        <Loader />
      </section>
    );
  }

  return (
    <section className="cg-main">
      {classes.map((info, index) => {
        const rawDescription =
          info.content.find((item) => item.type === "Description")?.value || "";
        const textOnly = DOMPurify.sanitize(rawDescription, {
          ALLOWED_TAGS: [],
        });
        const shortText =
          textOnly.slice(0, 100) + (textOnly.length > 100 ? "..." : "");

        return (
          <div
            key={info.id}
            className="cg-container"
            style={{
              boxShadow:
                index === flyerIndex
                  ? "0 0 25px var(--red)"
                  : "0 2px 8px #0000001a",
            }}
            onMouseEnter={() => handleHover(index)}
            onClick={() => navigate(`singleClass/${info.id}`)}
          >
            <img src={info.imgUrl} className="cg-img" alt={info.classTitle} />
            <p
              className="archivo-font silver-text"
              style={{ fontSize: "1.8rem" }}
            >
              {info.classDate}
            </p>
            <h1 className="protest-font" style={{ fontSize: "2rem" }}>
              {info.classTitle}
            </h1>
            <p
              style={{ fontSize: "1.3rem" }}
              className="archivo-font d-silver-text"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(shortText),
              }}
            />
          </div>
        );
      })}
    </section>
  );
}
