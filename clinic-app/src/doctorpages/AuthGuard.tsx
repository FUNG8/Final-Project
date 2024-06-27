import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStatusDoctor } from "../api/doctorAuthAPI";


import DoctorLogInForm from "../components/doctorLogInForm";
import DoctorNavBar from "../components/doctorNavBar";
import PatientNavBar from "../components/patientNavBar";
import { LandingPage } from "../LandingPage";

export function AuthGuard() {
  let authStatus = useAuthStatusDoctor();
  let navigate = useNavigate();

  if (authStatus.status === "success") {
    // Redirect to another page if authentication is successful
    
    return (
      <>
        <DoctorNavBar />
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