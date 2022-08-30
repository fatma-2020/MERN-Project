import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  deleteSubject,
  getAllSubjects,
} from "../../../Redux/actions/subjectActions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SubjectsList = () => {
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen2(false);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
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
  }, []);
  const subjects = useSelector((state) => state.subjectReducer.subjects);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <HistoryEduIcon />
        </ListItemIcon>
        <ListItemText primary="Uploaded subjects" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subjects.map((subject, index) => (
            <ListItemButton key={index} sx={{ pl: 4 }}>
              <ListItemIcon>
                <AttachmentIcon />
              </ListItemIcon>
              <ListItemText primary={subject.title} />
              <DeleteRoundedIcon color="error" onClick={handleClickOpen} />
              <div>
                <Dialog
                  open={open2}
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
                        dispatch(deleteSubject(subject._id));
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
            </ListItemButton>
          ))}
        </List>
      </Collapse>{" "}
    </>
  );
};

export default SubjectsList;
