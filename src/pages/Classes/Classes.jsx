import { Title } from "../../components/Title/Title";
import { ClassesGrid } from "../../sections/classesSections/classesGrid/ClassesGrid";

function Classes() {
  return (
    <section className="display-column">
      <Title title="Classes" />
      <ClassesGrid />
    </section>
  );
}

export const classesRoute = {
  element: <Classes />,
};
