import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useScrollTrigger } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../api/patientAuthAPI";

export default function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const trigger = useScrollTrigger();

  // Function to handle the navigation based on the selected value
  const handleNavigation = (newValue: number) => {
    switch (newValue) {
      case 0:
        navigate("/patient/profile");
        break;
      case 1:
        navigate("/patient/diagnosishistory");
        break;
      case 2:
        navigate("/patient/ticket");
        break;
      case 3:
        navigate("/patient/notification");
        break;
      case 4:
        logout();
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ width: 500, zIndex: 4 }}>
      {!trigger && ( // Render the component only if scroll trigger is false (dragging up)
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 8888, // Set a higher z-index value
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={location.pathname === "/patient/profile" ? 0 : location.pathname === "/patient/diagnosishistory" ? 1: location.pathname === "/patient/ticket" ? 2 : location.pathname === "/patient/notification" ? 3 : -1}
            onChange={(event, newValue) => {
              handleNavigation(newValue);
            }}
          >
            <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
            <BottomNavigationAction label="Diagnosis" icon={<MedicalServicesIcon />} />
            <BottomNavigationAction label="Ticket" icon={<ConfirmationNumberIcon />} />
            <BottomNavigationAction label="Notification" icon={<NotificationsActiveIcon />} />
            <BottomNavigationAction label="Log Out" icon={<LogoutIcon />} />
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
}