import axios from "axios";
import {
  ADD_SUBJECT_FAIL,
  ADD_SUBJECT_SUCCESS,
  DELETE_SUBJECT_FAIL,
  DELETE_SUBJECT_SUCCESS,
  GET_ONE_SUBJECT_FAIL,
  GET_ONE_SUBJECT_SUCCESS,
  GET_SUBJECTS_FAIL,
  GET_SUBJECTS_LOADING,
  GET_SUBJECTS_SUCCESS,
  UPDATE_ONE_SUBJECT_FAIL,
  UPDATE_ONE_SUBJECT_SUCCESS,
} from "../constants/subjectTypes";

export const getAllSubjects = (searchedList) => async (dispatch) => {
  dispatch({ type: GET_SUBJECTS_LOADING });
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `http://localhost:5000/subjects/?category=${searchedList.category}&&title=${searchedList.title}&&class=${searchedList.class}&&speciality=${searchedList.speciality}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: GET_SUBJECTS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_SUBJECTS_FAIL, payload: error });
  }
};

export const deleteSubject = (id) => async (dispatch) => {
  
  try {
    const response = await axios.delete(`http://localhost:5000/subjects/${id}`);
    dispatch({ type: DELETE_SUBJECT_SUCCESS });
    dispatch(getAllSubjects());
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_SUBJECT_FAIL, payload: error });
    alert(error.response.data);
  }
};

export const addsubject = (newSubject, navigate) => async (dispatch) => {
  console.log(newSubject);
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      "http://localhost:5000/subjects/addsubject",
      newSubject,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    dispatch({ type: ADD_SUBJECT_SUCCESS });
    dispatch(getAllSubjects());
    navigate("/teacherNavbar");
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_SUBJECT_FAIL, payload: error });
    alert(error.response.data);
  }
};
export const getOneSubject = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/subjects/details/${id}`
    );
    dispatch({
      type: GET_ONE_SUBJECT_SUCCESS,
      payload: response.data.oneSubject,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ONE_SUBJECT_FAIL, payload: error });
  }
};
export const editSubject = (id, newSubject, navigate) => async (dispatch) => {
  console.log("subject is: ", newSubject);
  try {
    const response = await axios.put(
      `http://localhost:5000/subjects/${id}`,
      newSubject
    );
    console.log(response);
    dispatch({ type: UPDATE_ONE_SUBJECT_SUCCESS });
    dispatch(getAllSubjects());
    navigate("/mysubs");
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_ONE_SUBJECT_FAIL, payload: error });
    alert(error.response.data);
  }
};
