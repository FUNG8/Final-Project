import React from "react";
import logo from "./logo.svg";
import style from "./App.module.scss";
import TemporaryDrawer from "../../components/doctors/DoctorNavBar";
import { blue } from "@mui/material/colors";
import styled from "styled-components";
import { ListMedicine } from "../../components/doctors/MedicineList";
import InsertMedicineModal from "../../components/doctors/InsertMedicineForm";

export default function medicine() {
  return (
    <div className="App">
      <InsertMedicineModal />
      <ListMedicine />
    </div>
  );
}
