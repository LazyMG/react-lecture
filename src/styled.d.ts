import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
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
    coin: {
      textColor: string;
      bgColor: string;
      accentColor: string;
      overviewColor: string;
      descriptionColor: string;
      shadowColor: string;
    };
  }
}
