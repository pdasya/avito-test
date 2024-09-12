import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, Mock } from "vitest";
import axios from "axios";
import { toast } from "react-toastify";
import getNextAdId from "@utils/getNextAdId";
import CreateAdModal from "./NewAdModal";

vi.mock("axios");
vi.mock("@utils/getNextAdId", () => ({
  default: vi.fn(),
}));
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("CreateAdModal component", () => {
  const mockOnClose = vi.fn();
  const mockOnCreate = vi.fn();

  const setup = (open = true) => {
    render(
      <CreateAdModal
        open={open}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />,
    );
  };

  test("renders correctly when open", () => {
    setup();

    expect(screen.getByText("Создать новое объявление")).toBeInTheDocument();
    expect(screen.getByLabelText(/Название/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Стоимость/i)).toBeInTheDocument();
  });

  test("closes when 'Отмена' is clicked", () => {
    setup();

    fireEvent.click(screen.getByText("Отмена"));

    expect(mockOnClose).toHaveBeenCalled();
  });

  test("creates a new ad and closes the modal", async () => {
    (getNextAdId as Mock).mockResolvedValueOnce(123);
    (axios.post as Mock).mockResolvedValueOnce({
      data: {
        id: 123,
        name: "Test Ad",
        description: "Test Description",
        price: 100,
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        imageUrl: "/test-image.jpg",
      },
    });

    setup();

    fireEvent.change(screen.getByLabelText(/Название/i), {
      target: { value: "Test Ad" },
    });
    fireEvent.change(screen.getByLabelText(/Описание/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/Стоимость/i), {
      target: { value: 100 },
    });

    fireEvent.click(screen.getByText("Создать"));

    await waitFor(() => {
      expect(getNextAdId).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/advertisements",
        expect.objectContaining({
          name: "Test Ad",
          description: "Test Description",
          price: 100,
        }),
      );
      expect(mockOnCreate).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        "Новое объявление успешно создано!",
      );
    });
  });

  test("handles errors when creating an ad", async () => {
    (getNextAdId as Mock).mockResolvedValueOnce(123);

    (axios.post as Mock).mockRejectedValueOnce(new Error("Failed to create"));

    setup();

    fireEvent.change(screen.getByLabelText(/Название/i), {
      target: { value: "Test Ad" },
    });
    fireEvent.change(screen.getByLabelText(/Описание/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/Стоимость/i), {
      target: { value: 100 },
    });

    fireEvent.click(screen.getByText("Создать"));

    await waitFor(() => {
      expect(getNextAdId).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalled();

      expect(toast.error).toHaveBeenCalledWith(
        "Ошибка создания объявления Error: Failed to create",
      );
    });
  });
});
