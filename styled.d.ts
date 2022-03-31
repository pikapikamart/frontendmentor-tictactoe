import "styled-components";


declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      lightBlue: string,
      lightBlueHover: string,
      lightYellow: string,
      lightYellowHover: string,
      darkNavy: string,
      semiDarkNavy: string,
      silver: string,
      silverHover: string,
      green: string,
      greenHover: string,
      blue: string,
      red: string
      
    },
    fontSizes: {
      hLarge: number,
      hMedium: number,
      hSmall: number,
      hExtraSmall: number,
      body: number
    },
    breakpoints: {
      tablet: number,
      desktop: number
    }
  }
}