import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { describe, expect, test } from "vitest";

describe("NotFoundPage component", () => {
  test("renders 404 message correctly", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );

    const errorText = screen.getByText("4", { exact: false });
    expect(errorText).toBeInTheDocument();
    expect(screen.getByAltText(/page not found/i)).toBeInTheDocument();
  });

  test("renders the 'Страница не найдена' message", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );

    expect(screen.getByText("Страница не найдена")).toBeInTheDocument();
  });

  test("renders the correct description message", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );

    expect(
      screen.getByText(/Извините, но запрашиваемая страница не существует./i),
    ).toBeInTheDocument();
  });

  test("renders the link to go back home", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: /Вернуться на главную/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
