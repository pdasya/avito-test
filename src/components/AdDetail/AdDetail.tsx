import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Advertisment } from "../../../types";
import { fetchAd } from "../../api/fetchAd";
import axios from "axios";
import { TextField, Button, Grid, Typography } from "@mui/material";

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
  const navigate = useNavigate();

  useEffect(() => {
    const loadAd = async () => {
      const adData = await fetchAd(id!);
      setAd(adData);
      setFormData({
        imageUrl: adData?.imageUrl || "",
        name: adData?.name || "",
        description: adData?.description || "",
        price: adData?.price.toString() || "",
      });
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
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка при сохранении изменений", error);
    }
  };

  const handleClose = () => {
    navigate("/advertisements");
  };

  if (!ad) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <Typography variant="h5">Редактировать объявление</Typography>
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
        <div>
          <Typography variant="h4">{ad.name}</Typography>
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
  );
};

export default AdDetail;
