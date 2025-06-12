import { Hero } from "../../sections/lpSections/Hero/Hero";
import "./landing.css";

function LandingPage() {
  return (
    <div className="display-column">
      <Hero />
    </div>
  );
}

export const landingRoute = {
  element: <LandingPage />,
};
