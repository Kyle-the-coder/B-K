import flyer from "../../../assets/placeholders/EDPFlyer.png";
import "./classesgrid.css";

export function ClassesGrid({ img, title, date, blerb }) {
  const flyerArray = [
    {
      img: flyer,
      title: "Hip Hop Choreography",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
    {
      img: flyer,
      title: "Hip Hop Choreography1",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
    {
      img: flyer,
      title: "Hip Hop Choreography2",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
    {
      img: flyer,
      title: "Hip Hop Choreography3",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
    {
      img: flyer,
      title: "Hip Hop Choreography4",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
    {
      img: flyer,
      title: "Hip Hop Choreography5",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
    {
      img: flyer,
      title: "Hip Hop Choreography6",
      date: "May 19th, 2025",
      blerb:
        " This is a Choreography class in which students will learn a small routine",
    },
  ];
  return (
    <section className="cg-main">
      {flyerArray.map((info, index) => (
        <div key={info.title} className="cg-container">
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
