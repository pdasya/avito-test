import axios from "axios";
import { Advertisment, Order } from "../types/types";
import { toast } from "react-toastify";

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  async fetchAd(id: string): Promise<Advertisment | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/advertisements/${id}`);
      const adData: Advertisment = response.data;

      if (!adData.imageUrl || adData.imageUrl.trim() === "") {
        adData.imageUrl = "/no-image.svg";
      }

      return adData;
    } catch (error) {
      toast.error(`Ошибка при загрузке объявления:${error}`);
      return null;
    }
  }

  async fetchAds(): Promise<Advertisment[]> {
    try {
      const response = await fetch(`${this.baseUrl}/advertisements`);
      if (!response.ok) {
        throw new Error("Failed to fetch advertisements");
      }

      const data = await response.json();

      const updatedData = data.map((ad: { imageUrl: string }) => ({
        ...ad,
        imageUrl:
          ad.imageUrl && ad.imageUrl.trim() !== ""
            ? ad.imageUrl
            : "/no-image.svg",
      }));

      return updatedData;
    } catch (error) {
      toast.error(`Ошибка при загрузке объявления:${error}`);
      return [];
    }
  }

  async fetchOrders(sortField?: string): Promise<Order[]> {
    try {
      const queryParam = sortField ? `?_sort=${sortField}` : "";
      const response = await fetch(`${this.baseUrl}/orders${queryParam}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      toast.error(`Ошибка при загрузке объявления:${error}`);
      return [];
    }
  }
}

const apiService = new ApiService();

export default apiService;
