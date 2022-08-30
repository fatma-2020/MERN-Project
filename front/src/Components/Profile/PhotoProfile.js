import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { editUser, getCurrentuser } from "../../Redux/actions/userActions";
import DiamondIcon from "@mui/icons-material/Diamond";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import "./style.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const PhotoProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCurrentuser());
  }, []);
  const user = useSelector((state) => state.userReducer.currentUser);
  console.log(user);
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
      )}
      <Typography>DIAMOND Platform</Typography>
      <div className="container ppcomponent">
        <div className="avatar-flip">
          <img
            alt="profile "
            src={
              selectedImage ? URL.createObjectURL(selectedImage) : user.photo
            }
            height={150}
            width={150}
          />
          <img
            alt="profile "
            src={
              selectedImage ? URL.createObjectURL(selectedImage) : user.photo
            }
            height={150}
            width={150}
          />
        </div>

        <p>
          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              setSelectedImage(event.target.files[0]);
            }}
          />
        </p>
        <p>
          <Button
            variant="outlined"
            style={{ marginRight: 10 }}
            startIcon={<SendIcon />}
            onClick={() => {
              const data = new FormData();
              data.append("file", selectedImage);
              dispatch(editUser(user._id, data, navigate));
            }}
          >
            Save changes
          </Button>

          <Button
            variant="outlined"
            startIcon={<CancelScheduleSendIcon />}
            onClick={() => {
              navigate("/profile");
              //   setSelectedImage(user.photo);
            }}
          >
            Cancel
          </Button>
        </p>
      </div>
    </div>
  );
};

export default PhotoProfile;
