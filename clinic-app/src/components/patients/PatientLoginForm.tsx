
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import {  useState } from 'react';
import { login } from "../../api/patientAuthAPI";
import logo from "../../image/logo.jpeg";
import background from "../../image/patientloginBg.jpeg"



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function PatientLoginForm() {
  const [hkidInput, sethkidInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const [ErrorMessage, setErrorMessage] = useState('');

  const onLogin = useMutation({
    mutationFn: async (data: { hkid: string; password: string }) =>
      login(data.hkid, data.password),
    onSuccess: (data) => {
      console.log("On success checking", data);
      localStorage.setItem("patientToken", data);
      let tokenArrayString: string | null = localStorage.getItem("tokenArray")
      if (tokenArrayString) {
        console.log("tokenArray exist", tokenArrayString)
        let tokenArray: Array<string> = JSON.parse(tokenArrayString)
        localStorage.setItem("tokenArray", JSON.stringify([...tokenArray, data]))
      } else {
        console.log("tokenArray not exist")
        let tokenArrayString: string = JSON.stringify([data])
        localStorage.setItem("tokenArray", tokenArrayString)
      }
      queryClient.invalidateQueries({ queryKey: ["authStatus"] });
      navigate('/patient/profile')
    },
    onError: (e) => {
      console.log("On error!!", e);
      setErrorMessage('Login failed.')
    },
  });

  const handleLogin = () => {
    console.log("loggging in");
    onLogin.mutate({ hkid: hkidInput, password: passwordInput });
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
            backgroundImage: `url(${background})`,
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
              my: 18,
              mx: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main',width: '40%', height: '40%'  }}>
            <img src={logo} alt="Logo" style={{ width: '100%', height: '100%' }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                value={hkidInput}
                onChange={(e) => sethkidInput(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="hkid"
                label="HKID"
                name="hkid"
                autoComplete="hkid"
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
              <Grid container>

                <Grid item>

                </Grid>
              </Grid>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
