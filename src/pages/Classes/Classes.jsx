import { Title } from "../../components/Title/Title";
import { ClassesGrid } from "../../sections/classesSections/classesGrid/ClassesGrid";

export default function Classes() {
  return (
    <section className="display-column">
      <Title title="Classes" />
      <ClassesGrid />
    </section>
  );
}
