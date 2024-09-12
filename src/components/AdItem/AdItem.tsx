import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { Favorite, Visibility } from "@mui/icons-material";
import styles from "./AdItem.module.css";
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdItem;
