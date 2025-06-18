import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";
import upArrow from "../assets/icons/ogUpArrow.png";
import { scrollToSection } from "../components/SmoothScroll";
// import { Loader } from "../components/Loader/Loader";

export function MainLayout() {
  const { state } = useNavigation();

  return (
    <div className="main-container silver-bg">
      <img
        src={upArrow}
        className="main-up-arrow"
        onClick={() => scrollToSection("#nav")}
      />
      <Nav />
      {state === "loading" ? (
        {
          /* <Loader /> */
        }
      ) : (
        <div>
          <Outlet />
        </div>
      )}
      <Footer />
    </div>
  );
}
