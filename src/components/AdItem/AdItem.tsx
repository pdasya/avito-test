import React from "react";
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

const AdItem: React.FC<Advertisment> = ({
  imageUrl,
  name,
  price,
  views,
  likes,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Стоимость: {price} ₽
        </Typography>
        <div className={styles.cardContent}>
          <div className={styles.iconContainer}>
            <IconButton aria-label="views">
              <Visibility />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {views} просмотров
            </Typography>
          </div>
          <div className={styles.iconContainer}>
            <IconButton aria-label="likes">
              <Favorite />
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
