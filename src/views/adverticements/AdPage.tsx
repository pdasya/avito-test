import { FC } from "react";
import AdCard from "../../components/AdItem/AdItem";

const AdPage: FC = () => {
  return (
    <AdCard
      image="https://play-lh.googleusercontent.com/APz66mWpIbEvm2lO_UPukqQShRkbAFiudlOiLUoe-r4e_nIq7DT6BqCr1LRbqeXuSqr8"
      title="Продукт"
      price={1500}
      views={120}
      likes={35}
    />
  );
};

export default AdPage;
