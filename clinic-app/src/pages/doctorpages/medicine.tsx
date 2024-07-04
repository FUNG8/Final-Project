import React from "react";
import logo from "./logo.svg";
import style from "./App.module.scss";
import TemporaryDrawer from "../../components/doctors/doctorNavBar";
import { blue } from "@mui/material/colors";
import styled from "styled-components";
import { ListMedicine } from "../../components/doctors/medicineList";
import InsertMedicineModal from "../../components/doctors/insertMedicineForm";

export default function medicine() {
  return (
    <div className="App">
      <InsertMedicineModal />
      <ListMedicine />
    </div>
  );
}
