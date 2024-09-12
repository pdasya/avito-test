import { FC } from "react";
import styles from "./pagination.module.scss";
import { PaginationProps } from "@/types/interfaces";

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pages.push(i);
  }

  return (
    <div className={styles.paginationWrapper}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          className={`${styles.paginationButton} ${page === currentPage ? styles.active : ""}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
