import { lazy } from "react";

const SingleClass = lazy(() => import("./SingleClass"));

export const singleClassRoute = {
  element: <SingleClass />,
};
