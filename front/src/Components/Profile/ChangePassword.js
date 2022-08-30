import React from "react";
import DiamondIcon from "@mui/icons-material/Diamond";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  editUserPassword,
  getCurrentuser,
} from "../../Redux/actions/userActions";
const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getCurrentuser());
  }, []);
  const user = useSelector((state) => state.userReducer.currentUser);

  const [actualpass, setActualpass] = React.useState("");
  const [newpass, setNewpass] = React.useState("");
  const [newpassRepeated, setNewpassRepeated] = React.useState("");

  const handleSave = (event) => {
    event.preventDefault();
    if (newpass === newpassRepeated) {
      dispatch(
        editUserPassword(
          user._id,
          { newpass: newpass, actualpass: actualpass },
          navigate
        )
      );
    } else {
      alert("New password and the repeated one must be ");
    }
  };
  return (
    <div className="all">
      {user.role === "teacher" ? (
        <Link to="/teacherNavbar">
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
      )}{" "}
      <Typography>DIAMOND Platform</Typography>
      <div className="cPW">
        <Stack alignItems="center" marginLeft={23}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          ></IconButton>
        </Stack>
        <div className="avatar-flip">
          <img alt="profile " src={user.photo} height={150} width={150} />
          <img alt="profile " src={user.photo} height={150} width={150} />
        </div>
        <h2 className="flname">{`${
          user.firstName[0].toUpperCase() + user.firstName.slice(1)
        } ${user.lastName.toUpperCase()}`}</h2>
        <h4>{`@  ${user.email.slice(0, user.email.indexOf("@"))}`} </h4>
        <TextField
          required
          label="Current Password"
          style={{ paddingBottom: 10 }}
          onChange={(e) => {
            setActualpass(e.target.value);
          }}
        />
        <TextField
          required
          label="New Password"
          style={{ paddingBottom: 10 }}
          onChange={(e) => {
            setNewpass(e.target.value);
          }}
        />
        <TextField
          required
          style={{ paddingBottom: 10 }}
          label="New Password Repeated"
          onChange={(e) => {
            setNewpassRepeated(e.target.value);
          }}
        />
        <p>
          <Button
            variant="outlined"
            style={{ marginRight: 10 }}
            onClick={handleSave}
          >
            Change Password
          </Button>
          <Link to={"/profile"} style={{ textDecoration: "none" }}>
            <Button variant="outlined">Cancel</Button>
          </Link>
        </p>{" "}
      </div>
    </div>
  );
};

export default ChangePassword;
