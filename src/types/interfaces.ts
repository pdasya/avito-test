import { SelectChangeEvent } from "@mui/material";
import { Advertisment, Order } from "./types";

export interface AdListProps {
  ads: Advertisment[];
}

export interface AdsPerPageSelectorProps {
  adsPerPage: number;
  onAdsPerPageChange: (event: SelectChangeEvent<number>) => void;
}

export interface FilterControlProps {
  label: string;
  value: number | "";
  options: Array<{ value: number; label: string }>;
  onChange: (event: SelectChangeEvent<number | "">) => void;
}

export interface CreateAdModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (ad: Advertisment) => void;
}

export interface OrderItemProps {
  order: Order;
  onCompleteOrder: () => void;
}

export interface OrderListProps {
  orders: Order[];
  filteredOrders: Order[];
  onCompleteOrder: (orderId: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
