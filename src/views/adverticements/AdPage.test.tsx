import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, Mock, beforeEach } from "vitest";
import AdPage from "./AdPage";
import apiService from "@api/apiService";
import { Advertisment } from "@/types/types";

// Моки компонентов с использованием правильной типизации
vi.mock("@api/apiService");
vi.mock("@components/Loader/Loader", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));
vi.mock("@components/NewAdModal/NewAdModal", () => ({
  __esModule: true,
  default: ({
    open,
    onClose,
    onCreate,
  }: {
    open: boolean;
    onClose: () => void;
    onCreate: (ad: Advertisment) => void;
  }) =>
    open && (
      <div>
        <h2>Создать новое объявление</h2>
        <button
          onClick={() =>
            onCreate({
              id: "3",
              name: "Новое объявление",
              price: 3000,
              views: 150,
              likes: 50,
              createdAt: "",
            })
          }
        >
          Создать
        </button>
        <button onClick={onClose}>Закрыть</button>
      </div>
    ),
}));
vi.mock("@components/SearchBar/SearchBar", () => ({
  __esModule: true,
  default: ({
    searchQuery,
    onSearchChange,
  }: {
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <input
      value={searchQuery}
      placeholder="Поиск..."
      onChange={onSearchChange}
    />
  ),
}));
vi.mock("@components/AdList/AdList", () => ({
  __esModule: true,
  default: ({ ads }: { ads: Advertisment[] }) => (
    <div>
      {ads.map((ad) => (
        <div key={ad.id}>{ad.name}</div>
      ))}
    </div>
  ),
}));
vi.mock("@components/FilterControl/FilterControl", () => ({
  __esModule: true,
  default: ({
    value,
    options,
    onChange,
  }: {
    value: number | "";
    options: { value: number; label: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }) => (
    <select value={value} onChange={onChange}>
      <option value="">Все</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
}));
vi.mock("@components/Pagination/Pagination", () => ({
  __esModule: true,
  default: ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => (
    <div>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>
      <span>
        {currentPage} из {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперед
      </button>
    </div>
  ),
}));
vi.mock("@components/AdPerPageSelector/AdPerPageSelector", () => ({
  __esModule: true,
  default: ({
    adsPerPage,
    onAdsPerPageChange,
  }: {
    adsPerPage: number;
    onAdsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }) => (
    <select value={adsPerPage} onChange={onAdsPerPageChange}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  ),
}));

describe("AdPage component", () => {
  const mockAds: Advertisment[] = [
    {
      id: "1",
      name: "Объявление 1",
      price: 1000,
      views: 50,
      likes: 5,
      createdAt: "",
    },
    {
      id: "2",
      name: "Объявление 2",
      price: 5000,
      views: 200,
      likes: 20,
      createdAt: "",
    },
  ];

  beforeEach(() => {
    (apiService.fetchAds as Mock).mockResolvedValue(mockAds);
  });

  test("renders loading state initially", () => {
    render(<AdPage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("loads and displays ads after loading", async () => {
    render(<AdPage />);

    await waitFor(() => {
      expect(screen.getByText(/Объявление 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Объявление 2/i)).toBeInTheDocument();
    });
  });

  test("filters ads by search query", async () => {
    render(<AdPage />);

    await waitFor(() => {
      expect(screen.getByText(/Объявление 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Объявление 2/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/Поиск.../i), {
      target: { value: "1" },
    });

    await waitFor(() => {
      expect(screen.getByText(/Объявление 1/i)).toBeInTheDocument();
      expect(screen.queryByText(/Объявление 2/i)).not.toBeInTheDocument();
    });
  });

  test("handles pagination", async () => {
    render(<AdPage />);

    await waitFor(() => {
      expect(screen.getByText(/Объявление 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Объявление 2/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Вперед/i));

    await waitFor(() => {
      expect(screen.getByText(/Вперед/i)).toBeDisabled();
    });
  });
});
