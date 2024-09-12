import { FC } from "react";
import { TextField } from "@mui/material";
import { SearchBarProps } from "@/types/interfaces";

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
