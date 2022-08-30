import axios from "axios";
import {
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_SUCCESS,
  LOGOUT,
  SIGNIN_USER_FAIL,
  SIGNIN_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_SUCCESS,
  UPDATE_ONE_USER_SUCCESS,
  UPDATE_ONE_USER_FAIL,
  UPDATE_PASSWORD_USER_SUCCESS,
  UPDATE_PASSWORD_USER_FAIL,
  GET_USERS_LOADING,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
} from "../constants/userTypes";

export const signupUser = (user, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/registeruser",
      user
    );
    dispatch({ type: SIGNUP_USER_SUCCESS, payload: response.data.newUser });
    navigate("/signIn");
  } catch (error) {
    console.log(error);
    dispatch({ type: SIGNUP_USER_FAIL, payload: error });
    alert(error.response.data.msg);
  }
};
export const signinUser = (user, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/login",
      user
    );
    dispatch({ type: SIGNIN_USER_SUCCESS, payload: response.data });
    response.data.user.role === "teacher"
      ? navigate("/teacherNavbar")
      : response.data.user.role === "admin"
      ? navigate("/adminDash")
      : navigate("/studentNavbar");
  } catch (error) {
    console.log(error);
    dispatch({ type: SIGNIN_USER_FAIL, payload: error });

    alert(error.response.data.msg);
  }
};
export const getCurrentuser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://localhost:5000/users/currentUser",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_CURRENT_USER_FAIL, payload: error });
  }
};
export const logoutUser = (navigate) => {
  navigate("/signIn");
  return { type: LOGOUT };
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS_LOADING });
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("http://localhost:5000/users/allUsers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALL_USERS_FAIL, payload: error });
  }
};

export const editUser = (id, newUser, navigate) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/users/profile/${id}`,
      newUser
    );
    dispatch({ type: UPDATE_ONE_USER_SUCCESS });
    dispatch(getCurrentuser());
    navigate("/profile");
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_ONE_USER_FAIL, payload: error });
    alert(error.response.data.msg);
  }
};

export const editUserPassword =
  (id, newPasswords, navigate) => async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/users/changepassword/${id}`,
        newPasswords
      );
      dispatch({ type: UPDATE_PASSWORD_USER_SUCCESS });
      navigate("/signIn");
    } catch (error) {
      dispatch({ type: UPDATE_PASSWORD_USER_FAIL, payload: error });
      alert(error.response.data.msg);
    }
  };

export const deleteUser = (id, navigate) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:5000/users/${id}`);
    dispatch({ type: DELETE_USER_SUCCESS });
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_USER_FAIL, payload: error });
    alert(error.response.data);
  }
};
export const adminDeleteUser = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:5000/users/${id}`);
    dispatch({ type: DELETE_USER_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_USER_FAIL, payload: error });
    alert(error.response.data);
  }
};
