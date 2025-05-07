import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    metflix: {
      red: string;
      black: {
        veryDark: string;
        darker: string;
        lighter: string;
      };
      white: {
        lighter: string;
        darker: string;
      };
    };
  }
}
