import * as React from "react";
import HouseIcon from '@mui/icons-material/House';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../api/patientAuthAPI';
import notification from '../../pages/patientpages/notification';
import Profile from '../../pages/patientpages/profilePage';
import setting from '../../pages/patientpages/setting';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import Paper from "@mui/material/Paper";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getPathValue = (path: string) => {
    switch (path) {
      case "/home":
        return 0;
      case "/history":
        return 1;
      case "/favourite":
        return 2;
      default:
        return 0;
    }
  };

  const [value, setValue] = React.useState(getPathValue(location.pathname));

  React.useEffect(() => {
    setValue(getPathValue(location.pathname));
  }, [location.pathname]);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ pb: 7, marginTop: "68px" }}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation value={value} showLabels onChange={handleChange}>
          <BottomNavigationAction
            onClick={()=>{navigate("/patient/home");}}
            label="Home"
            icon={<HouseIcon />}
          />
          <BottomNavigationAction
            onClick={()=>{navigate("/patient/profile");}}
            label="Profile"
            icon={<AccountCircleIcon />}
          />
          <BottomNavigationAction
            onClick={()=>{navigate("/patient/notification");}}
            label="Notification"
            icon={<NotificationsActiveIcon />}
          />
          <BottomNavigationAction
            onClick={()=>{navigate("/patient/setting");}}
            label="Setting"
            icon={<SettingsIcon />}
          />
          <BottomNavigationAction
            onClick={logout}
            label="Logout"
            icon={<LogoutIcon/>}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}