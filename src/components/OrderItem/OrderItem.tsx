import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./OrderItem.module.scss";
import { OrderItemProps } from "@/types/interfaces";

const OrderItem: React.FC<OrderItemProps> = ({ order, onCompleteOrder }) => {
  const [showItems, setShowItems] = useState(false);
  const navigate = useNavigate();

  const handleShowItems = () => {
    setShowItems(true);
  };

  const handleCloseItems = () => {
    setShowItems(false);
  };

  const handleItemClick = (itemId: string) => {
    navigate(`/advertisements/${itemId}`);
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Создан";
      case 1:
        return "Оплачен";
      case 2:
        return "В пути";
      case 3:
        return "Доставлен в пункт";
      case 4:
        return "Получен";
      case 5:
        return "Архивирован";
      case 6:
        return "Возврат";
      default:
        return "Неизвестный статус";
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Номер заказа: {order.id}</Typography>
        <Typography>
          Дата создания: {new Date(order.createdAt).toLocaleDateString()}
        </Typography>
        <Typography>Количество товаров: {order.items.length}</Typography>
        <Typography>Стоимость заказа: {order.total} ₽</Typography>
        <Typography>Способ доставки: {order.deliveryWay}</Typography>
        <Typography>Статус: {getStatusText(order.status)}</Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={onCompleteOrder}
          style={{ marginTop: "10px" }}
        >
          Завершить заказ
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleShowItems}
          style={{ marginTop: "10px", marginLeft: "10px" }}
        >
          Показать все товары
        </Button>
      </CardContent>

      <Dialog open={showItems} onClose={handleCloseItems}>
        <DialogTitle>Товары в заказе</DialogTitle>
        <DialogContent>
          <List>
            {order.items.map((item) => (
              <ListItem
                key={item.id}
                component="button"
                onClick={() => handleItemClick(item.id)}
                className={styles.listItem}
              >
                <ListItemText
                  primary={`${item.name} - ${item.count} шт. - ${item.price} ₽`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseItems} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default OrderItem;
