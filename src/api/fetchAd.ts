import axios from "axios";
import { Advertisment } from "../../types";

export const fetchAd = async (id: string): Promise<Advertisment | null> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/advertisements/${id}`,
    );
    const adData: Advertisment = response.data;

    if (!adData.imageUrl || adData.imageUrl.trim() === "") {
      adData.imageUrl = "/no-image.svg";
    }

    return adData;
  } catch (error) {
    console.error("Ошибка при загрузке объявления:", error);
    return null;
  }
};
