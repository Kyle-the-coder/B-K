import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorLayout } from "./layouts/ErrorLayout";
import { landingRoute } from "./pages/Landing/landingRoute.jsx";
import { aboutRoute } from "./pages/About/aboutRoute.jsx";
import { classesRoute } from "./pages/Classes/classesRoute.jsx";
import { singleClassRoute } from "./pages/SingleClass/SingleClass";
import { loginRoute } from "./pages/Login/loginRoute.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { Dashboard } from "./pages/Dashboard/Dashboard.jsx";
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
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
