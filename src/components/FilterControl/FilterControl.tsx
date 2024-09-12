import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface FilterControlProps {
  label: string;
  value: number | "";
  options: Array<{ value: number; label: string }>;
  onChange: (event: SelectChangeEvent<number | "">) => void;
}

const FilterControl: React.FC<FilterControlProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <FormControl
      variant="outlined"
      style={{ minWidth: 150, marginBottom: "20px", marginLeft: "20px" }}
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
