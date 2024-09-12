import axios from "axios";

const getNextAdId = async (): Promise<string> => {
  try {
    const response = await axios.get("http://localhost:3000/advertisements");
    const ads = response.data;
    const maxId = ads.length;
    return String(maxId + 1);
  } catch (error) {
    console.error("Ошибка при получении объявлений", error);
    return String(1);
  }
};

export default getNextAdId;
