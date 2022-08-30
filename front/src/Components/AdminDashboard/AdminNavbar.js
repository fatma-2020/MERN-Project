import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DiamondIcon from "@mui/icons-material/Diamond";
import { logoutUser } from "../../Redux/actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <DiamondIcon />
          <Typography variant="h6" noWrap component="a">
            DIAMOND Platform
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              dispatch(logoutUser(navigate));
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
