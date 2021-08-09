import React from "react";
import "../styles/styles.css";
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
import logo from "./tenor.gif";
class AdminListUsers extends React.Component {
  state = {
    users: [],
    status: "",
  };
  redirectUsers = (name) => {
    this.props.history.push(`/adminlistmeals:${name}`, { Name: name });
  };
  deleteOne = (name) => {
    axios
      .post("/admin/delete", {
        name: name,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.Status !== "Success") {
          this.props.history.push("/adminlogin");
        } else {
          this.setState({
            users: res.data.result,
            status: res.data.Status,
          });
        }
      });
  };
  signout = () => {
    this.props.history.push("/adminlogin");
    localStorage.removeItem("token");
  };
  componentDidMount = () => {
    let name = "Siva";
    console.log("Inside component did mount");
    axios
      .post("/admin/display", {
        name: name,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log("Display res:",res.data.Status);
        //console.log("Response admin:",res)
        if (res.data.Status === "invalid") {
          this.props.history.push("/adminlogin");
        } else {
          this.setState({
            users: res.data.result,
            status: res.data.Status,
          });
        }
      });
  };

  render() {
    return (
      <div className="body-table">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Nutrify Admin</Navbar.Brand>
            <Nav className="topnav-right">
              <Nav.Link onClick={this.signout}>Signout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        {this.state.users.length === 0 ? (
          <img src={logo} className="img" width="250" height="100"></img>
        ) : (
          this.state.users.map((val, index) => {
            return (
              <div className="table">
                <div className="container">
                  <div className="table-responsive">
                    <div className="table-wrapper">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>SNo</th>
                            <th style={{ width: "22%" }}>User</th>
                            <th style={{ width: "22%" }}>Calorie</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody className="table-body">
                          <tr>
                            <td>{index + 1}</td>
                            <td>{val.Name}</td>
                            <td>{val.CalorieLimit}</td>
                            <td>
                              <Button
                                className="btn btn-success"
                                onClick={() => {
                                  this.redirectUsers(val.Name);
                                }}
                              >
                                View
                              </Button>
                              <Button
                                className="submit-btn btn-danger"
                                onClick={() => {
                                  this.deleteOne(val.Name);
                                }}
                              >
                                Delete
                              </Button>
                            </td>
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

export default AdminListUsers;
