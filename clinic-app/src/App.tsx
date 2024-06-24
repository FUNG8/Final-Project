import React from "react";
import logo from "./logo.svg";
import style from "./App.module.scss";
import TemporaryDrawer from "./components/doctorNavBar";
import { blue } from "@mui/material/colors";
import styled from "styled-components";
import FixedBottomNavigation from "./components/bottomnavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./doctorpages/home";
import DoctorLogin from "./doctorpages/doctorLogin";
import PatientHome from "./patientpages/patientHomePage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Patient from "./doctorpages/patient";
import Medicine from "./doctorpages/medicine";
import Notification from "./patientpages/notification";
import Profile from "./patientpages/profilePage";
import Setting from "./patientpages/setting";
import { AuthGuard } from "./doctorpages/AuthGuard";
import { LandingPage } from "./LandingPage";

function App() {
  return (
    <div className="App">
      {/* <TemporaryDrawer /> */}

      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />

        <Route path="/doctor" element={<AuthGuard />}>
          <Route path="home" element={<Home />} />
          <Route path="patient" element={<Patient />} />
          <Route path="medicine" element={<Medicine />} />
        </Route>

        <Route path="/patientHome" element={<PatientHome />} />
        <Route path="/patientNotification" element={<Notification />} />
        <Route path="/patientProfile" element={<Profile />} />
        <Route path="/patientSetting" element={<Setting />} />
      </Routes>
    </div>
  );
}

export default App;
