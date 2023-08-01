import "./App.css";
import { Menu } from "antd";
import {Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Student from "./studentEnroll/Student";
import Teacher from "./teacherenroll/Teacher";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <Menu
        style={{ width: "150px" }}
        mode="inline"
        onClick={({ key }) => {
          navigate(key);
        }}
        items={[
          { label: "Dashboard", key: "/" },
          { label: "student", key: "/student" },
          { label: "teacher", key: "/teacher" },
        ]}
      ></Menu>
      <Content />
    </div>
  );
      }

  function Content(){
    return <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/student" element={<Student />}></Route>
          <Route path="/teacher" element={<Teacher />}></Route>
        </Routes>
      </div>
  }

