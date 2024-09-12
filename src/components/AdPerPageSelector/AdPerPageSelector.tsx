import { FC } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface AdsPerPageSelectorProps {
  adsPerPage: number;
  onAdsPerPageChange: (event: SelectChangeEvent<number>) => void;
}

const AdsPerPageSelector: FC<AdsPerPageSelectorProps> = ({
  adsPerPage,
  onAdsPerPageChange,
}) => {
  return (
    <FormControl variant="outlined" style={{ minWidth: 200, marginBottom: 20 }}>
      <InputLabel id="ads-per-page-label">Объявлений на странице</InputLabel>
      <Select
        labelId="ads-per-page-label"
        id="ads-per-page"
        value={adsPerPage}
        onChange={onAdsPerPageChange}
        label="Объявлений на странице"
      >
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>
    </FormControl>
  );
};

export default AdsPerPageSelector;
