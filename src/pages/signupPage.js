import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Snackbar } from "@mui/material";
import { apiUrl } from "../asset/config";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function SignUp({ authToken, setAuthToken }) {
  const [errorNotification, setErrorNotification] = useState(false);
  const navigate = useNavigate();

  const sgnUpErrorHandler = () => setErrorNotification((prev) => !prev);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const user = await axios.post(`${apiUrl}/user`, {
        name: data.get("name"),
        email: data.get("email"),
        age: parseInt(data.get("age")),
        password: data.get("password"),
      });
      localStorage.setItem("authToken", user.data.token)
      setAuthToken(user.data.token)
      navigate("/");

    } catch (e) {
      console.log({ e });
      sgnUpErrorHandler();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up to Task Manager App
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //   required
                  fullWidth
                  name="age"
                  label="Age"
                  type="age"
                  id="age"
                  autoComplete="age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" onClick={()=> navigate("/login")} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={errorNotification}
          autoHideDuration={2000}
          onClose={sgnUpErrorHandler}
          message="Could not sign up. Please retry"
          //   action={sgnUpErrorHandler}
        />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
