import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import Paper from "@mui/material/Paper";
import { Link, useLocation } from "react-router-dom";

export default function FixedBottomNavigation() {
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
            component={Link}
            to="/home"
            label="Home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/history"
            label="History"
            icon={<HistoryIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/favourite"
            label="Favourite"
            icon={<FavoriteIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}