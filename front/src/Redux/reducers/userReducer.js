import {
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_SUCCESS,
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_SUCCESS,
  GET_USERS_LOADING,
  LOGOUT,
  SIGNIN_USER_FAIL,
  SIGNIN_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_SUCCESS,
  UPDATE_ONE_USER_FAIL,
  UPDATE_PASSWORD_USER_FAIL,
  UPDATE_PASSWORD_USER_SUCCESS,
} from "../constants/userTypes";

const initialState = {
  loading: false,
  currentUser: {},
  users: [],
  errors: null,
};
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_USER_SUCCESS:
      return { ...state, currentUser: payload };
    case SIGNUP_USER_FAIL:
      return { ...state, errors: payload };
    case SIGNIN_USER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, currentUser: payload.user };
    case SIGNIN_USER_FAIL:
      return { ...state, errors: payload };
    case GET_CURRENT_USER_SUCCESS:
      return { ...state, currentUser: payload };
    case GET_CURRENT_USER_FAIL:
      return { ...state, errors: payload };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        loading: false,
        currentUser: {},
        errors: null,
      };

    case GET_USERS_LOADING:
      return { ...state, loading: true };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, users: payload, loading: false };
    case GET_ALL_USERS_FAIL:
      return { ...state, errors: payload, loading: false };

    case UPDATE_ONE_USER_FAIL:
      return { ...state, errors: payload };
    case UPDATE_PASSWORD_USER_FAIL:
      return { ...state, errors: payload };
    case UPDATE_PASSWORD_USER_SUCCESS:
      alert("Password hes been changed , Login again");

      localStorage.removeItem("token");
      return {
        loading: false,
        currentUser: {},
        errors: null,
      };
    default:
      return state;
  }
};
