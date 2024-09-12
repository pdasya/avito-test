import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import OrderList from "./OrderList";
import { OrderListProps } from "@/types/interfaces";
import { BrowserRouter } from "react-router-dom";
import { Order } from "@/types/types";

vi.mock("../OrderItem/OrderItem", () => ({
  __esModule: true,
  default: ({
    order,
    onCompleteOrder,
  }: {
    order: Order;
    onCompleteOrder: () => void;
  }) => (
    <div>
      <h2>{`Номер заказа: ${order.id}`}</h2>
      <button onClick={onCompleteOrder}>Завершить заказ</button>
    </div>
  ),
}));

describe("OrderList component", () => {
  const mockOnCompleteOrder = vi.fn();

  const mockOrders = [
    {
      id: "1",
      createdAt: new Date().toISOString(),
      items: [
        {
          id: "item1",
          name: "Товар 1",
          count: 1,
          price: 100,
          createdAt: new Date().toISOString(),
          views: 10,
          likes: 5,
        },
        {
          id: "item2",
          name: "Товар 2",
          count: 2,
          price: 200,
          createdAt: new Date().toISOString(),
          views: 20,
          likes: 10,
        },
      ],
      total: 500,
      deliveryWay: "Курьер",
      status: 0,
    },
    {
      id: "2",
      createdAt: new Date().toISOString(),
      items: [
        {
          id: "item3",
          name: "Товар 3",
          count: 1,
          price: 300,
          createdAt: new Date().toISOString(),
          views: 15,
          likes: 8,
        },
        {
          id: "item4",
          name: "Товар 4",
          count: 1,
          price: 400,
          createdAt: new Date().toISOString(),
          views: 25,
          likes: 12,
        },
      ],
      total: 700,
      deliveryWay: "Самовывоз",
      status: 1,
    },
  ];

  const setup = (props: Partial<OrderListProps> = {}) => {
    const defaultProps: OrderListProps = {
      orders: mockOrders,
      filteredOrders: mockOrders,
      onCompleteOrder: mockOnCompleteOrder,
      ...props,
    };

    render(
      <BrowserRouter>
        <OrderList {...defaultProps} />
      </BrowserRouter>,
    );
  };

  test("renders list of orders correctly", () => {
    setup();

    expect(screen.getByText(/Номер заказа: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Номер заказа: 2/i)).toBeInTheDocument();
  });

  test("calls onCompleteOrder when 'Завершить заказ' is clicked", () => {
    setup();

    fireEvent.click(screen.getAllByText(/Завершить заказ/i)[0]);

    expect(mockOnCompleteOrder).toHaveBeenCalledWith("1");

    fireEvent.click(screen.getAllByText(/Завершить заказ/i)[1]);

    expect(mockOnCompleteOrder).toHaveBeenCalledWith("2");
  });

  test("renders empty state when there are no orders", () => {
    setup({ filteredOrders: [] });

    expect(screen.queryByText(/Номер заказа:/i)).not.toBeInTheDocument();
  });
});
