import { Title } from "../../components/Title/Title";
import { Bio } from "../../sections/aboutSections/Bio/Bio";
import bianca from "../../assets/design/bianca.png";
import kyle from "../../assets/design/kyle.png";
export default function About() {
  return (
    <section className="display-column">
      <Title title="About" />
      <Bio
        bioImg={bianca}
        bioName="Bianca Zogbi"
        bioInfo="dances and loves dancing."
      />
      <Bio
        bioImg={kyle}
        bioName="Kyle Mitchell"
        bioInfo="dances and loves dancing."
        reverse={true}
      />
    </section>
  );
}
