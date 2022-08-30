import * as React from "react";
import "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubject,
  getAllSubjects,
} from "../../Redux/actions/subjectActions";
import { getCurrentuser } from "../../Redux/actions/userActions";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import FastRewindRoundedIcon from "@mui/icons-material/FastRewindRounded";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Tooltip,
} from "@mui/material";
import NavBar from "../TeacherNavbar/Navbar";

export default function OwnList() {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    dispatch(getCurrentuser());
  }, []);
  const user = useSelector((state) => state.userReducer.currentUser);
  const list = useSelector((state) => state.subjectReducer.subjects);
  const myList = list.filter((el) => el.teacher === user._id);
  return (
    <div>
      <NavBar /> <h3>My list : </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Link to="/teacherNavbar">
          <Button>
            <FastRewindRoundedIcon color="info" fontSize="large" />
            <FastRewindRoundedIcon color="info" fontSize="large" />
          </Button>
        </Link>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", color: "grey" }}>
                  Num
                </TableCell>

                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", color: "grey" }}
                  size="small"
                >
                  Title
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", color: "grey" }}
                >
                  File
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", color: "grey" }}
                >
                  Category
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", color: "grey" }}
                >
                  Class
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", color: "grey" }}
                >
                  Added{" "}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", color: "grey" }}
                >
                  Actions{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myList.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="center" size="small">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Change file">
                      <Link to={`/editfile/${row._id}`}>
                        <Button>
                          <DriveFileRenameOutlineIcon
                            color="primary"
                            fontSize="large"
                          />
                        </Button>
                      </Link>
                    </Tooltip>
                    {row.file.substring(
                      row.file.lastIndexOf("-") + 1,
                      row.file.length
                    )}{" "}
                  </TableCell>
                  <TableCell align="center">
                    {row.category[0].toUpperCase() + row.category.slice(1)}
                  </TableCell>
                  <TableCell align="center">{row.class}</TableCell>
                  <TableCell align="center">{row.added}</TableCell>
                  <TableCell align="center">
                    <Link to={`/editsubject/${row._id}`}>
                      <Button>
                        <ModeEditIcon color="primary" fontSize="large" />
                      </Button>
                    </Link>
                    <Button>
                      <DeleteIcon
                        color="error"
                        onClick={handleClickOpen}
                        fontSize="large"
                      />
                    </Button>

                    <div>
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
                              dispatch(deleteSubject(row._id));
                              dispatch(
                                getAllSubjects({
                                  title: "",
                                  category: "",
                                  class: "",
                                  speciality: "",
                                })
                              );

                              handleClose();
                            }}
                          >
                            OK
                          </Button>
                          <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
