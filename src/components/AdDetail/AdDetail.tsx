import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Advertisment } from "../../../types";
import { fetchAd } from "../../api/fetchAd";

const AdDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<Advertisment | null>(null);

  useEffect(() => {
    const loadAd = async () => {
      const adData = await fetchAd(id!);
      setAd(adData);
    };

    loadAd();
  }, [id]);

  if (!ad) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>{ad.name}</h1>
      <img
        src={ad.imageUrl}
        alt={ad.name}
        style={{ width: "300px", height: "auto" }}
      />
      <p>Описание: {ad.description}</p>
      <p>Стоимость: {ad.price} ₽</p>
      <p>Просмотры: {ad.views}</p>
      <p>Лайки: {ad.likes}</p>
    </div>
  );
};

export default AdDetail;
