import { Grid, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import AdItem from "../AdItem/AdItem";
import { Advertisment } from "../../../types";
import { fetchAds } from "../../api/fetchAds";
import Pagination from "../Pagination/Pagination";
import styles from "./AdList.module.css";
import AdsPerPageSelector from "../AdPerPageSelector/AdPerPageSelector";

const AdList: React.FC = () => {
  const [ads, setAds] = useState<Advertisment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage, setAdsPerPage] = useState(10);

  useEffect(() => {
    const loadAds = async () => {
      const data = await fetchAds();
      setAds(data);
    };

    loadAds();
  }, []);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(ads.length / adsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAdsPerPageChange = (event: SelectChangeEvent<number>) => {
    setAdsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={styles.adListWrapper}>
      <Grid container spacing={2} className={styles.listWrapper}>
        {currentAds.map((ad) => (
          <Grid item key={ad.id}>
            <AdItem {...ad} />
          </Grid>
        ))}
      </Grid>
      <div className={styles.paginationWrapper}>
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <AdsPerPageSelector
          adsPerPage={adsPerPage}
          onAdsPerPageChange={handleAdsPerPageChange}
        />
      </div>
    </div>
  );
};

export default AdList;
