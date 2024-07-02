import React from "react";
import logo from "./logo.svg";
import style from "./App.module.scss";
import TemporaryDrawer from "../components/doctorNavBar";
import { blue } from "@mui/material/colors";
import styled from "styled-components";
<<<<<<< HEAD
import FixedBottomNavigation from "../components/patients/bottomnavbar";
import { ListMedicine } from "../features/medicineinfo/medicineList";
=======
import { ListMedicine } from "../components/medicineList";
>>>>>>> 4e5a6ebc2656203f817590ffe7570cc5f7cacdeb
import InsertMedicineModal from "../components/insertMedicineForm";

export default function medicine() {
  return (
    <div className="App">
      <InsertMedicineModal />
      <ListMedicine />
    </div>
  );
}
