import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import FilterControl from "./FilterControl";
import { FilterControlProps } from "@/types/interfaces";

describe("FilterControl component", () => {
  const mockOnChange = vi.fn();

  const defaultProps: FilterControlProps = {
    label: "Фильтр",
    value: "",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
      { value: 3, label: "Option 3" },
    ],
    onChange: mockOnChange,
  };

  const setup = (props: FilterControlProps = defaultProps) => {
    render(<FilterControl {...props} />);
  };

  test("renders the correct number of options", () => {
    setup();

    fireEvent.mouseDown(screen.getByRole("combobox"));

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent("Все");
    expect(options[1]).toHaveTextContent("Option 1");
    expect(options[2]).toHaveTextContent("Option 2");
    expect(options[3]).toHaveTextContent("Option 3");
  });

  test("calls onChange when a new option is selected", () => {
    setup();

    fireEvent.mouseDown(screen.getByRole("combobox"));

    fireEvent.click(screen.getByText("Option 2"));

    expect(mockOnChange).toHaveBeenCalled();
  });

  test("displays the selected option correctly", () => {
    const propsWithSelectedValue: FilterControlProps = {
      ...defaultProps,
      value: 2,
    };

    setup(propsWithSelectedValue);
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
});
