import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import logo from "./logo.svg";
import style from "./App.module.scss";
import TemporaryDrawer from "./components/doctorNavBar";
import FixedBottomNavigation from "./components/bottomnavbar";
import Home from "./doctorpages/home";
import DoctorLogin from "./doctorpages/doctorLogin";
import PatientLogin from "./patientpages/patientLogin";
import PatientHome from "./patientpages/patientHomePage";
import Patient from "./doctorpages/patient";
import Medicine from "./doctorpages/medicine";
import Notification from "./patientpages/notification";
import Profile from "./patientpages/profilePage";
import Setting from "./patientpages/setting";

import PatientAuthGuard from "./patientpages/PatientAuthGuard";
import { DoctorAuthGuard } from "./doctorpages/AuthGuard";
import { LandingPage } from "./LandingPage";
import { ShowPatientInfo } from "./features/patientInfo/ShowPatientInfo";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          {/* <TemporaryDrawer /> */}

          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/doctorlogin" element={<DoctorLogin />} />
            <Route path="/patientlogin" element={<PatientLogin />} />

            <Route path="/doctor" element={<DoctorAuthGuard />}>
              <Route path="home" element={<Home />} />
              <Route path="patient" element={<Patient />} />
              <Route path="patientDetail/:patientId" element={<ShowPatientInfo />} />
              <Route path="medicine" element={<Medicine />} />
            </Route>


            <Route path="/patient" element={<PatientAuthGuard />}>
              <Route path="home" element={<PatientHome />} />
              <Route path="notification" element={<Notification />} />
              <Route path="profile" element={<Profile />} />
              <Route path="setting" element={<Setting />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;