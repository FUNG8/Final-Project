import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import medicine from "../../pages/doctorpages/Medicine";

const unitOptions = [
    "毫克 mg",
    "微克 μg",
    "克 g",
    "國際單位 IU",
    "毫升 mL",
    "液量盎司 fl oz",
    "滴 gtt",
    "泰瑟 tsp",
    "湯匙 tbsp",
  ];

export function DrugInstruction() {
  const [medicineInput, setMedicineInput] = useState("");
  const [medicine, setMedicine] = React.useState<string | null>(unitOptions[0]);
  return (
    <Autocomplete
      value={medicine}
      onChange={(event: any, newunit: string | null) => {
        setMedicine(newunit);
      }}
      inputValue={medicineInput}
      onInputChange={(event, newInputValue) => {
        setMedicineInput(newInputValue);
      }}
      id="controllable-states-demo"
      options={unitOptions}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Medicine" />}
    />
  );
}
