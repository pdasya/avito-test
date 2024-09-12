import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Advertisment } from "../../../types";
import { fetchAd } from "../../api/fetchAd";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import styles from "./AdDetails.module.scss";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const AdDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<Advertisment | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    description: "",
    price: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAd = async () => {
      setIsLoading(true);
      const adData = await fetchAd(id!);
      setAd(adData);
      setFormData({
        imageUrl: adData?.imageUrl || "",
        name: adData?.name || "",
        description: adData?.description || "",
        price: adData?.price.toString() || "",
      });
      setIsLoading(false);
    };

    loadAd();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const updatedAd: Advertisment = {
        ...ad!,
        ...formData,
        price: Number(formData.price),
        id: ad!.id,
      };

      await axios.put(`http://localhost:3000/advertisements/${id}`, updatedAd);
      setAd(updatedAd);
      toast.success("Данные о товаре успешно обновлены");
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка при сохранении изменений", error);
      toast.error("Ошибка обновления данных");
    }
  };

  const handleClose = () => {
    navigate("/advertisements");
  };

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <CircularProgress />
        <p>Загрузка объявления...</p>
      </div>
    );
  }

  if (!ad) {
    return <div>Объявление не найдено</div>;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {isEditing ? (
            <div className={styles.detailsEditWrapper}>
              <Typography
                variant="h5"
                className={styles.detailsEditWrapperHeader}
              >
                Редактировать объявление
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="URL картинки"
                    name="imageUrl"
                    fullWidth
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Название"
                    name="name"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Описание"
                    name="description"
                    fullWidth
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Стоимость"
                    name="price"
                    type="number"
                    fullWidth
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                style={{ marginTop: "20px" }}
              >
                Сохранить
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsEditing(false)}
                style={{ marginTop: "20px", marginLeft: "10px" }}
              >
                Отмена
              </Button>
            </div>
          ) : (
            <div className={styles.detailsWrapper}>
              <Typography variant="h4" className={styles.detailsWrapperHeader}>
                {ad.name}
              </Typography>
              <img
                src={ad.imageUrl}
                alt={ad.name}
                style={{ width: "300px", height: "auto" }}
              />
              <p>Описание: {ad.description}</p>
              <p>Стоимость: {ad.price} ₽</p>
              <p>Просмотры: {ad.views}</p>
              <p>Лайки: {ad.likes}</p>

              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
              >
                Редактировать
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
                style={{ marginTop: "20px", marginLeft: "10px" }}
              >
                Закрыть
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AdDetail;
