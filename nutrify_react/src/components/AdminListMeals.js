import React from "react";
import "../styles/styles.css";
import logo from "./tenor.gif";

import {
  Form,
  Row,
  Col,
  Button,
  Card,
  Navbar,
  Container,
  Nav,
} from "react-bootstrap";
import axios from "axios";
class AdminListMeals extends React.Component {
  state = {
    meals: [],
    status: "",
  };
  deleteOne = (id, name) => {
    axios
      .post("/delete", {
        id: id,
        name: name,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        axios
          .post("/display", {
            id: id,
            name: name,
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          })
          .then((resp) => {
            if (res.data.Status === "invalid") {
              this.props.history.push("/adminlogin");
            }
            // console.log("Delete Display :",resp.data.result)
            this.setState({
              meals: res.data.result,
              status: resp.data.Status,
            });
          });
        //console.log(res.data);
      });
  };

  componentWillMount = () => {
    console.log("Inside ComponentWillMount");
    axios
      .post("/", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.Status === "invalid") {
          this.props.history.push("/adminlogin");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  componentDidMount = () => {
    let name = this.props.location.state.Name;
    console.log("Inside component did mount", name);
    axios
      .post("/admin/displaymeals", {
        name: name,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //  console.log("Display res:",res.data.Status);
        console.log("Admin res:", res.data.Status);
        if (res.data.Status === "failed") {
          this.props.history.push("/adminlogin");
        } else {
          this.setState({
            meals: res.data.result,
            status: res.data.Status,
          });
        }
      });
  };
  signout = () => {
    this.props.history.push("/adminlogin");
    localStorage.removeItem("token");
  };
  back = () => {
    this.props.history.push("/adminlistusers");
  };
  render() {
    return (
      <div className="body-table">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav.Link onClick={this.back} varient="light" className="back">
              Back
            </Nav.Link>
            <Nav className="topnav-right">
              <Nav.Link onClick={this.signout}>Signout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        {this.state.meals.length === 0 ? (
          <img src={logo} className="img" width="250" height="100"></img>
        ) : (
          this.state.meals.map((val, index) => {
            return (
              <div className="table">
                <div className="container">
                  <div className="table-responsive">
                    <div className="table-wrapper">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>SNo</th>

                            <th style={{ width: "22%" }}>Meal</th>
                            <th>Calorie</th>
                            <th>Action</th>
                            <th>Date</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody className="table-body">
                          <tr>
                            <td>{index + 1}</td>

                            <td>{val.Meal}</td>
                            <td>{val.Calorie}</td>
                            <td>
                              <Button
                                className="btn btn-success"
                                onClick={() => {
                                  this.props.history.push(
                                    `/update:${val._id}:`,
                                    { id: val._id, Name: val.Name }
                                  );
                                }}
                              >
                                Update
                              </Button>
                              <Button
                                className="submit-btn btn-danger"
                                onClick={() => {
                                  this.deleteOne(val._id, val.Name);
                                }}
                              >
                                Delete
                              </Button>
                            </td>
                            <td>{val.Date}</td>
                            <td>{val.Time}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        ;
      </div>
    );
  }
}

export default AdminListMeals;
