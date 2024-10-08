import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import OrderItem from "./OrderItem";
import { OrderItemProps } from "@/types/interfaces";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("OrderItem component", () => {
  const mockOnCompleteOrder = vi.fn();

  const mockOrder = {
    id: "123",
    createdAt: new Date().toISOString(),
    items: [
      {
        id: "item1",
        name: "Товар 1",
        count: 2,
        price: 500,
        createdAt: new Date().toISOString(),
        views: 10,
        likes: 5,
      },
      {
        id: "item2",
        name: "Товар 2",
        count: 1,
        price: 300,
        createdAt: new Date().toISOString(),
        views: 15,
        likes: 8,
      },
    ],
    total: 1300,
    deliveryWay: "Курьер",
    status: 0,
  };

  const setup = (props: Partial<OrderItemProps> = {}) => {
    const defaultProps: OrderItemProps = {
      order: mockOrder,
      onCompleteOrder: mockOnCompleteOrder,
      ...props,
    };

    render(
      <BrowserRouter>
        <OrderItem {...defaultProps} />
      </BrowserRouter>,
    );
  };

  test("renders order details correctly", () => {
    setup();

    expect(screen.getByText(/Номер заказа: 123/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество товаров: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Стоимость заказа: 1300 ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Способ доставки: Курьер/i)).toBeInTheDocument();
    expect(screen.getByText(/Статус: Создан/i)).toBeInTheDocument();
  });

  test("calls onCompleteOrder when 'Завершить заказ' is clicked", () => {
    setup();

    fireEvent.click(screen.getByText(/Завершить заказ/i));

    expect(mockOnCompleteOrder).toHaveBeenCalled();
  });

  test("shows items in the order when 'Показать все товары' is clicked", () => {
    setup();

    fireEvent.click(screen.getByText(/Показать все товары/i));

    expect(screen.getByText(/Товары в заказе/i)).toBeInTheDocument();
    expect(screen.getByText(/Товар 1 - 2 шт. - 500 ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Товар 2 - 1 шт. - 300 ₽/i)).toBeInTheDocument();
  });

  test("navigates to item page when a product is clicked", () => {
    setup();

    fireEvent.click(screen.getByText(/Показать все товары/i));

    fireEvent.click(screen.getByText(/Товар 1 - 2 шт. - 500 ₽/i));

    expect(mockNavigate).toHaveBeenCalledWith("/advertisements/item1");
  });

  test("closes item dialog when 'Закрыть' is clicked", async () => {
    setup();

    fireEvent.click(screen.getByText(/Показать все товары/i));

    fireEvent.click(screen.getByText(/Закрыть/i));

    await waitFor(() => {
      expect(screen.queryByText(/Товары в заказе/i)).not.toBeInTheDocument();
    });
  });
});
