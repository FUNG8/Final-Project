import { TextField } from "@mui/material";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("hi");
    onSearch(event.target.value);
  };

  return (
    <TextField label="Search" variant="outlined" onChange={handleInputChange} />
  );
}
