import * as React from "react";
import "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import { useDispatch, useSelector } from "react-redux";
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

  Slide,
  TextField,
  Tooltip,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../TeacherNavbar/Navbar";

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
  const [image, setImage] = React.useState("");
  const data = new FormData();
  React.useEffect(() => {
    dispatch(getOneSubject(id));
    dispatch(getAllSubjects());
    dispatch(getCurrentuser());
  }, []);

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
              {myList.map((row, i) =>
                row._id === id ? (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {i}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">
                      <TextField
                        id="file"
                        variant="filled"
                        type="file"
                        onChange={(e) => {
                          console.log(e.target.files[0]);
                          setImage(e.target.files[0]);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.class}</TableCell>
                    <TableCell align="center">{row.added}</TableCell>

                    <TableCell align="center">
                      <Button>
                        <TaskRoundedIcon
                          fontSize="large"
                          color="success"
                          onClick={(event) => {
                            event.preventDefault();

                            data.append("file", image);
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
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Change file">
                        {/* <Link to={`/editfile/${row._id}`}> */}
                        <Button>
                          <DriveFileRenameOutlineIcon color="disabled"
                            disabled={true} fontSize="large" />
                        </Button>
                        {/* </Link> */}
                      </Tooltip>

                      {row.file.substring(
                        row.file.lastIndexOf("-") + 1,
                        row.file.length
                      )}
                    </TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.class}</TableCell>
                    <TableCell align="center">{row.added}</TableCell>
                    <TableCell align="center">
                      {/* <Link to={`/editsubject/${row._id}`}> */}
                      <Button>
                        <ModeEditIcon color="disabled"
                          disabled={true} fontSize="large" />
                      </Button>
                      {/* </Link> */}
                      <Button>
                        <DeleteIcon
                          color="disabled"
                          disabled={true}
                          fontSize="large"
                        />
                      </Button>


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
