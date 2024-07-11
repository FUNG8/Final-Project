// hahahahaha
import { Grid } from "@mui/material";
import InsertMedicineModal from "../../components/doctors/InsertMedicineForm";
import { ListMedicine } from "../../components/doctors/MedicineList";

export default function medicine() {
  return (
    <div className="App">
      <Grid mx={5}>
        <InsertMedicineModal />
        <ListMedicine />
      </Grid>
    </div>
  );
}
