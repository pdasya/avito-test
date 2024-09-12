import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AdDetail from "./AdDetail";
import apiService from "@api/apiService";
import axios from "axios";
import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import { toast } from "react-toastify";

vi.mock("@api/apiService");
vi.mock("axios");
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

const mockAdData = {
  id: "1",
  imageUrl: "https://example.com/image.jpg",
  name: "Test Ad",
  description: "Test Description",
  price: 100,
  views: 10,
  likes: 5,
};

describe("AdDetail component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders ad details after data is loaded", async () => {
    (apiService.fetchAd as Mock).mockResolvedValueOnce(mockAdData);

    render(
      <MemoryRouter initialEntries={["/advertisements/1"]}>
        <Routes>
          <Route path="/advertisements/:id" element={<AdDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Test Ad")).toBeInTheDocument();
      expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
      expect(screen.getByText(/100 ₽/i)).toBeInTheDocument();
    });
  });

  test("allows user to edit and save ad details", async () => {
    (apiService.fetchAd as Mock).mockResolvedValueOnce(mockAdData);
    (axios.put as Mock).mockResolvedValueOnce({ data: mockAdData });

    render(
      <MemoryRouter initialEntries={["/advertisements/1"]}>
        <Routes>
          <Route path="/advertisements/:id" element={<AdDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => screen.getByText("Test Ad"));

    fireEvent.click(screen.getByText(/редактировать/i));

    fireEvent.change(screen.getByLabelText(/название/i), {
      target: { value: "Updated Ad" },
    });

    fireEvent.change(screen.getByLabelText(/стоимость/i), {
      target: { value: "200" },
    });

    fireEvent.click(screen.getByText(/сохранить/i));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        "http://localhost:3000/advertisements/1",
        expect.objectContaining({
          name: "Updated Ad",
          price: 200,
        }),
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Данные о товаре успешно обновлены",
      );
    });
  });

  test("displays error message on failed save", async () => {
    (apiService.fetchAd as Mock).mockResolvedValueOnce(mockAdData);
    (axios.put as Mock).mockRejectedValueOnce(new Error("Failed to update"));

    render(
      <MemoryRouter initialEntries={["/advertisements/1"]}>
        <Routes>
          <Route path="/advertisements/:id" element={<AdDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => screen.getByText("Test Ad"));

    fireEvent.click(screen.getByText(/редактировать/i));

    fireEvent.click(screen.getByText(/сохранить/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Ошибка обновления данных");
    });
  });
});
