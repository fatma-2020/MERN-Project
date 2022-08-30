import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import NavBar from "./Components/TeacherNavbar/Navbar";
import PrivateRoute from "./Components/Privates/PrivateRoute";
import Home from "./Components/Home/home";
import EditSuject from "./Components/EditSubject/EditSuject";
import EditFile from "./Components/EditSubject/EditFile";
import AddSubject from "./Components/AddSubject/AddSubject";
import StudentNavbar from "./Components/StudentNavbar/StudentNavbar";
import SubjectList from "./Components/SubjectList/SubjectList";
import Profile from "./Components/Profile/Profile";
import OwnList from "./Components/OwnSubsList/OwnList";
import ChangePassword from "./Components/Profile/ChangePassword";
import PhotoProfile from "./Components/Profile/PhotoProfile";
import SubFile from "./Components/Subject/SubFile";
import AdminNavbar from "./Components/AdminDashboard/AdminNavbar";
import Adminlist from "./Components/AdminDashboard/AdminList";
function App() {
  return (
    <div className="App">
      <Routes>
        {/* Routes For Admin */}
        <Route
          path="/adminDash"
          element={
            <>
              <AdminNavbar />
              <Adminlist />
            </>
          }
        />
        {/* Routes For All Users */}
        <Route path="/" element={<Home />} />

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/photoloader" element={<PhotoProfile />} />

        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/subfile/:id" element={<SubFile />} />
        {/* For Students */}
        <Route
          path="/studentNavbar"
          element={
            <>
              <StudentNavbar /> <SubjectList />
            </>
          }
        />
        {/*Routes Only For Teachers */}
        <Route
          path="/teacherNavbar"
          element={
            <>
              <NavBar />
              <SubjectList />
            </>
          }
        />
        <Route path="/mysubs" element={<OwnList />} />

        <Route
          path="/addsubject"
          element={
            <PrivateRoute>
              <AddSubject />
            </PrivateRoute>
          }
        />
        <Route path="/editsubject/:id" element={<EditSuject />} />
        <Route path="/editfile/:id" element={<EditFile />} />
      </Routes>
    </div>
  );
}

export default App;
