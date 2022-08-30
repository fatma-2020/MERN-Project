import React from "react";
import { Link } from "react-router-dom";
import DiamondIcon from "@mui/icons-material/Diamond";

import "./style.css";
// import background from "C:UsersTechno-proDownloadsCompressedMERN-main_2MERN-main\frontsrcComponentsHomeEducational-Platforms.jpg";
import backgroundd from "./eLearning.webp";
const Home = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-evenly",
      flexDirection: "column",
      flexWrap: "wrap", backgroundImage: `url(${backgroundd})`
    }} className="home">
      <DiamondIcon fontSize="large" />

      <h3 style={{ color: "white" }}>Diamond : educational platform </h3>
      <p style={{ color: "white" }}>WELL COME DEAR TEACHERS AND STUDENTS</p>
      <div style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}>
        <Link to="/signIn" style={{ textDecoration: "none" }}>
          <button class="button-5">Login</button>
        </Link>

        <Link to="/signUp" style={{ textDecoration: "none" }}>
          <button className="button-5">Register</button>
        </Link></div>
    </div>
  );
};

export default Home;
