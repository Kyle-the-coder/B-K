import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";
// import { Footer } from "../components/Footer/Footer";
// import { Loader } from "../components/Loader/Loader";

export function MainLayout() {
  const { state } = useNavigation();

  return (
    <div className="main-container">
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
      {/* <Footer /> */}
    </div>
  );
}
