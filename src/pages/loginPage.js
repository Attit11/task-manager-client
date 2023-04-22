import * as React from "react";
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
import { apiUrl } from "../asset/config";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

const theme = createTheme();

function Login({ setAuthToken }) {
  const [errorNotification, setErrorNotification] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate();

  const sgnUpErrorHandler = () => setErrorNotification((prev) => !prev);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      event.preventDefault();
      setLoading(true)
      const data = new FormData(event.currentTarget);
      const user = await axios.post(`${apiUrl}/user/login`, {
        email: data.get("email"),
        password: data.get("password"),
      });
      setLoading(false)
      localStorage.setItem("authToken", user.data.token);
      setAuthToken(user.data.token);
      navigate("/");
    } catch (e) {
      console.log({ e });
      setLoading(false)
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
            Sign in to Task Manager App
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link onClick={()=> navigate("/signup")} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={errorNotification}
        autoHideDuration={2000}
        onClose={sgnUpErrorHandler}
        message="Could not login. Please retry"
      />
    </ThemeProvider>
  );
}

export default Login;
