// hahahahaha
import { Grid, TextField, Tooltip } from "@mui/material";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}
const StyledTextField = styled(TextField)({
  padding: -1
})

export function SearchBar({ onSearch }: SearchBarProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("hi")
    onSearch(event.target.value);



  };

  return (
    <Grid xs={12} sx={{ display: "flex", justifyContent: "center", margin: 2, alignItems: "center" }}>
      <SearchIcon sx={{ marginLeft: 2, marginRight: 2 }} />
      <Tooltip title="Enter Something of your patient" placement="bottom-start">
      <TextField size="small" label="Search" variant="outlined" onChange={handleInputChange} sx={{ width: 500 }} />
      </Tooltip>
    </Grid>
  );
} 