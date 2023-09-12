// my-theme.ts
import { DefaultTheme } from "styled-components";

const mainTheme: DefaultTheme = {
  fontFamily: "Roboto, sans-serif",
  colors: {
    light: "#FFF9E4",
    dark: "#34345A",
    primary: {
      100: "#EDEDF5",
      200: "#C9C9E0",
      300: "#A6A5CB",
      400: "#8281B7",
      500: "#5E5DA2",
      600: "#49487E",
      700: "#34345A",
      800: "#1F1F36",
      900: "#0A0A12",
    },
    secondary: {
      100: "#fef4d1",
      200: "#fcefc4",
      300: "#f9eab6",
      400: "#f6e5aa",
      500: "#f1df9f",
      600: "#ecd894",
      700: "#e6d28a",
      800: "#e0ca81",
      900: "#d0bb71",
    },
  },
  typography: {
    h6: {
      regular: {
        "font-family": "Roboto",
        "font-size": "0.8rem",
        "font-style": "normal",
        "font-weight": 400,
        "line-height": "150%",
      },
    },
  },
};

export { mainTheme };
