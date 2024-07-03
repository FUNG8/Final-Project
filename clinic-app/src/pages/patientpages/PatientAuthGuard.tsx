import { Outlet, useNavigate } from "react-router-dom";
import useAuthStatusPatient from "../../api/patientAuthAPI";
import MiniDrawer from "../../components/patients/PatientNavBar";
import patientHome from "./patientHomePage";
import PatientLoginForm from "../../components/patients/PatientLoginForm";


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