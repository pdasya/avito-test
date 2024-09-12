import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import AdsPerPageSelector from "./AdPerPageSelector";

describe("AdsPerPageSelector component", () => {
  const mockOnAdsPerPageChange = vi.fn();

  const setup = (adsPerPage: number) => {
    render(
      <AdsPerPageSelector
        adsPerPage={adsPerPage}
        onAdsPerPageChange={mockOnAdsPerPageChange}
      />,
    );
  };

  test("renders AdsPerPageSelector correctly", () => {
    setup(5);

    expect(screen.getByLabelText("Объявлений на странице")).toBeInTheDocument();

    expect(screen.getByDisplayValue("5")).toBeInTheDocument();
  });

  test("calls onAdsPerPageChange when a new value is selected", () => {
    setup(5);

    fireEvent.mouseDown(screen.getByLabelText("Объявлений на странице"));

    expect(screen.getByText("10")).toBeInTheDocument();

    fireEvent.click(screen.getByText("10"));

    expect(mockOnAdsPerPageChange).toHaveBeenCalled();
  });

  test("renders all the available options correctly", () => {
    setup(5);

    fireEvent.mouseDown(screen.getByLabelText("Объявлений на странице"));

    const options = screen.getAllByRole("option");

    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent("3");
    expect(options[1]).toHaveTextContent("5");
    expect(options[2]).toHaveTextContent("10");
    expect(options[3]).toHaveTextContent("20");
  });
});
