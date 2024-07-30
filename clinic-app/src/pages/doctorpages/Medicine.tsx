// hahahahaha
import { Grid, Zoom } from "@mui/material";
import InsertMedicineModal from "../../components/doctors/InsertMedicineForm";
import { ListMedicine } from "../../components/doctors/MedicineList";
import React, { useEffect } from "react";

export default function Medicine() {
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    setChecked(true)
  });

  return (
    <div className="App">
      <Grid mx={5}>
        <Zoom in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
          <div>

            <InsertMedicineModal />
          </div>
        </Zoom>
        <ListMedicine />
      </Grid>
    </div>
  );
}
