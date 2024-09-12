import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";

const NavigationBar: React.FC = () => {
  return (
    <AppBar position="static" className={styles.navigationWrapper}>
      <Toolbar>
        <Typography variant="h6" className={styles.navigationHeader}>
          Панель навигации
        </Typography>
        <Button color="inherit" component={Link} to="/advertisements">
          Объявления
        </Button>
        <Button color="inherit" component={Link} to="/orders">
          Заказы
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
