import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { useTheme } from "@mui/material/styles";

const NavigationBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={styles.navigationWrapper}>
      <Toolbar>
        <Typography variant="h6" className={styles.navigationHeader}>
          Панель навигации
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/advertisements"
              >
                Объявления
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/orders">
                Заказы
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/advertisements">
              Объявления
            </Button>
            <Button color="inherit" component={Link} to="/orders">
              Заказы
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
