import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import {
  deleteUser,
  editUser,
  getCurrentuser,
} from "../../Redux/actions/userActions";
import DiamondIcon from "@mui/icons-material/Diamond";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Profile = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentuser());
  }, []);
  const user = useSelector((state) => state.userReducer.currentUser);

  const [updatedUser, setUpdatedUser] = React.useState(user);

  const [editing, setEditing] = React.useState(false);

  const handleEdit = () => {
    setEditing(!editing);
  };
  const handleSave = (event) => {
    event.preventDefault();
    const daTa = new FormData();
    daTa.append("firstName", updatedUser.firstName);
    daTa.append("lastName", updatedUser.lastName);
    daTa.append("bio", updatedUser.bio);
    daTa.append("specialityOrClass", updatedUser.specialityOrClass);
    dispatch(editUser(user._id, daTa, navigate));
    setEditing(!editing);
  };
  return (
    <div className="all">
      {user.role === "teacher" ? (
        <Link to="/teacherNavbar" style={{ textDecoration: "none" }}>
          <Button>
            <ChevronLeftIcon fontSize="small" />
            <DiamondIcon />
          </Button>
        </Link>
      ) : (
        <Link to="/studentNavbar">
          <Button>
            <DiamondIcon />
          </Button>
        </Link>
      )}
      <Typography>DIAMOND Platform</Typography>
      <div className="container">
        <Link to={"/photoloader"}>
          <Stack alignItems="center" marginLeft={23}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              
              <PhotoCamera />
            </IconButton>
          </Stack>
        </Link>
        <div className="avatar-flip">
          <img alt="profile " src={user.photo} height={150} width={150} />
          <img alt="profile " src={user.photo} height={150} width={150} />
        </div>
        {!editing ? (
          <>
            <h2 className="flname">{`${
              user.firstName[0].toUpperCase() + user.firstName.slice(1)
            } ${user.lastName.toUpperCase()}`}</h2>
            <h4>{`@  ${user.email.slice(0, user.email.indexOf("@"))}`} </h4>
            <h4>
              {user.specialityOrClass[0].toUpperCase() +
                user.specialityOrClass.slice(1)}
            </h4>
            <p> {user.bio}</p>
            <p>
              <Link to="/changepassword" style={{ textDecoration: "none",marginRight:5 }}>
                <Button variant="outlined" startIcon={<PasswordRoundedIcon />}>
                  Change password
                </Button>
              </Link>
              {/* </p>
            <p> */}
              <Button
                variant="outlined"
                style={{ marginRight: 5 }}
                startIcon={<AutoFixHighIcon />}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleClickOpen}
              >
                Delete
              </Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"DELETE"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Are you sure to delete ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      dispatch(deleteUser(user._id, navigate));
                      handleClose();
                    }}
                  >
                    OK
                  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
              </Dialog>
            </p>
          </>
        ) : (
          // EDITING MODE ;)
          <div>
            <h4 className="email">
              {`@  ${user.email.slice(0, user.email.indexOf("@"))}`}{" "}
            </h4>

            <h2 className="FLname">
              <TextField
                required
                id="outlined-required"
                label="First Name"
                style={{ paddingRight: 10 }}
                onChange={(e) =>
                  setUpdatedUser({
                    ...updatedUser,
                    firstName: e.target.value,
                  })
                }
                value={updatedUser.firstName}
              />
              <TextField
                required
                id="outlined-required"
                label="Last Name"
                onChange={(e) =>
                  setUpdatedUser({
                    ...updatedUser,
                    lastName: e.target.value,
                  })
                }
                value={updatedUser.lastName}
              />
            </h2>
            <h2 className="FLname">
              <TextField
                required
                id="outlined-required"
                style={{ paddingBottom: 10, paddingRight: 10 }}
                label={user.role === "teacher" ? "Speciality" : "Class"}
                onChange={(e) =>
                  setUpdatedUser({
                    ...updatedUser,
                    specialityOrClass: e.target.value,
                  })
                }
                value={updatedUser.specialityOrClass}
              />
              <TextField
                required
                id="outlined-required"
                label="Bio"
                onChange={(e) =>
                  setUpdatedUser({
                    ...updatedUser,
                    bio: e.target.value,
                  })
                }
                value={updatedUser.bio}
              />{" "}
            </h2>
            <p>
              <Button
                variant="outlined"
                style={{ marginRight: 10 }}
                startIcon={<SendIcon />}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                startIcon={<CancelScheduleSendIcon />}
                onClick={handleEdit}
              >
                Cancel
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
