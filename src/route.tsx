import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import { coinRoute } from "./coin/coinRoute";
import { metflixRoute } from "./metflix/metflixRoute";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  ...coinRoute,
  ...metflixRoute,
]);
