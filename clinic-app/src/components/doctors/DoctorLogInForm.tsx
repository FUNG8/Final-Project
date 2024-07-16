// hahahahaha
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../..';
import { useState } from 'react';
import { login } from "../../api/doctorAuthAPI";
import DesignerImage from '../../image/Designer.jpeg';
import { useSnackbar } from '@mui/base/useSnackbar';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { css, keyframes, styled } from '@mui/system';


function PatientLoginLink(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>

      <Link color="inherit" href="http://localhost:3000/patientLogin">
        Click here to our Patient site
      </Link>{' '}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function DoctorLogInForm() {
  const [usernameInput, setUsernameInput] = useState("doctor2");
  const [passwordInput, setPasswordInput] = useState("password2");
  const navigate = useNavigate();

  //snackbar 
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    open,
    autoHideDuration: 5000,
  });

  const handleOpen = () => {
    setOpen(true);
  };



  //submit button get the username and pw from handle login to here
  //we bring the data to the doctorAuth API by login(data.username,data.pw)
  //localStorage to set token
  const onLogin = useMutation({
    mutationFn: async (data: { username: string; password: string }) =>
      login(data.username, data.password),
    onSuccess: (data) => {
      console.log("On success checking", data);
      localStorage.setItem("clinicToken", data);

      navigate('/doctor/home')
      queryClient.invalidateQueries({ queryKey: ["authStatus"] });
    },
    onError: (e) => {
      console.log("On error!!", e);
      handleOpen()


    },
  });


  //input field onchange will set the username and pw input by props and state
  //submit button 帶 value入去onLogin mutate 
  const handleLogin = () => {
    console.log("loggging in");
    console.log(usernameInput, passwordInput)
    onLogin.mutate({ username: usernameInput, password: passwordInput });
  };

  return (

    <ThemeProvider theme={defaultTheme}>
      {/* snack bar alert */}
      <React.Fragment>


      
        {open ? (
          <ClickAwayListener onClickAway={onClickAway}>
            <CustomSnackbar {...getRootProps()}>Wrong Username or Password! Please try again!</CustomSnackbar>
          </ClickAwayListener>
        ) : null}
      </React.Fragment>


      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${DesignerImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 20,
              mx: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>

              {/* set the textfield with value usernameInput and change target value while the field onchange*/}
              <TextField
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                onClick={handleLogin}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <PatientLoginLink sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );


}



const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const CustomSnackbar = styled('div')(
  ({ theme }) => css`
    position: fixed;
    z-index: 5500;
    display: flex;
    right: 16px;
    bottom: 16px;
    left: auto;
    justify-content: space-between;
    max-width: 560px;
    min-width: 300px;
    background-color: ${theme.palette.mode === 'dark' ? '#FF0000' : '#FF0000'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: ${theme.palette.mode === 'dark'
      ? `0 2px 8px rgb(0 0 0 / 0.5)`
      : `0 2px 8px ${grey[200]}`};
    padding: 0.75rem;
    color: ${theme.palette.mode === 'dark' ? '#FFF' : '#FFF'};
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    animation: ${snackbarInRight} 200ms;
    transition: transform 0.2s ease-out;
  `,
);
