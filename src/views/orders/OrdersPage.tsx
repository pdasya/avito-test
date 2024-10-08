import React, { useState, useEffect } from "react";
import { Button, SelectChangeEvent } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import styles from "./OrdersPage.module.scss";
import { toast } from "react-toastify";
import { Order } from "@/types/types";
import apiService from "@api/apiService";
import Loader from "@components/Loader/Loader";
import FilterControl from "@components/FilterControl/FilterControl";
import OrderList from "@components/OrderList/OrderList";
import Pagination from "@components/Pagination/Pagination";
import AdsPerPageSelector from "@components/AdPerPageSelector/AdPerPageSelector";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<number | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(10);
  const [searchParams] = useSearchParams();

  const advertId = searchParams.get("advertId");
  const advertName = searchParams.get("name");

  const loadOrders = async (sortByPrice: boolean = false) => {
    setIsLoading(true);
    try {
      const fetchedOrders = await apiService.fetchOrders(
        sortByPrice ? "total" : undefined,
      );
      setOrders(fetchedOrders);

      const filtered = advertId
        ? fetchedOrders.filter((order: Order) =>
            order.items.some((item) => item.id === advertId),
          )
        : fetchedOrders;

      setFilteredOrders(filtered);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(`Ошибка загрузки ${err}`);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [advertId]);

  const handleStatusFilterChange = (event: SelectChangeEvent<number | "">) => {
    const status = event.target.value as number | "";
    setStatusFilter(status);

    if (status === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
    setCurrentPage(1);
  };

  const handleCompleteOrder = () => {
    toast.success("Заказ успешно завершен (тест)");
  };

  const handleSortByPrice = () => {
    loadOrders(true);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOrdersPerPageChange = (event: SelectChangeEvent<number>) => {
    setOrdersPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const isItemFound = filteredOrders.length > 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.orderPageWrapper}>
          <h1>Список заказов</h1>

          <FilterControl
            label="Фильтр по статусу"
            value={statusFilter}
            options={[
              { value: 0, label: "Создан" },
              { value: 1, label: "Оплачен" },
              { value: 2, label: "В пути" },
              { value: 3, label: "Доставлен в пункт" },
              { value: 4, label: "Получен" },
              { value: 5, label: "Архивирован" },
              { value: 6, label: "Возврат" },
            ]}
            onChange={handleStatusFilterChange}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSortByPrice}
            className={styles.sortButton}
          >
            Сортировать по цене
          </Button>

          {advertName && (
            <p>
              {isItemFound
                ? `Предмет "${advertName}" был найден в этих заказах`
                : `Этот предмет "${advertName}" не был найден ни в одном заказе`}
            </p>
          )}

          {filteredOrders.length === 0 ? (
            <p>По вашему запросу ничего не найдено</p>
          ) : (
            <>
              <OrderList
                orders={orders}
                filteredOrders={currentOrders}
                onCompleteOrder={handleCompleteOrder}
              />

              <div style={{ marginTop: "20px" }}>
                {totalPages > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
                <AdsPerPageSelector
                  adsPerPage={ordersPerPage}
                  onAdsPerPageChange={handleOrdersPerPageChange}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default OrdersPage;
