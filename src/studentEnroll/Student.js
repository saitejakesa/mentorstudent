import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import env from "../environment";

function Student() {
  const [data, setData] = useState([]);
  let [mentors, setmentors] = useState([]);
  let [mentorName, setmentorName] = useState([]);
  let [studentName, setstudentName] = useState([]);
  let [message, setMessage] = useState("");
  let [toggle, setToggle] = useState(false);
  let handleClick = async () => {
    let res = await axios.post(`${env.apiurl}/users/addstudent`, {
      mentorName,
      studentName,
    });
    if (res.data.statusCode === 200) {
      setToggle(false);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setToggle(false);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  let loadData = async () => {
    let res = await axios.get(`${env.apiurl}/users/mentorlist`);
    console.log(res + "line 37");
    if (res.data.statusCode === 200) {
      setmentors(res.data.data);
    } else {
      alert(res.data.message);
    }
  };
  console.log(mentors + "line 44");
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Add Student:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setstudentName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Teacher Selection:</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onClick={loadData}
            onChange={(e) => setmentorName(e.target.value)}
          >
            <option>Open this select menu</option>
            {mentors?.map((e, i) => {
              return <option key={i}>{e.mentorName}</option>;
            })}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleClick}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Student;
