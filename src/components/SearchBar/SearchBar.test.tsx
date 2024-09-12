import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import SearchBar from "./SearchBar";
import { SearchBarProps } from "@/types/interfaces";

describe("SearchBar component", () => {
  const mockOnSearchChange = vi.fn();

  const setup = (props: Partial<SearchBarProps> = {}) => {
    const defaultProps: SearchBarProps = {
      searchQuery: "",
      onSearchChange: mockOnSearchChange,
      ...props,
    };

    return render(<SearchBar {...defaultProps} />);
  };

  test("renders the search input with the correct label", () => {
    setup();

    expect(screen.getByLabelText("Поиск по названию")).toBeInTheDocument();
  });

  test("renders the search input with the correct value", () => {
    setup({ searchQuery: "Тест" });

    expect(screen.getByDisplayValue("Тест")).toBeInTheDocument();
  });

  test("calls onSearchChange when typing in the input", () => {
    setup();

    fireEvent.change(screen.getByLabelText("Поиск по названию"), {
      target: { value: "Новый текст" },
    });

    expect(mockOnSearchChange).toHaveBeenCalled();
  });
});
