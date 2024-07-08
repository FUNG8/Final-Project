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
            primary: blue,
            divider: blue[200],
            background: {
              default: '#fff',
              paper: '#fff',
            },
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: grey,
            divider: grey[700],
            background: {
              default: grey[900],
              paper: grey[900],
            },
            text: {
              primary: '#fffff',
              secondary: grey[500],
            },
          }),
    },
  });

export default theme;