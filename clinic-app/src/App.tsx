import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import logo from "./logo.svg";
import style from "./App.module.scss";
import TemporaryDrawer from "./components/doctors/doctorNavBar";
import FixedBottomNavigation from "./components/patients/bottomnavbar";
import Home from "./pages/doctorpages/home";
import DoctorLogin from "./pages/doctorpages/doctorLogin";
import PatientLogin from "./pages/patientpages/patientLogin";
import PatientHome from "./pages/patientpages/patientHomePage";
import Patient from "./pages/doctorpages/patient";
import Medicine from "./pages/doctorpages/medicine";
import Notification from "./pages/patientpages/notification";
import Profile from "./pages/patientpages/profilePage";
import Setting from "./pages/patientpages/setting";

import PatientAuthGuard from "./pages/patientpages/PatientAuthGuard";
import { DoctorAuthGuard } from "./pages/doctorpages/AuthGuard";
import { LandingPage } from "./LandingPage";
import { ShowPatientInfo } from "./components/ShowPatientInfo";
import { ThemeProvider, createTheme } from "@mui/material";
import { useThemeContext } from "./theme/ThemeContextProvider";
import NightModeToggle from "./components/NightModeToggle";

const queryClient = new QueryClient();


function App() {
  const parsedPatientId: number | undefined = 123;
const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;