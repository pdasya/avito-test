import React, { useState, useEffect } from "react";
import { Order } from "../../../types";
import { Grid, Button } from "@mui/material";
import OrderCard from "../Order/Order";
import { fetchOrders } from "../../api/fetchOrders";

interface OrderListProps {
  onCompleteOrder: (orderId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ onCompleteOrder }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadOrders = async (sortByPrice: boolean = false) => {
    setLoading(true);
    try {
      const fetchedOrders = await fetchOrders(
        sortByPrice ? "total" : undefined,
      );
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Ошибка при загрузке заказов", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSortByPrice = () => {
    loadOrders(true);
  };

  if (loading) {
    return <div>Загрузка заказов...</div>;
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleSortByPrice}>
        Сортировать по цене
      </Button>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {orders.map((order) => (
          <Grid item key={order.id} xs={12} md={6}>
            <OrderCard
              order={order}
              onCompleteOrder={() => onCompleteOrder(order.id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderList;
