import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./style.css";

import { Worker } from "@react-pdf-viewer/core";
// Import the main component
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Link } from "react-router-dom";
import { getCurrentuser } from "../../Redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export default function Subject({ el }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCurrentuser());
  }, []);
  const user = useSelector((state) => state.userReducer.currentUser);

  return (
    <Card style={{ margin: 50, minWidth: 250, minHeight: 130 }}>
      <CardContent>
        <Link to={`/subfile/${el._id}`} style={{ textDecoration: "none" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="title"
          >
            {el.title}
          </Typography>
        </Link>
        <Typography color="text.secondary">Class : {el.class} </Typography>{" "}
        <Typography variant="body2" color="text.secondary">
          Speciality: {el.speciality}
        </Typography>
      </CardContent>
    </Card>
  );
}
