import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAllMedicineInfo } from "../../api/medicineAPI";

function handleAddInstruction() {}

export function DrugInstruction() {
  // get the array of medicines
  const medicineinfo = useAllMedicineInfo();
  const meds = (medicineinfo as any)?.medicineResult;
  // map the medicine id into the medicineOptions array
  const medicineOptions = meds?.map((medicine: any) => `${medicine.id}`) || [];
  console.log(medicineOptions);

  const [medicineInput, setMedicineInput] = useState("");
  const [selectedMedicine, setSelectedMedicine] = React.useState<string | null>(
    medicineOptions[0] || null
  );

  const handleMedicineChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => {
    setSelectedMedicine(newValue);
  };

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setMedicineInput(newInputValue);
    console.log('Handle Input Change', newInputValue)
  };

  return (
    <div>
      <Autocomplete
        value={selectedMedicine}
        onChange={handleMedicineChange}
        inputValue={medicineInput}
        onInputChange={handleInputChange}
        id="controllable-states-demo"
        options={medicineOptions}
        
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Medicine" />}
      />
    </div>
  );
}
