import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import AdItem from "./AdItem";
import { Advertisment } from "@/types/types";
import "@testing-library/jest-dom";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AdItem component", () => {
  const ad: Advertisment = {
    id: "1",
    imageUrl: "test-image-url.jpg",
    name: "Test Advertisement",
    price: 5000,
    views: 100,
    likes: 10,
    createdAt: "",
  };

  it("renders correctly with the provided props", () => {
    render(
      <MemoryRouter>
        <AdItem {...ad} />
      </MemoryRouter>,
    );

    expect(screen.getByText(ad.name)).toBeInTheDocument();
    expect(screen.getByText(`Стоимость: ${ad.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`${ad.views} просмотров`)).toBeInTheDocument();
    expect(screen.getByText(`${ad.likes} лайков`)).toBeInTheDocument();
    expect(screen.getByAltText(ad.name)).toHaveAttribute("src", ad.imageUrl);
  });

  it("navigates to the advertisement details page when clicked", () => {
    render(
      <MemoryRouter>
        <AdItem {...ad} />
      </MemoryRouter>,
    );

    const cardElement = screen.getByAltText(ad.name);
    fireEvent.click(cardElement);

    expect(mockNavigate).toHaveBeenCalledWith(`/advertisements/${ad.id}`);
  });

  it("toggles favorite icon color when clicked", () => {
    render(
      <MemoryRouter>
        <AdItem {...ad} />
      </MemoryRouter>,
    );

    const favoriteIconButton = screen.getByLabelText("likes");

    expect(screen.getByTestId("FavoriteIcon")).toHaveStyle(
      "color: rgb(128, 128, 128)",
    );
    fireEvent.click(favoriteIconButton);
    expect(screen.getByTestId("FavoriteIcon")).toHaveStyle(
      "color: rgb(255, 0, 0)",
    );
    fireEvent.click(favoriteIconButton);
    expect(screen.getByTestId("FavoriteIcon")).toHaveStyle(
      "color: rgb(128, 128, 128)",
    );
  });

  it("navigates to the orders page when 'Заказы' button is clicked", () => {
    render(
      <MemoryRouter>
        <AdItem {...ad} />
      </MemoryRouter>,
    );

    const ordersButton = screen.getByText("Заказы");
    fireEvent.click(ordersButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      `/orders?advertId=${ad.id}&name=${ad.name}`,
    );
  });
});
