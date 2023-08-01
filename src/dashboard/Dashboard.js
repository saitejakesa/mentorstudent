import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import env from "../environment";
import "./Dashboard.css"

function Dashboard() {
  const [list, setlist] = useState([]);
  const loadData = async () => {
    try {
      const res = await axios.get(`${env.apiurl}/users/fulllist`);
      console.log(res)
      if (res.data.statusCode === 200) {
        setlist(res.data.data);
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
    <div>
    <div className="backgroundcolour">
      <Row xs={2} md={4} className="g-4">
        {list.map((e, i) => (
          <Col key={i}>
            <Card className="card text-white bg-primary mb-3">
              <Card.Body>
                <Card.Title>{list[i].mentorName}</Card.Title>
                <ListGroup variant="flush">
                  {list[i].studentsName.map((a,b)=>(
                      <ListGroup.Item>{list[i].studentsName[b]}</ListGroup.Item>

                  ))
                    }
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    </div>
  );
}

export default Dashboard;
