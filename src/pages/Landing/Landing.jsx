import { Hero } from "../../sections/lpSections/Hero/Hero";
import { Levels } from "../../sections/lpSections/Levels/Levels";
import { Newsletter } from "../../sections/lpSections/Newsletter/NewsLetter";

function LandingPage() {
  return (
    <div className="display-column">
      <Hero />
      <Newsletter />
      <Levels />
    </div>
  );
}

export const landingRoute = {
  element: <LandingPage />,
};
