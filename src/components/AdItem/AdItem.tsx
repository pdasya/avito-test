import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Favorite, Visibility } from "@mui/icons-material";
import styles from "./AdItem.module.scss";
import { Advertisment } from "../../../types";
import { useNavigate } from "react-router-dom";

const AdItem: React.FC<Advertisment> = ({
  imageUrl,
  name,
  price,
  views,
  likes,
  id,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/advertisements/${id}`);
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  const handleOrdersClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/orders?advertId=${id}&name=${name}`);
  };

  return (
    <Card className={styles.cardWrapper} onClick={handleClick}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={name}
        className={styles.cardImage}
      />
      <CardContent className={styles.cardContent}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Стоимость: {price} ₽
        </Typography>
        <div>
          <div className={styles.iconContainer}>
            <IconButton aria-label="views">
              <Visibility />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {views} просмотров
            </Typography>
          </div>
          <div className={styles.iconContainer}>
            <IconButton aria-label="likes" onClick={handleFavoriteClick}>
              <Favorite sx={{ color: isFavorited ? "red" : "gray" }} />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {likes} лайков
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOrdersClick}
              style={{ marginTop: "10px" }}
            >
              Заказы
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdItem;
