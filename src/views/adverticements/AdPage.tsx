import { useEffect, useState } from "react";
import { Button, SelectChangeEvent } from "@mui/material";
import styles from "./AdPage.module.scss";
import { Advertisment } from "@/types/types";
import apiService from "@api/apiService";
import Loader from "@components/Loader/Loader";
import CreateAdModal from "@components/NewAdModal/NewAdModal";
import SearchBar from "@components/SearchBar/SearchBar";
import FilterControl from "@components/FilterControl/FilterControl";
import AdList from "@components/AdList/AdList";
import Pagination from "@components/Pagination/Pagination";
import AdsPerPageSelector from "@components/AdPerPageSelector/AdPerPageSelector";

const AdPage: React.FC = () => {
  const [ads, setAds] = useState<Advertisment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage, setAdsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<number | "">("");
  const [viewsFilter, setViewsFilter] = useState<number | "">("");
  const [likesFilter, setLikesFilter] = useState<number | "">("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAds = async () => {
      setIsLoading(true);
      const data = await apiService.fetchAds();
      setAds(data);
      setIsLoading(false);
    };

    loadAds();
  }, []);

  const handleCreateAd = (newAd: Advertisment) => {
    setAds((prevAds) => [...prevAds, newAd]);
  };

  const filteredAds = ads
    .filter((ad) => ad.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((ad) => {
      if (priceFilter !== "") {
        if (priceFilter === 0) return ad.price < 1000;
        if (priceFilter === 1) return ad.price >= 1000 && ad.price <= 5000;
        if (priceFilter === 2) return ad.price > 5000;
      }
      return true;
    })
    .filter((ad) => {
      if (viewsFilter !== "") {
        if (viewsFilter === 0) return ad.views < 100;
        if (viewsFilter === 1) return ad.views >= 100 && ad.views <= 1000;
        if (viewsFilter === 2) return ad.views > 1000;
      }
      return true;
    })
    .filter((ad) => {
      if (likesFilter !== "") {
        if (likesFilter === 0) return ad.likes < 10;
        if (likesFilter === 1) return ad.likes >= 10 && ad.likes <= 100;
        if (likesFilter === 2) return ad.likes > 100;
      }
      return true;
    });

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
    <>
      {isLoading ? (
        <Loader />
      ) : (
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

          <div className={styles.filtersWrapper}>
            <FilterControl
              label="Фильтр по цене"
              value={priceFilter}
              options={[
                { value: 0, label: "До 1000 ₽" },
                { value: 1, label: "1000-5000 ₽" },
                { value: 2, label: "Более 5000 ₽" },
              ]}
              onChange={(event) =>
                setPriceFilter(
                  event.target.value === "" ? "" : Number(event.target.value),
                )
              }
            />

            <FilterControl
              label="Фильтр по просмотрам"
              value={viewsFilter}
              options={[
                { value: 0, label: "До 100 просмотров" },
                { value: 1, label: "100-1000 просмотров" },
                { value: 2, label: "Более 1000 просмотров" },
              ]}
              onChange={(event) =>
                setViewsFilter(
                  event.target.value === "" ? "" : Number(event.target.value),
                )
              }
            />

            <FilterControl
              label="Фильтр по лайкам"
              value={likesFilter}
              options={[
                { value: 0, label: "До 10 лайков" },
                { value: 1, label: "10-100 лайков" },
                { value: 2, label: "Более 100 лайков" },
              ]}
              onChange={(event) =>
                setLikesFilter(
                  event.target.value === "" ? "" : Number(event.target.value),
                )
              }
            />
          </div>

          {currentAds.length === 0 ? (
            <p>По вашему запросу ничего не найдено</p>
          ) : (
            <AdList ads={currentAds} />
          )}

          <div className={styles.paginationWrapper}>
            {totalPages > 0 && (
              <>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
                <AdsPerPageSelector
                  adsPerPage={adsPerPage}
                  onAdsPerPageChange={handleAdsPerPageChange}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdPage;
