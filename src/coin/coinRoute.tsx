import { RouteObject } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";
import Chart from "./Chart";
import Price from "./Price";
import CoinApp from "./CoinApp";

export const coinRoute: RouteObject[] = [
  {
    path: "/coin",
    element: <CoinApp />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
    ],
  },
];
