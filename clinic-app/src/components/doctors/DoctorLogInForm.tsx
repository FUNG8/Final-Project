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
import {  useState } from 'react';
import { login } from "../../api/doctorAuthAPI";
import DesignerImage from '../../image/Designer.jpeg';

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
    },
  });


  //input field onchange will set the username and pw input by props and state
  //submit button 帶 value入去onLogin mutate 
  const handleLogin = () => {
    console.log("loggging in");
    console.log(usernameInput,passwordInput)
    onLogin.mutate({ username: usernameInput, password: passwordInput });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            <Box component="form" noValidate  sx={{ mt: 1 }}>

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
