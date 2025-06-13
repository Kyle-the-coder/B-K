import { useEffect, useRef, useState } from "react";
import minus from "../../../assets/icons/remove.png";
import plus from "../../../assets/icons/plus.png";
import levelsBg from "../../../assets/design/levelsBg.png";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";
import "./levels.css";

export function Levels() {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);
  const levelsInfo = [
    {
      title: "Never taken a class before",
      blurb:
        "We call this the Introduction series where brand new dancers and people who have never taken a dance class before can enter into the space and take a class that would introduce foundation, choreography, and even how to learn in a dance class. Meet other people just starting out and begin your journey today!",
      button: <WordButton fontSize=".8rem" text="Intro Classes" />,
    },
    {
      title: "Beginners",
      blurb: "beginner friendly classes",
      button: <WordButton fontSize=".8rem" text="Beginner Classes" />,
    },
    {
      title: "Intermediate",
      blurb: "intermediate friendly classes",
      button: <WordButton fontSize=".8rem" text="Intermediate Classes" />,
    },
    {
      title: "Advance",
      blurb: "advance friendly classes",
      button: <WordButton fontSize=".8rem" text="Advance Classes" />,
    },
  ];

  function handleIndex(index) {
    setActiveIndex(index);
  }

  function clearIndex() {
    setActiveIndex(null);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".faq-card")) {
        clearIndex();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <section className="levels-main">
      <div className="levels-title-container">
        <h1 className="protest-font" style={{ textAlign: "center" }}>
          Dance is for Everyone
        </h1>
      </div>

      <div className="faq-cards-container">
        <img src={levelsBg} className="levels-bg" />
        {levelsInfo.map((info, index) => (
          <div
            className="faq-card"
            onClick={() => {
              activeIndex === index ? clearIndex() : handleIndex(index);
            }}
            key={info.title}
            style={{
              backgroundColor:
                activeIndex === index
                  ? "rgba(0, 0, 0, 0.946)"
                  : "rgba(0, 0, 0, 0.703)",
            }}
          >
            <div className="faq-card-title">
              <h1
                className={`protest-font ${
                  activeIndex === index && "orange-text"
                } `}
                style={{
                  transition: "all .4s",
                  fontSize: "3rem",
                }}
              >
                {info.title}
              </h1>
              {activeIndex === index ? (
                <img src={minus} onClick={() => clearIndex()} />
              ) : (
                <img src={plus} onClick={() => handleIndex(index)} />
              )}
            </div>
            <div
              className="faq-card-info"
              ref={(el) => (contentRefs.current[index] = el)}
              style={{
                maxHeight:
                  activeIndex === index
                    ? `${contentRefs.current[index]?.scrollHeight + 200}px`
                    : "0px",
                opacity: activeIndex === index ? "1" : "0",
                overflow: "hidden",
                paddingTop: activeIndex === index ? "50px" : "0px",
              }}
            >
              <p className="mont-thin-font" style={{ marginBottom: "20px" }}>
                {info.blurb}
              </p>
              {info.button}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
