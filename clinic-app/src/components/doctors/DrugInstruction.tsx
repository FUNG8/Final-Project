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
  changeFn: (
    targetIndex: number,
    medicineId: number,
    unit: number,
    quantity: any,
    method: any,
    periodDay: any,
    periodHour: any,
    frequencyPerDay: any,
    dosagePerServing: any,
    remarks: any
  ) => any;
  medicineOptions: any;
}) {
  const [medicineInput, setMedicineInput] = useState("");
  const [medicine, setMedicine] = React.useState<any>();

  const [unitInput, setUnitInput] = useState("");
  const [unit, setUnit] = React.useState<any>();

  const [quantityInput, setQuantityInput] = useState("");
  const [quantity, setQuantity] = React.useState<any>();

  const [methodInput, setMethodInput] = useState("");
  const [method, setMethod] = React.useState<any>();

  const [periodDayInput, setPeriodDayInput] = useState("");
  const [periodDay, setPeriodDay] = React.useState<any>();

  const [periodHourInput, setPeriodHourInput] = useState("");
  const [periodHour, setPeriodHour] = React.useState<any>();

  const [frequencyPerDayInput, setFrequencyPerDayInput] = useState("");
  const [frequencyPerDay, setFrequencyPerDay] = React.useState<any>();

  const [dosagePerServingInput, setDosagePerServingInput] = useState("");
  const [dosagePerServing, setDosagePerServing] = React.useState<any>();

  const [remarksInput, setRemarksInput] = useState("");
  const [remarks, setRemarks] = React.useState<any>();

  ///////////////////////////////////////////////////////////////////////////////////
  //step 3 The value from input field gets here onchange to newValue
  const handleMedChange = (
    event: React.SyntheticEvent<Element, Event>,
    newMedicine: any
  ) => {
    console.log("MedicineChange", newMedicine);
    //step 4 internal state for value display
    setMedicine(newMedicine);
    //step 5 bring back value to insertDiagnosisForm (to the IDF 4a)
    props.changeFn(
      props.idx,
      newMedicine.id, //
      unit,
      quantity,
      method,
      periodDay,
      periodHour,
      frequencyPerDay,
      dosagePerServing,
      remarks
    );
  };

  const handleUnitChange = (
    event: React.SyntheticEvent<Element, Event>,
    newUnit: any
  ) => {
    console.log("UnitChange", newUnit);
    setUnit(newUnit);
    props.changeFn(
      props.idx,
      medicine.id,
      newUnit,//
      quantity,
      method,
      periodDay,
      periodHour,
      frequencyPerDay,
      dosagePerServing,
      remarks
    );
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = event.target.value;
    setQuantityInput(newQuantity);
    setQuantity(newQuantity); 
    props.changeFn(
      props.idx,
      medicine.id,
      unit,
      newQuantity,  //
      method, 
      periodDay,
      periodHour,
      frequencyPerDay,
      dosagePerServing,
      remarks
    );
  };

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMethod = event.target.value;
    setMethodInput(newMethod);
    setMethod(newMethod); 

    props.changeFn(
      props.idx,
      medicine.id,
      unit,
      quantity,
      newMethod,//
      periodDay,
      periodHour,
      frequencyPerDay,
      dosagePerServing,
      remarks
    );
  };

  const handlePeriodDayChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPeriodDay = event.target.value;
    setPeriodDayInput(newPeriodDay);
    setPeriodDay(newPeriodDay)
    props.changeFn(
      props.idx,
      medicine.id,
      unit,
      quantity,
      method,
      newPeriodDay,//
      periodHour,
      frequencyPerDay,
      dosagePerServing,
      remarks
    );
  };

  const handlePeriodHourChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPeriodHour = event.target.value;
    setPeriodHourInput(newPeriodHour);
    setPeriodHour(newPeriodHour)
    props.changeFn(
      props.idx,
      medicine.id,
      unit,
      quantity,
      method,
      periodDay,
      newPeriodHour,//
      frequencyPerDay,
      dosagePerServing,
      remarks
    );
  };

  const handleFrequencyPerDayChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFrequencyPerDay = event.target.value;
    setFrequencyPerDayInput(newFrequencyPerDay);
    setFrequencyPerDay(newFrequencyPerDay);
    props.changeFn(
      props.idx,
      medicine.id,
      unit,
      quantity,
      method,
      periodDay,
      periodHour,
      newFrequencyPerDay,//
      dosagePerServing,
      remarks
    );
  };

  const handleDosagePerServingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDosagePerServing = event.target.value;
    setDosagePerServingInput(newDosagePerServing);
    setDosagePerServing(newDosagePerServing);
    props.changeFn(
      props.idx,
      medicine.id,
      unit,
      quantity,
      method,
      periodDay,
      periodHour,
      frequencyPerDay,
      newDosagePerServing,//
      remarks
    );
  };

  const handleRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRemarks = event.target.value;
    setRemarksInput(newRemarks);
    setRemarks(newRemarks)
    props.changeFn(
      props.idx,
      medicine.id,
      unit,
      quantity,
      method,
      periodDay,
      periodHour,
      frequencyPerDay,
      dosagePerServing,
      newRemarks//
    );
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
        size="small"
        name="totalQuantity"
        sx={{ width: 300, my: 0 }}
        value={quantityInput}
        onChange={handleQuantityChange}
        
        margin="normal"
        required
        id="totalQuantity"
        label="Total Quantity"
        autoComplete="totalQuantity"
        autoFocus
        type="number"
        inputProps={{ maxLength: 8 }}
      />
      ;
      <TextField
        size={"small"}
        value={methodInput}
        onChange={handleMethodChange}
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
        onChange={handlePeriodDayChange}
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
        onChange={handlePeriodHourChange}
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
        onChange={handleFrequencyPerDayChange}
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
        onChange={handleDosagePerServingChange}
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
        onChange={handleRemarksChange}
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
