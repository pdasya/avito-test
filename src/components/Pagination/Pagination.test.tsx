import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Pagination from "./Pagination";
import { PaginationProps } from "@/types/interfaces";

describe("Pagination component", () => {
  const mockOnPageChange = vi.fn();

  const setup = (props: Partial<PaginationProps> = {}) => {
    const defaultProps: PaginationProps = {
      currentPage: 1,
      totalPages: 5,
      onPageChange: mockOnPageChange,
      ...props,
    };

    return render(<Pagination {...defaultProps} />);
  };

  test("renders the correct number of pages", () => {
    setup({ totalPages: 5 });
    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons).toHaveLength(5);

    pageButtons.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());
    });
  });

  test("calls onPageChange when a page is clicked", () => {
    setup();

    const secondPageButton = screen.getByText("2");
    fireEvent.click(secondPageButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("disables the current page button", () => {
    setup({ currentPage: 3 });
    const thirdPageButton = screen.getByText("3");
    expect(thirdPageButton).toBeDisabled();
  });

  test("enables all non-current page buttons", () => {
    setup({ currentPage: 3 });

    const pageButtons = screen.getAllByRole("button");
    pageButtons.forEach((button) => {
      if (button.textContent === "3") {
        expect(button).toBeDisabled();
      } else {
        expect(button).toBeEnabled();
      }
    });
  });
});
