import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import DOMPurify from "dompurify";
import "./classesgrid.css";
import { Loader } from "../../../components/Loader/Loader";

export function ClassesGrid() {
  const [flyerIndex, setFlyerIndex] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClasses() {
      try {
        const querySnapshot = await getDocs(collection(db, "class"));
        const classData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          imgUrl: doc.data().imgUrl,
        }));
        setClasses(classData);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClasses();
  }, []);

  function handleHover(index) {
    setFlyerIndex(index);
  }

  if (loading) {
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
            <img src={info.imgUrl} className="cg-img" alt={info.title} />
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
