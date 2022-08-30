import * as React from "react";
import Avatar from "@mui/material/Avatar";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link as LinkR } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addsubject } from "../../Redux/actions/subjectActions";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useSelector } from "react-redux";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { getCurrentuser } from "../../Redux/actions/userActions";
import NavBar from "../TeacherNavbar/Navbar";

const theme = createTheme();

export default function AddSubject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getCurrentuser());
  }, []);
  const user = useSelector((state) => state.userReducer.currentUser);
  const teacher = user._id;
  const speciality = user.specialityOrClass;
  const [file, setFile] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [classe, setClasse] = React.useState("");
  const [category, setCategory] = React.useState("course");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("teacher", teacher);
    data.append("file", file);
    data.append("category", category);
    data.append("class", classe);
    data.append("speciality", speciality);
console.log(data)
    dispatch(addsubject(data, navigate));
  };

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <LinkR to="/teacherNavbar">
          <Button>
            <KeyboardReturnIcon color="info" fontSize="large">
              Back
            </KeyboardReturnIcon>
          </Button>
        </LinkR>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
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
                <PostAddIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                ADD SUBJECT
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      autoComplete="given-name"
                      name="title"
                      required
                      fullWidth
                      id="title"
                      label="title"
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      id="class"
                      label="class"
                      name="class"
                      onChange={(e) => setClasse(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Category
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="category"
                        defaultValue="course"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <FormControlLabel
                          value="course"
                          control={<Radio />}
                          label="Course"
                        />
                        <FormControlLabel
                          value="exam"
                          control={<Radio />}
                          label="Exam"
                        />
                        <FormControlLabel
                          value="exercices"
                          control={<Radio />}
                          label="Exercices"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="file"
                      label="file"
                      name="file"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  ADD SUBJECT
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}
