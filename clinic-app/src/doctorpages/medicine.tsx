import React from "react";
import logo from "./logo.svg";
import style from "./App.module.scss";
import TemporaryDrawer from "../components/doctorNavBar";
import { blue } from "@mui/material/colors";
import styled from "styled-components";
import FixedBottomNavigation from "../components/bottomnavbar";
import { ListMedicine } from "../features/medicineinfo/medicineList";
import InsertMedicineModal from "../components/insertMedicineForm";

export default function medicine() {
  return (
    <div className="App">
      <InsertMedicineModal />
      <ListMedicine />
    </div>
  );
}
