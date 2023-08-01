import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";
import env from "../environment";

function Teacher() {
  const [students, setStudents] = useState([]);
  const [mentorName, setMentorName] = useState('');
  const [message, setMessage] = useState('');
  const [toggle, setToggle] = useState(false);
  const [studentsName, setstudentsName] = useState([]);

  const handleCheckboxChange = (event) => {
    console.log(studentsName)
    const { value, checked } = event.target;
    if (checked) {
      setstudentsName((prevOptions) => [...prevOptions, value]);
    } else {
      setstudentsName((prevOptions) => prevOptions.filter((option) => option !== value));
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();
    if (studentsName.length > 0) {
      try {
        const res = await axios.post(`${env.apiurl}/users/addmentor`, {
          mentorName,
          studentsName,
        });
        if (res.data.statusCode === 200) {
          setToggle(false);
          setMessage(res.data.message);
          setTimeout(() => {
            setMessage('');
          }, 3000);
        } else {
          setToggle(false);
          setMessage(res.data.message);
          setTimeout(() => {
            setMessage('');
          }, 3000);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const loadData = async () => {
    try {
      const res = await axios.get(`${env.apiurl}/users/studentlist`);
      if (res.data.statusCode === 200) {
        setStudents(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <Form onSubmit={handleClick}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Add Mentor:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Mentor Name"
            onChange={(e) => setMentorName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Add Student:</Form.Label>
          <div className="mb-3">
          
            {students?.map((student, index) => (
              <Form.Check
                key={index}
                reverse
                label={student.studentName}
                type="checkbox"
                id={`reverse-checkbox-${index}`}
                value={student.studentName}
                onChange={handleCheckboxChange}
              />
            ))}
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Teacher