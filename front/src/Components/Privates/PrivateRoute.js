import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCurrentuser } from "../../Redux/actions/userActions";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentuser());
  }, []);
  const user = useSelector((state) => state.userReducer.currentUser);

  return (
    <div>
      {localStorage.getItem("token") && user.role === "teacher" ? (
        children
      ) : (
        <Navigate to="/signIn" />
      )}
    </div>
  );
};

export default PrivateRoute;
