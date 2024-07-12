import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import "./PatientProfileBar.scss";
import { Box, Button, Grid, Paper } from "@mui/material";

interface DecodedToken {
  userId: number;
  firstName: string;
  lastName: string;
  hkid: string;
}

interface User {
  firstName: string;
  lastName: string;
}
// {users.map((user) => (
//     <MenuItem
//         className="switchListItem"
//         onClick={() => handleSwitchAccount(user)}
//         key={`${user.firstName}-${user.lastName}`}
//     >
//         {`${user.firstName} ${user.lastName}`}
//     </MenuItem>
// ))}

export default function ProfileChangeBox() {
  const handleSwitchAccount = (token: string) => {
    localStorage.setItem("patientToken", token);
    window.location.reload();
  };

  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    const tokenArrayString = localStorage.getItem("tokenArray");
    const tokenArray: string[] = JSON.parse(tokenArrayString!);
    console.log(tokenArray);

    let tmpArray: any = [];
    tokenArray.map((entry) => {
      console.log(jwtDecode(entry));
      tmpArray.push({ ...jwtDecode(entry), token: entry });
    });

    console.log("check tmp array", tmpArray);

    setProfiles(tmpArray);
  }, []);

  console.log(profiles);

  return (
    <>
      {profiles.length > 0 ? (

        
        profiles.map((entry: any) => (
            <Button
            sx={{marginBottom:1}}
              variant="outlined"
              className="switchListItem"
              onClick={() => handleSwitchAccount(entry.token)}
            >
              {" "}
              {entry.firstName} {entry.lastName}
            </Button>
          
        ))


      ) : (
        <></>
      )}
    </>
  );
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
  line-height: 1.5;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
  `
);
