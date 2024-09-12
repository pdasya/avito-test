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
});

export default theme;
