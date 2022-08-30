import * as React from "react";
import "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VerifiedIcon from "@mui/icons-material/Verified";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useDispatch, useSelector } from "react-redux";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import {
  deleteSubject,
  editSubject,
  getAllSubjects,
  getOneSubject,
} from "../../Redux/actions/subjectActions";
import { getCurrentuser } from "../../Redux/actions/userActions";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Slide,
  TextField,
  Tooltip,
} from "@mui/material";
import FastRewindRoundedIcon from "@mui/icons-material/FastRewindRounded";

import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../TeacherNavbar/Navbar";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function EditSuject() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const oldSubject = useSelector((state) => state.subjectReducer.oneSubject);
  const cate = oldSubject.category;
  const cList = ["exam", "exercices", "course"].filter((c) => c !== cate);
  // const cList = ["exam", "exercices", "course"];

  const [updatedSubject, setUpdatedSubject] = React.useState(oldSubject);
  const data = new FormData();
  React.useEffect(() => {
    dispatch(getOneSubject(id));
    dispatch(getAllSubjects());
    dispatch(getCurrentuser());
  }, []);
  React.useEffect(() => {
    setUpdatedSubject(oldSubject);
  }, [oldSubject]);
  const user = useSelector((state) => state.userReducer.currentUser);
  const list = useSelector((state) => state.subjectReducer.subjects);
  const myList = list.filter((el) => el.teacher === user._id);

  return (
    <div>
      <NavBar />
      <h3>My list : </h3>
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
              {myList.map((row, n) =>
                row._id === id ? (
                  <TableRow
                    key={n}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {n}
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        id="title"
                        variant="filled"
                        onChange={(e) =>
                          setUpdatedSubject({
                            ...updatedSubject,
                            title: e.target.value,
                          })
                        }
                        value={updatedSubject.title}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Change file">
                        {/* <Link to={`/editfile/${row._id}`}> */}
                        <Button>
                          <DriveFileRenameOutlineIcon
                            color="disabled"
                            disabled={true}
                            fontSize="large"
                          />
                        </Button>
                        {/* </Link> */}
                      </Tooltip>

                      {row.file.substring(
                        row.file.lastIndexOf("-") + 1,
                        row.file.length
                      )}
                    </TableCell>

                    <TableCell align="right">
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                        value ={updatedSubject.category}
                          onChange={(e) =>
                            setUpdatedSubject({
                              ...updatedSubject,
                              category: e.target.value,
                            })
                          }
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >




                          <MenuItem value={cate} style={{ color: "red" }}>
                           <em>{cate[0].toUpperCase() + cate.slice(1)}</em> 
                          </MenuItem>
                          {cList.map((c, h) =>

                            <MenuItem key={h} value={c}>
                              {c[0].toUpperCase() + c.slice(1)}
                            </MenuItem>

                          )}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        id="class"
                        variant="filled"
                        onChange={(e) =>
                          setUpdatedSubject({
                            ...updatedSubject,
                            class: e.target.value,
                          })
                        }
                        value={updatedSubject.class}
                      />
                    </TableCell>
                    <TableCell align="right">{row.added}</TableCell>

                    <TableCell align="right">
                      <Button>
                        <VerifiedIcon
                          fontSize="large"
                          color="success"
                          onClick={(event) => {
                            event.preventDefault();

                            data.append("title", updatedSubject.title);
                            data.append("class", updatedSubject.class);
                            data.append(
                              "category",
                              updatedSubject.category
                            );
                            dispatch(editSubject(id, data, navigate));
                          }}
                        />
                      </Button>
                      <Link to="/mysubs">
                        <Button>
                          <DisabledByDefaultRoundedIcon
                            color="error"
                            fontSize="large"
                          />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow
                    key={n}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {n + 1}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Change file">
                        {/* <Link to={`/editfile/${row._id}`}> */}
                        <Button>
                          <DriveFileRenameOutlineIcon
                            color="disabled"
                            disabled={true}
                            fontSize="large"
                          />
                        </Button>
                        {/* </Link> */}
                      </Tooltip>
                      {row.file.substring(
                        row.file.lastIndexOf("-") + 1,
                        row.file.length
                      )}
                    </TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">{row.class}</TableCell>
                    <TableCell align="right">{row.added}</TableCell>
                    <TableCell align="right">
                      {/*                       <Link to={`/editsubject/${row._id}`} >
                       */}

                      <Button>
                        <ModeEditIcon
                          color="disabled"
                          disabled={true}
                          fontSize="large"
                        />
                      </Button>

                      <Button>
                        <DeleteIcon
                          color="disabled"
                          disabled={true}
                          // onClick={handleClickOpen}
                          fontSize="large"
                        />
                      </Button>
                      {/* <div>
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
                                handleClose();
                              }}
                            >
                              OK
                            </Button>
                            <Button onClick={handleClose}>Cancel</Button>
                          </DialogActions>
                        </Dialog>
                      </div> */}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
