import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavigationBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
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
