import * as React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AttachmentIcon from "@mui/icons-material/Attachment";

import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubject,
  getAllSubjects,
} from "../../Redux/actions/subjectActions";
import { adminDeleteUser, getAllUsers } from "../../Redux/actions/userActions";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function AdminList() {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(
      getAllSubjects({
        title: "",
        category: "",
        class: "",
        speciality: "",
      })
    );
    dispatch(getAllUsers());
  }, []);
  const subjects = useSelector((state) => state.subjectReducer.subjects);
  const teachers = useSelector((state) => state.userReducer.users).filter(
    (v, index) => v.role === "teacher"
  );
  const students = useSelector((state) => state.userReducer.users).filter(
    (v, index) => v.role === "student"
  );

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "space-evenly",
    //     flexWrap: "wrap",
    //   }}
    // >

    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <Grid item xs={12} md={3.5}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Uploded Subjects list{" "}
        </Typography>
        <Demo>
          <List>
            {subjects.map((sub, i) => (
              <ListItem
                key={i}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      dispatch(deleteSubject(sub._id));
                      dispatch(
                        getAllSubjects({
                          title: "",
                          category: "",
                          class: "",
                          speciality: "",
                        })
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <AttachmentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={sub.title} />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
      <Grid item xs={12} md={3.5}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Teachers list
        </Typography>
        <Demo>
          <List>
            {teachers.map((user, j) => (
              <ListItem
                key={j}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      dispatch(adminDeleteUser(user._id));
                      dispatch(getAllUsers());
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt="Profile photo" src={user.photo} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${
                    user.firstName[0].toUpperCase() + user.firstName.slice(1)
                  } ${user.lastName.toUpperCase()}`}
                />
                {/* <ListItemText
                  primary={`${user.specialityOrClass} Speciality`}
                /> */}
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
      <Grid item xs={12} md={3.5}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Students list{" "}
        </Typography>
        <Demo>
          <List>
            {students.map((user, j) => (
              <ListItem
                key={j}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      dispatch(adminDeleteUser(user._id));
                      dispatch(getAllUsers());
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt="Profile photo" src={user.photo} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${
                    user.firstName[0].toUpperCase() + user.firstName.slice(1)
                  } ${user.lastName.toUpperCase()}`}
                />
                {/* <ListItemText primary={`${user.specialityOrClass} Class`} /> */}
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </Grid>
    //   </div>
  );
}
