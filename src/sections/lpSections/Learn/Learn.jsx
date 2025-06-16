import { useRef, useState } from "react";
import example from "../../../assets/videos/heroVid.mp4";
import line from "../../../assets/design/line2.svg";
import cardBg from "../../../assets/design/graffiti.png";
import gsap from "gsap";
import "./learn.css";

export function Learn() {
  const [isExpandedArray, setIsExpandedArray] = useState([]);

  const containerRefs = useRef([]);
  const cardRefs = useRef([]);
  const titleRefs = useRef([]);
  const infoRefs = useRef([]);
  const imgRefs = useRef([]);
  const timelineRefs = useRef([]);

  const stylesArray = [
    {
      title: "Popping",
      info: "This style is “insert style”… etc. Click here to see example",
      video: example,
    },
    {
      title: "Waving",
      info: "This style is “insert style”… etc. Click here to see example",
      video: example,
    },
    {
      title: "Tutting",
      info: "This style is “insert style”… etc. Click here to see example",
      video: example,
    },
    {
      title: "Hip Hop",
      info: "This style is “insert style”… etc. Click here to see example",
      video: example,
    },
  ];
  const handleClick = (index) => {
    if (!timelineRefs.current[index]) {
      const tl = gsap.timeline({ paused: true });
      timelineRefs.current[index] = tl;

      tl.to(titleRefs.current[index], {
        height: "100%",
      });

      tl.to(cardRefs.current[index], {
        top: 0,
        width: "100%",
        height: "50%",
        duration: 0.3,
        ease: "power1.out",
      });

      tl.to(
        infoRefs.current[index],
        {
          height: "50%",
          transform: "translateY(0%)",
          bottom: 0,
          duration: 0.3,
          ease: "power1.out",
        },
        "<"
      );

      tl.to(
        imgRefs.current[index],
        {
          opacity: 1,
          height: "700px",
          delay: 0.3,
          ease: "power1.out",
        },
        "<"
      );

      tl.to([cardRefs.current[index], infoRefs.current[index]], {
        height: "100px",
        duration: 0.3,
        ease: "power1.out",
      });

      tl.to(containerRefs.current[index], {
        height: "700px",
        duration: 0.3,
        ease: "circ.in",
      });
    }

    if (!isExpandedArray[index]) {
      timelineRefs.current[index].play();
    } else {
      timelineRefs.current[index].reverse();
    }

    setIsExpandedArray((prev) => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

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
          street styles.{" "}
          <strong className="text-underline">
            {" "}
            Click on the style name to see a video example.
          </strong>
        </p>
      </div>

      {stylesArray.map((style, index) => (
        <div
          className="card-main-container"
          ref={(el) => (containerRefs.current[index] = el)}
          key={index}
        >
          <div
            className="card"
            onClick={() => handleClick(index)}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div
              className="card-title"
              ref={(el) => (titleRefs.current[index] = el)}
            >
              <h1 className="protest-font">{style.title}</h1>
            </div>
            <img src={cardBg} className="card-bg" />
          </div>
          <video
            src={style.video}
            loop
            muted
            controls
            className="card-video"
            ref={(el) => (imgRefs.current[index] = el)}
            style={{ opacity: 0, height: 0, overflow: "hidden" }}
          />
          <div
            className="info charcoal-bg"
            ref={(el) => (infoRefs.current[index] = el)}
          >
            <p className="protest-font">{style.info}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
