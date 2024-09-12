import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "RubicMonoOne, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "RubicMonoOne, sans-serif",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "RubicMonoOne, sans-serif",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#ff4500",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e0d5c2",
    },
    background: {
      default: "#f5f5f0",
    },
    text: {
      primary: "#4b3832",
      secondary: "#2b1d0e",
    },
  },
});

export default theme;
