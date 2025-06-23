import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorLayout } from "./layouts/ErrorLayout";
import { landingRoute } from "./pages/Landing/Landing";
import { aboutRoute } from "./pages/About/About";
import { classesRoute } from "./pages/Classes/Classes";
import { singleClassRoute } from "./pages/SingleClass/SingleClass";
import { loginRoute } from "./pages/Login/Login";
// import { aboutRoute } from "./pages/About/About";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { path: "/", ...landingRoute },
      { path: "/about", ...aboutRoute },
      { path: "/classes", ...classesRoute },
      { path: "/classes/singleClass/:id", ...singleClassRoute },
      { path: "/login", ...loginRoute },
    ],
  },
]);
