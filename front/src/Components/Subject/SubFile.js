import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// Core viewer
import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Button } from "react-bootstrap";
import { getCurrentuser } from "../../Redux/actions/userActions";

// Create new plugin instance

const SubFile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCurrentuser());
  }, []);
  const user = useSelector((state) => state.userReducer.currentUser);
  const subject = useSelector((state) =>
    state.subjectReducer.subjects.find((el) => el._id === id)
  );
  console.log("FILE: ", subject.file, id);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "80px",
        }}
      >
        <nav>
          {user.role === "teacher" ?
            <Link to="/teacherNavbar" >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Retour
              </Button>
            </Link> : <Link to="/studentNavbar" >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Retour
              </Button>
            </Link>}
          <br />
          <div style={{ paddingTop: "25px" }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={goToPrevPage}
            >
              Prev
            </Button>
            <br />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={goToNextPage}
            >
              Next
            </Button>
          </div>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </nav>

        <Document file={subject.file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};

export default SubFile;
