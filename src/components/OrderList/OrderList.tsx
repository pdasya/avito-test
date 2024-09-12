import React from "react";
import { Order } from "../../../types";
import { Grid } from "@mui/material";
import OrderCard from "../Order/Order";

interface OrderListProps {
  orders: Order[];
  onCompleteOrder: (orderId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onCompleteOrder }) => {
  return (
    <Grid container spacing={2}>
      {orders.map((order) => (
        <Grid item key={order.id} xs={12} md={6}>
          <OrderCard
            order={order}
            onCompleteOrder={() => onCompleteOrder(order.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderList;
