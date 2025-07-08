import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClassesContext } from "../../contexts/ClassesContext";
import { Loader } from "../../components/Loader/Loader";
import { ScTitle } from "../../sections/singleClassSections/scTitle/ScTitle";

export default function SingleClass() {
  const { id } = useParams();
  const classes = useContext(ClassesContext); // ✅ Get all classes from context
  const subject = classes.find((cls) => cls.id === id); // ✅ Find by ID
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!subject) {
    return (
      <section id="single-class" className="display-column">
        <Loader />
      </section>
    );
  }

  return (
    <section id="single-class" className="display-column">
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
    </section>
  );
}
