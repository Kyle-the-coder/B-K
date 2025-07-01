import { use, useEffect, useState } from "react";
import { getClassById } from "../../utils/classApi";
import { Loader } from "../../components/Loader/Loader";
import { ScTitle } from "../../sections/singleClassSections/scTitle/ScTitle";
import { useParams } from "react-router-dom";

export default function SingleClass({}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [subject, setSubject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await getClassById(id);
        setSubject(res);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };

    fetchClass();
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <section id="single-class" className="display-column">
      {subject ? (
        <>
          {" "}
          <ScTitle
            classTitle={subject.classTitle}
            cateogryTitle={subject.cateogryTitle}
            teachers={subject.teachers}
            datePosted={subject.datePosted}
            titleImg={subject.imgUrl}
            partName={
              subject?.content.find((item) => item.type === "Redirect")?.value
                ?.partName
            }
            partUrl={
              subject?.content.find((item) => item.type === "Redirect")?.value
                ?.partUrl
            }
            description={
              subject.content.find((item) => item.type === "Description")?.value
            }
            redirectLink={subject.redirectLink}
            classDate={subject.classDate}
          />
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </section>
  );
}
