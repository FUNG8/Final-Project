import { PaletteMode } from "@mui/material";
import { amber, blue, deepOrange, grey } from "@mui/material/colors";

const theme = {
  palette: {
    primary: amber,
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#1976d2", // a deeper blue
            light: "#63a4ff", // a lighter blue
            dark: "#004ba0", // a darker blue
          },
          secondary: {
            main: "#9c27b0", // a deep purple
            light: "#ba68c8", // a lighter purple
            dark: "#6a1b9a", // a darker purple
          },
          divider: "#e0e0e0", // a light grey
          background: {
            default: "#f5f5f5", // a very light grey
            paper: "#ffffff", // pure white
          },
          text: {
            primary: "#212121", // a dark grey
            secondary: "#757575", // a medium grey
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#64b5f6", // a lighter blue
            light: "#9be7ff", // a very light blue
            dark: "#1565c0", // a darker blue
          },
          secondary: {
            main: "#ce93d8", // a lighter purple
            light: "#f3e5f5", // a very light purple
            dark: "#7b1fa2", // a darker purple
          },
          divider: "#424242", // a dark grey
          background: {
            default: "#303030", // a dark grey
            paper: "#424242", // a darker grey
          },
          text: {
            primary: "#ffffff", // pure white
            secondary: "#bdbdbd", // a medium grey
          },
        }),
  },
});

export default theme;