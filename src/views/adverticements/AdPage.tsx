import { useEffect, useState } from "react";
import AdList from "../../components/AdList/AdList";
import { Advertisment } from "../../../types";
import { fetchAds } from "../../api/fetchAds";
import { Button, SelectChangeEvent } from "@mui/material";
import styles from "./AdPage.module.css";
import Pagination from "../../components/Pagination/Pagination";
import CreateAdModal from "../../components/NewAdModal/NewAdModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import AdsPerPageSelector from "../../components/AdPerPageSelector/AdPerPageSelector";

const AdPage: React.FC = () => {
  const [ads, setAds] = useState<Advertisment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage, setAdsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadAds = async () => {
      const data = await fetchAds();
      setAds(data);
    };

    loadAds();
  }, []);

  const handleCreateAd = (newAd: Advertisment) => {
    setAds((prevAds) => [...prevAds, newAd]);
  };

  const filteredAds = ads.filter((ad) =>
    ad.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAdsPerPageChange = (event: SelectChangeEvent<number>) => {
    setAdsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.adPageWrapper}>
      <h1>Объявления</h1>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Создать новое объявление
      </Button>
      <CreateAdModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateAd}
      />
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <AdList ads={currentAds} />
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

export default AdPage;
