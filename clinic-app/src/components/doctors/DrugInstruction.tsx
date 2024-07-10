import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAllMedicineInfo } from "../../api/medicineAPI";

export function DrugInstruction(props: {
  idx: number;
  changeFn: (targetIndex: number, medicineName: string) => void;
  medicineOptions: any;
}) {
  // get the array of medicines

  const [medicineInput, setMedicineInput] = useState("");
  const [selectedMedicine, setSelectedMedicine] = React.useState<any>();

  const handleMedicineChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    console.log("hihihi", newValue);
    setSelectedMedicine(newValue);
    props.changeFn(props.idx, newValue.name);
  };

  const handleFrequencyChange = (newValue:any)=>{

    // setFrequency()
    // props.changeFn(props.idx,selectedMedicine.name)
  }

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setMedicineInput(newInputValue);
    console.log("Handle Input Change", newInputValue);
  };
  console.log("selectedMedicine", selectedMedicine);
  return (
    <div>
      <h1>Index {props.idx}</h1>
      <Autocomplete
        value={selectedMedicine}
        onChange={handleMedicineChange}
        inputValue={medicineInput}
        onInputChange={handleInputChange}
        id="controllable-states-demo"
        options={props.medicineOptions}
        getOptionLabel={(entry: any) => `${entry.generic_drug}`}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Medicine" />}
      />
    </div>
  );
}
