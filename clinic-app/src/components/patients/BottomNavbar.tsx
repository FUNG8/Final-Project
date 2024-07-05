// hahahahaha
import * as React from "react";
import HouseIcon from "@mui/icons-material/House";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../api/patientAuthAPI";
import notification from "../../pages/patientpages/Notification";
import Profile from "../../pages/patientpages/ProfilePage";
import setting from "../../pages/patientpages/setting";
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
  const [value, setValue] = React.useState(0);

  // const location = useLocation();


  // const getPathValue = (path: string) => {
  //   switch (path) {
  //     case "/home":
  //       return 0;
  //     case "/history":
  //       return 1;
  //     case "/favourite":
  //       return 2;
  //     default:
  //       return 0;
  //   }
  // };

  // const [value, setValue] = React.useState(getPathValue(location.pathname));

  // React.useEffect(() => {
  //   setValue(getPathValue(location.pathname));
  // }, [location.pathname]);

  // const handleChange = (newValue: any) => {
  //   setValue(newValue);
  // };

  return (
    
    <Box sx={{ width: 500 }}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            onClick={() => {
              navigate("/patient/home");
            }}
            icon={<HouseIcon />}
          />
          <BottomNavigationAction
            label="Profile"
            onClick={() => {
              navigate("/patient/profile");
            }}
            icon={<AccountCircleIcon />}
          />
          <BottomNavigationAction
            label="Notification"
            onClick={() => {
              navigate("/patient/notification");
            }}
            icon={<NotificationsActiveIcon />}
          />
          <BottomNavigationAction
            label="Settings"
            onClick={() => {
              navigate("/patient/setting");
            }}
            icon={<SettingsIcon />}
          />
          <BottomNavigationAction
            label="Log Out"
            onClick={logout}
            icon={<LogoutIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
