import React, { useEffect, useState } from "react";
import { Order } from "../../../types";
import { fetchOrders } from "../../api/fetchOrders";
import OrderList from "../../components/OrderList/OrderList";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
        setLoading(false);
      } catch (err) {
        setError("Ошибка при загрузке заказов");
        setLoading(false);
        console.error(err);
      }
    };

    loadOrders();
  }, []);

  const handleCompleteOrder = (orderId: string) => {
    console.log(`Заказ ${orderId} завершен`);
  };
  if (loading) {
    return <div>Загрузка заказов...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (orders.length === 0) {
    return <div>Заказы отсутствуют</div>;
  }

  return (
    <div>
      <h1>Список заказов</h1>
      <OrderList onCompleteOrder={handleCompleteOrder} />
    </div>
  );
};

export default OrdersPage;
