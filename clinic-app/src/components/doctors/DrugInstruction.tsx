import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAllMedicineInfo } from "../../api/medicineAPI";

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

export function DrugInstruction(props: {
  //step 1 props from the insertDIagnosisForm
  idx: number;
  changeFn: (targetIndex: number, medicineName: string, unit:string ) => void;
  medicineOptions: any;
}) {
  const [medicineInput, setMedicineInput] = useState("");
  const [medicine, setMedicine] = React.useState<any>();

  const [unitInput, setUnitInput] = useState("");
  const [unit, setUnit] = React.useState<any>();

  const [totalQuantityInput, setTotalQuantityInput] = useState("");
  const [methodInput, setMethodInput] = useState("");
  const [periodDayInput, setPeriodDayInput] = useState("");
  const [periodHourInput, setPeriodHourInput] = useState("");
  const [frequencyPerDayInput, setFrequencyPerDayInput] = useState("");
  const [dosagePerServingInput, setDosagePerServingInput] = useState("");
  const [remarksInput, setRemarksInput] = useState("");
  ///////////////////////////////////////////////////////////////////////////////////
  //step 3 The value from input field gets here onchange to newValue
  const handleMedChange = (
    event: React.SyntheticEvent<Element, Event>,
    newMedicine: any,
    newUnit: any

  ) => {
    console.log("MedicineChange", newMedicine);
    //step 4 internal state for value display
    setMedicine(newMedicine);
    setUnit(newUnit);
    //step 5 bring back value to insertDiagnosisForm (to the IDF 4a)
    props.changeFn(props.idx, newMedicine.id, newUnit);
  };

  const handleUnitChange = (
    event: React.SyntheticEvent<Element, Event>,
    newUnit: any
  ) => {
    console.log("UnitChange", newUnit);
    setUnit(newUnit);
    props.changeFn(props.idx, medicine.id, newUnit);
  };

  return (
    <div>
      {/* step 2 get the props and make input fields, when value onchange it calls the handleMedChange function */}
      <h1>Index {props.idx}</h1>
      <Autocomplete
        size={"small"}
        value={medicine}
        onChange={handleMedChange}
        inputValue={medicineInput}
        onInputChange={(event, newInputValue) => {
          setMedicineInput(newInputValue);
        }}
        id="controllable-states-demo"
        options={props.medicineOptions}
        getOptionLabel={(entry: any) => `${entry.name}`}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Medicine" />}
      />
      <Autocomplete
        size={"small"}
        value={unit}
        onChange={handleUnitChange}
        inputValue={unitInput}
        onInputChange={(event, newInputValue) => {
          setUnitInput(newInputValue);
        }}
        id="controllable-states-demo"
        options={unitOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Unit" />}
      />
      <TextField
        size={"small"}
        name="totalQuantity"
        sx={{ width: 300, my: 0 }}
        value={totalQuantityInput}
        onChange={(e) => setTotalQuantityInput(e.target.value)}
        margin="normal"
        required
        id="totalQuantity"
        label="Total Quantity"
        autoComplete="totalQuantity"
        autoFocus
        type="number"
        inputProps={{ maxLength: 8 }}
      />
      <TextField
        size={"small"}
        value={methodInput}
        onChange={(e) => setMethodInput(e.target.value)}
        name="methodInput"
        margin="normal"
        required
        id="methodInput"
        label="Method"
        autoComplete="methodInput"
        autoFocus
        sx={{ width: 300, my: 0 }}
      />
      <TextField
        size={"small"}
        name="periodDay"
        sx={{ width: 300, my: 0, mx: 0 }}
        value={periodDayInput}
        onChange={(e) => setPeriodDayInput(e.target.value)}
        margin="normal"
        required
        id="periodDay"
        label="Period Day"
        autoComplete="periodDay"
        autoFocus
        type="number"
        inputProps={{ maxLength: 8 }}
      />
      <TextField
        size={"small"}
        name="periodHour"
        sx={{ width: 300, my: 0 }}
        value={periodHourInput}
        onChange={(e) => setPeriodHourInput(e.target.value)}
        margin="normal"
        required
        id="periodHour"
        label="Period Hour"
        autoComplete="periodHour"
        autoFocus
        type="number"
        inputProps={{ maxLength: 8 }}
      />
      <TextField
        size={"small"}
        name="frequencyPerDay"
        sx={{ width: 300, my: 0 }}
        value={frequencyPerDayInput}
        onChange={(e) => setFrequencyPerDayInput(e.target.value)}
        margin="normal"
        required
        id="frequencyPerDay"
        label="Frequency Per Day"
        autoComplete="frequencyPerDay"
        autoFocus
        type="number"
        inputProps={{ maxLength: 8 }}
      />
      <TextField
        size={"small"}
        name="dosagePerServing"
        sx={{ width: 300, my: 0 }}
        value={dosagePerServingInput}
        onChange={(e) => setDosagePerServingInput(e.target.value)}
        margin="normal"
        required
        id="dosagePerServing"
        label="Dosage Per Serving"
        autoComplete="dosagePerServing"
        autoFocus
        type="number"
        inputProps={{ maxLength: 8 }}
      />
      <TextField
        size={"small"}
        value={remarksInput}
        onChange={(e) => setRemarksInput(e.target.value)}
        name="remarksInput"
        margin="normal"
        required
        fullWidth
        id="remarksInput"
        label="Remarks"
        autoComplete="remarksInput"
        autoFocus
        sx={{ width: 300, my: 0 }}
      />
    </div>
  );
}
