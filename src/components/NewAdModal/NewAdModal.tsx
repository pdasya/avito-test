import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import getNextAdId from "@utils/getNextAdId";
import { Advertisment } from "@/types/types";

interface CreateAdModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (ad: Advertisment) => void;
}

const CreateAdModal: React.FC<CreateAdModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const placeholderImageUrl = "/no-image.svg";

  const handleCreate = async () => {
    const newId = await getNextAdId();

    const newAd = {
      id: newId,
      name,
      description,
      price: Number(price),
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      imageUrl: imageUrl || placeholderImageUrl,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/advertisements",
        newAd,
      );
      const createdAd = response.data;
      onCreate(createdAd);
      onClose();
      toast.success("Новое объявление успешно создано!");
    } catch (error) {
      console.error("Error creating adverticement", error);
      toast.error("Ошибка создания объявления!");
    }

    setImageUrl("");
    setName("");
    setDescription("");
    setPrice("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Создать новое объявление</DialogTitle>
      <DialogContent>
        <TextField
          label="URL картинки"
          variant="outlined"
          fullWidth
          margin="normal"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <TextField
          label="Название"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Описание"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Стоимость"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Отмена
        </Button>
        <Button onClick={handleCreate} color="primary">
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAdModal;
