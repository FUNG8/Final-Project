import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../api/doctorAuthAPI";
import PatientNavBar from "../components/patientNavBar";
import { LandingPage } from "../LandingPage";

export function AuthGuard() {
  let authStatus = useAuthStatus();
  let navigate = useNavigate();

  if (authStatus.status === "success") {
    // Redirect to another page if authentication is successful
    
    return (
      <>
        <PatientNavBar />
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <LandingPage />
      </>
    );
  }
}