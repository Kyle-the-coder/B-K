import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { Suspense } from "react"; // 🔥 Add Suspense
import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";
import upArrow from "../assets/icons/ogUpArrow.png";
import { scrollToSection } from "../components/SmoothScroll";
import { Loader } from "../components/Loader/Loader"; // 👈 optional custom spinner

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

      {/* ✅ Wrap lazy-loaded routes in Suspense */}
      <Suspense fallback={<Loader />}>
        {state === "loading" ? (
          <Loader />
        ) : (
          <div>
            <Outlet />
          </div>
        )}
      </Suspense>

      <Footer />
    </div>
  );
}
