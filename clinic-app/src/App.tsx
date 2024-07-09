import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "./pages/doctorpages/Home";
import DoctorLogin from "./pages/doctorpages/DoctorLogin";
import PatientLogin from "./pages/patientpages/PatientLogin";
import PatientHome from "./pages/patientpages/PatientHomePage";
import Patient from "./pages/doctorpages/Patient";
import Medicine from "./pages/doctorpages/Medicine";
import Profile from "./pages/patientpages/ProfilePage";
import Setting from "./pages/patientpages/Setting";

import PatientAuthGuard from "./pages/patientpages/PatientAuthGuard";
import { DoctorAuthGuard } from "./pages/doctorpages/AuthGuard";
import { LandingPage } from "./LandingPage";
import { ShowPatientInfo } from "./components/ShowPatientInfo";
// import { ThemeProvider } from "styled-components";
import PatientInfo from "./pages/doctorpages/PatientInfo";
import { useThemeContext } from "./theme/ThemeContextProvider";

import { CssBaseline, ThemeProvider } from "@mui/material";
import NotificationPage from "./pages/patientpages/NotificationPage";

// hahahahaha
const queryClient = new QueryClient();

function App() {
  const hkid = "Z1234574"
  const parsedPatientId: number | undefined = 123;
  const { theme } = useThemeContext();


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

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
                {/* <Route path="patientDetail/:patientId" element={<ShowPatientInfo />} /> */}
                <Route
                  path="patientDetail/:patientId"
                  element={<PatientInfo/>}
                />
                <Route path="medicine" element={<Medicine />} />
              </Route>


              <Route path="/patient" element={<PatientAuthGuard />}>
                <Route path="home" element={<PatientHome />} />
                <Route path="notification" element={<NotificationPage />} />
                <Route path="profile" element={<Profile hkid={hkid} />} />
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