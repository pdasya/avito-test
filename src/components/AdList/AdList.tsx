import { Grid } from "@mui/material";
import AdItem from "../AdItem/AdItem";
import styles from "./AdList.module.scss";
import { AdListProps } from "@/types/interfaces";

const AdList: React.FC<AdListProps> = ({ ads }) => {
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
