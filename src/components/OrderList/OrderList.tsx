import React, { useState, useEffect } from "react";
import { Order } from "../../../types";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import OrderCard from "../Order/Order";
import { fetchOrders } from "../../api/fetchOrders";

interface OrderListProps {
  onCompleteOrder: (orderId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ onCompleteOrder }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<number | "">("");

  const loadOrders = async (sortByPrice: boolean = false) => {
    setLoading(true);
    try {
      const fetchedOrders = await fetchOrders(
        sortByPrice ? "total" : undefined,
      );
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);
    } catch (error) {
      console.error("Ошибка при загрузке заказов", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilterChange = (event: SelectChangeEvent<number | "">) => {
    const status = event.target.value as number | "";
    setStatusFilter(status);

    if (status === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return <div>Загрузка заказов...</div>;
  }

  const handleSortByPrice = () => {
    loadOrders(true);
  };

  return (
    <div>
      <FormControl
        variant="outlined"
        style={{ minWidth: 200, marginBottom: "20px" }}
      >
        <InputLabel id="status-filter-label">Фильтр по статусу</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          value={statusFilter}
          onChange={handleStatusFilterChange} // Используем SelectChangeEvent
          label="Фильтр по статусу"
        >
          <MenuItem value="">
            <em>Все</em>
          </MenuItem>
          <MenuItem value={0}>Создан</MenuItem>
          <MenuItem value={1}>Оплачен</MenuItem>
          <MenuItem value={2}>В пути</MenuItem>
          <MenuItem value={3}>Доставлен в пункт</MenuItem>
          <MenuItem value={4}>Получен</MenuItem>
          <MenuItem value={5}>Архивирован</MenuItem>
          <MenuItem value={6}>Возврат</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSortByPrice}>
        Сортировать по цене
      </Button>

      <Grid container spacing={2}>
        {filteredOrders.map((order) => (
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
