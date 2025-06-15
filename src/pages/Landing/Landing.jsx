import { Banner } from "../../components/Banner/Banner";
import { Hero } from "../../sections/lpSections/Hero/Hero";
import { Learn } from "../../sections/lpSections/Learn/Learn";
import { Levels } from "../../sections/lpSections/Levels/Levels";
import { Newsletter } from "../../sections/lpSections/Newsletter/NewsLetter";

function LandingPage() {
  return (
    <div className="display-column">
      <Hero />
      <Newsletter />
      <Levels />
      <Banner />
      <Learn />
    </div>
  );
}

export const landingRoute = {
  element: <LandingPage />,
};
