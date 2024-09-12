import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import AdItem from "../AdItem/AdItem";
import { Advertisment } from "../../../types";
import { fetchAds } from "../../api/fetchAds";
import styles from "./AdList.module.css";

const AdList: React.FC = () => {
  const [ads, setAds] = useState<Advertisment[]>([]);

  useEffect(() => {
    const loadAds = async () => {
      const data = await fetchAds();
      setAds(data);
    };

    loadAds();
  }, []);

  return (
    <Grid container spacing={2} className={styles.listWrapper}>
      {ads.map((ad) => (
        <Grid item key={ad.id}>
          <AdItem {...ad} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AdList;
