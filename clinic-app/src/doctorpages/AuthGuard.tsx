import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStatusDoctor } from "../api/doctorAuthAPI";


import DoctorLogInForm from "../components/doctorLogInForm";
import DoctorNavBar from "../components/doctorNavBar";
import PatientNavBar from "../components/patients/patientNavBar";
import { LandingPage } from "../LandingPage";


//logic to determine if status is sucess it will show doctor's pages component
//outlet means stuffs of other pages other than doctor nav bar

export function DoctorAuthGuard() {
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