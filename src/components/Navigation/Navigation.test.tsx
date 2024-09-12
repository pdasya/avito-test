import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, vi, Mock } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import NavigationBar from "./Navigation";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

describe("NavigationBar component", () => {
  const renderComponent = (isMobile: boolean) => {
    (useMediaQuery as Mock).mockReturnValue(isMobile);

    const theme = createTheme();
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavigationBar />
        </BrowserRouter>
      </ThemeProvider>,
    );
  };

  test("renders desktop navigation links correctly", () => {
    renderComponent(false);

    expect(screen.getByText("Объявления")).toBeInTheDocument();
    expect(screen.getByText("Заказы")).toBeInTheDocument();
  });

  test("renders mobile menu icon correctly", () => {
    renderComponent(true);

    expect(screen.getByLabelText("menu")).toBeInTheDocument();
  });
});
