import { combineReducers } from "redux";
import { subjectReducer } from "./subjectReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({ subjectReducer, userReducer });
