import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "./pages/doctorpages/Home";
import DoctorLogin from "./pages/doctorpages/DoctorLogin";
import PatientLogin from "./pages/patientpages/PatientLogin";
import PatientHome from "./pages/patientpages/PatientHomePage";
import Patient from "./pages/doctorpages/Patient";
import Medicine from "./pages/doctorpages/Medicine";
import Notification from "./pages/patientpages/Notification";
import Profile from "./pages/patientpages/ProfilePage";
import Setting from "./pages/patientpages/setting";
import PatientAuthGuard from "./pages/patientpages/PatientAuthGuard";
import { DoctorAuthGuard } from "./pages/doctorpages/AuthGuard";
import { LandingPage } from "./LandingPage";
import { ThemeProvider, createTheme } from "@mui/material";
import { useThemeContext } from "./theme/ThemeContextProvider";
import PatientInfo from "./pages/doctorpages/PatientInfo";

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
                <Route
                  path="patientDetail/:patientId"
                  element={<PatientInfo/>}
                />
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
