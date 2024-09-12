import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FilterControlProps } from "@/types/interfaces";

const FilterControl: React.FC<FilterControlProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <FormControl
      variant="outlined"
      style={{ minWidth: 320, marginBottom: "20px" }}
    >
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        <MenuItem value="">
          <em>Все</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterControl;
