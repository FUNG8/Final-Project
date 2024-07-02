import { Outlet, useNavigate } from "react-router-dom";
import useAuthStatusPatient from "../../api/patientAuthAPI";
import MiniDrawer from "../../components/patients/patientNavBar";
import patientHome from "./patientHomePage";
import PatientLoginForm from "../../components/patients/patientLoginForm";


export default function PatientAuthGuard() {
  let authStatus = useAuthStatusPatient();
  let navigate = useNavigate();

  if (authStatus.status === "success") {
    // Redirect to another page if authentication is successful
    
    return (
      <>
        
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <PatientLoginForm />
      </>
    );
  }
}