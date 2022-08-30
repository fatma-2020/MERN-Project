import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import { Link as LinkR, useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../Redux/actions/userActions";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import HouseIcon from "@mui/icons-material/House";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [speClass, setSpeClass] = React.useState("");

  //gender
  const [value, setValue] = React.useState("female");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  //role
  const [valueR, setValueR] = React.useState("teacher");

  const handleChangeR = (event) => {
    setValueR(event.target.value);
  };
  //birth
  const [valueB, setValueB] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChangeB = (newValue) => {
    setValueB(newValue);
    console.log(valueB);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("gender", value);
    data.append(
      "birthday",
      valueB.getUTCDate() +
        "/" +
        (valueB.getUTCMonth() + 1) +
        "/" +
        valueB.getFullYear()
    );
    data.append("role", valueR);
    data.append("specialityOrClass", speClass);
    data.append("email", email);
    data.append("password", password);
    data.append("file", file);

    dispatch(signupUser(data, navigate));
  };

  return (
    <ThemeProvider theme={theme}>
      <LinkR to="/">
        <HouseIcon sx={{ fontSize: 50 }} color="info" />
      </LinkR>
      <Container component="main" maxWidth="xs" className="container">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
            <SensorOccupiedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Date desktop"
                      inputFormat="dd/MM/yyyy"
                      name="birth"
                      id="birth"
                      value={valueB}
                      onChange={handleChangeB}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <FormLabel id="gender">Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="gender"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="file"
                  label="file"
                  name="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="speClass"
                  label="Speciality/Class"
                  name="speClass"
                  autoComplete="speClass"
                  onChange={(e) => setSpeClass(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} >
                <FormControl>
                  <FormLabel id="role">Only benefiting from the platform?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="role"
                    value={valueR}
                    onChange={handleChangeR}
                  >
                   
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label="Yes"
                    />
                     <FormControlLabel
                      value="teacher"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>{" "}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
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
                <LinkR to="/signIn">Already have an account? Sign in</LinkR>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
