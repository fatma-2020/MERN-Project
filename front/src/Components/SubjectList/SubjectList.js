import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllSubjects } from "../../Redux/actions/subjectActions";
import Subject from "../Subject/Subject";

import "./style.css";

const SubjectList = () => {
  const cList = ["exam", "exercices", "course"];
  const [searchedList, setSearchedList] = React.useState({
    title: "",
    category: "",
    class: "",
    speciality: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSubjects(searchedList));
    // dispatch(getCurrentuser());
  }, []);
  const list = useSelector((state) => state.subjectReducer.subjects);

  return (
    <>
      {/* <h3> Subjects</h3> */}
      <div
        style={{
          marginTop: 50,
          fontFamily: "Times New Roman",
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <h4 style={{ color: "black" }}> Search by :</h4>
        <TextField
          id="title-basic"
          label="Title"
          variant="filled"
          onChange={(e) => {
            setSearchedList({
              ...searchedList,
              title: e.target.value,
            });
            dispatch(
              getAllSubjects({
                ...searchedList,
                title: e.target.value,
              })
            );
            console.log({
              ...searchedList,
              title: e.target.value,
            });
          }}
        />
        <TextField
          id="class-basic"
          label="Class"
          variant="filled"
          onChange={(e) => {
            setSearchedList({
              ...searchedList,
              class: e.target.value,
            });
            dispatch(
              getAllSubjects(
                getAllSubjects({
                  ...searchedList,
                  class: e.target.value,
                })
              )
            );
            console.log(searchedList);
            console.log(searchedList);
          }}
        />
        <TextField
          id="speciality-basic"
          label="Speciality"
          variant="filled"
          onChange={(e) => {
            setSearchedList({
              ...searchedList,
              speciality: e.target.value,
            });
            dispatch(
              getAllSubjects(
                getAllSubjects({
                  ...searchedList,
                  speciality: e.target.value,
                })
              )
            );
            console.log(searchedList);
          }}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              defaultValue=""
              label="Category"
              onChange={(e) => {
                setSearchedList({
                  ...searchedList,
                  category: e.target.value,
                });
                dispatch(
                  getAllSubjects({
                    ...searchedList,
                    category: e.target.value,
                  })
                );
                console.log(searchedList);
              }}
            >
              {cList.map((e, i) => (
                <MenuItem key={i} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {list.map((el) => (
          <Subject
            el={el}
            key={el._id}
            style={{
              marginTop: 50,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default SubjectList;
