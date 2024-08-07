// hahahahaha
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStatusDoctor } from "../../api/doctorAuthAPI";


import DoctorLogInForm from "../../components/doctors/DoctorLogInForm";
import DoctorNavBar from "../../components/doctors/DoctorNavBar";
// import PatientNavBar from "../../components/patients/PatientNavBar";
import { LandingPage } from "../../LandingPage";
import DoctorLogin from "./DoctorLogin";
import { useSnackbar } from "notistack";


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
        <DoctorLogin />
       
      </>
    );
  }
}