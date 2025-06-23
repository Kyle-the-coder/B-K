import { useState } from "react";
import flyer from "../../../assets/placeholders/EDPFlyer.png";
import "./classesgrid.css";
import { useNavigate } from "react-router-dom";

export function ClassesGrid({ img, title, date, blerb }) {
  const [flyerIndex, setFlyerIndex] = useState(null);
  const navigate = useNavigate();
  function handleHover(index) {
    setFlyerIndex(index);
  }
  const flyerArray = [
    {
      img: flyer,
      id: 1,
      title: "Hip Hop Choreography",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
    {
      img: flyer,
      id: 2,
      title: "Hip Hop Choreography1",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
    {
      img: flyer,
      id: 3,
      title: "Hip Hop Choreography2",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
    {
      img: flyer,
      id: 4,
      title: "Hip Hop Choreography3",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
    {
      img: flyer,
      id: 5,
      title: "Hip Hop Choreography4",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
    {
      img: flyer,
      id: 6,
      title: "Hip Hop Choreography5",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
    {
      img: flyer,
      id: 7,
      title: "Hip Hop Choreography6",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
  ];

  console.log(flyerIndex);
  return (
    <section className="cg-main">
      {flyerArray.map((info, index) => (
        <div
          key={info.title}
          className="cg-container"
          style={{
            boxShadow:
              index === flyerIndex
                ? "0 0 25px var(--red)"
                : "0 2px 8px #0000001a",
          }}
          onMouseEnter={() => {
            handleHover(index);
          }}
          onClick={() => navigate(`singleClass/${info.id}`)}
        >
          <img src={info.img} className="cg-img" />
          <p
            className="archivo-font silver-text"
            style={{ fontSize: "1.8rem" }}
          >
            {info.date}
          </p>
          <h1 className="protest-font" style={{ fontSize: "2rem" }}>
            {info.title}
          </h1>
          <p
            style={{ fontSize: "1.3rem" }}
            className="archivo-font d-silver-text"
          >
            {info.blerb}
          </p>
        </div>
      ))}
    </section>
  );
}
