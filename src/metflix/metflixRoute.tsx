import { RouteObject } from "react-router-dom";
import MetflixApp from "./MetflixApp";
import MetflixHome from "./pages/MetflixHome";
import MetflixTv from "./pages/MetflixTv";
import MetflixSearch from "./pages/MetflixSearch";

export const metflixRoute: RouteObject[] = [
  {
    path: "/metflix",
    element: <MetflixApp />,
    children: [
      {
        path: "",
        element: <MetflixHome />,
      },
      {
        path: "movies/:movieId",
        element: <MetflixHome />,
      },
      {
        path: "tv",
        element: <MetflixTv />,
      },
      {
        path: "search",
        element: <MetflixSearch />,
      },
    ],
  },
];
