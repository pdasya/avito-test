import { FC } from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <TextField
      label="Поиск по названию"
      variant="outlined"
      value={searchQuery}
      onChange={onSearchChange}
      fullWidth
      margin="normal"
    />
  );
};

export default SearchBar;
