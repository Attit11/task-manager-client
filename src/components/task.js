import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { apiUrl } from "../asset/config";

function Task({
  name,
  setCreateTaskModalOpen,
  getAllTask
}) {
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = new FormData(event.currentTarget);
    await axios.post(
      `${apiUrl}/task`,

      {
        description: data.get("description"),
        completed: data.get("completed") === "true" ? true : false,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    setCreateTaskModalOpen(false);

    getAllTask()
    setLoading(true)

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {name}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
          width={"100%"}
          margin={"0px"}
          padding={"0px"}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoFocus
          />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="completed"
          >
            <FormControlLabel value="false" control={<Radio />} label="False" />
            <FormControlLabel value="true" control={<Radio />} label="True" />
          </RadioGroup>

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {name}
          </Button>
          {/* <Grid container>
              <Grid item>
                <Link onClick={()=> navigate("/signup")} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
        </Box>
      </Box>
    </Container>
  );
}

export default Task;
