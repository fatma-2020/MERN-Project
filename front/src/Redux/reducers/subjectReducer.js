import {
  DELETE_SUBJECT_FAIL,

  GET_ONE_SUBJECT_FAIL,
  GET_ONE_SUBJECT_SUCCESS,
  GET_SUBJECTS_FAIL,
  GET_SUBJECTS_LOADING,
  GET_SUBJECTS_SUCCESS,
  UPDATE_ONE_SUBJECT_FAIL,
} from "../constants/subjectTypes";
import { DELETE_USER_FAIL } from "../constants/userTypes";

const initialState = {
  loading: false,
  subjects: [],
  mySubs: [],
  errors: null,
  oneSubject: {},
};
export const subjectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SUBJECTS_LOADING:
      return { ...state, loading: true };
    case GET_SUBJECTS_SUCCESS:
      return { ...state, subjects: payload, loading: false };
    case GET_SUBJECTS_FAIL:
      return { ...state, errors: payload, loading: false };
   
    case DELETE_SUBJECT_FAIL:
      return { ...state, errors: payload };
    case DELETE_USER_FAIL:
      return { ...state, errors: payload };
    case GET_ONE_SUBJECT_SUCCESS:
      return { ...state, oneSubject: payload };
    case GET_ONE_SUBJECT_FAIL:
      return { ...state, errors: payload };
    case UPDATE_ONE_SUBJECT_FAIL:
      return { ...state, errors: payload };

    default:
      return state;
  }
};
