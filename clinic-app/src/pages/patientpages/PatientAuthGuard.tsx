// hahahahaha
import { Outlet, useNavigate } from "react-router-dom";
import useAuthStatusPatient from "../../api/patientAuthAPI";
// import MiniDrawer from "../../components/patients/PatientNavBar";
import patientHome from "./PatientHomePage";
import PatientLoginForm from "../../components/patients/PatientLoginForm1";
import BottomNavbar from "../../components/patients/BottomNavbar1";


export default function PatientAuthGuard() {
  let authStatus = useAuthStatusPatient();
  let navigate = useNavigate();

  if (authStatus.status === "success") {
    // Redirect to another page if authentication is successful
    
    return (
      <>
        <BottomNavbar/>
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