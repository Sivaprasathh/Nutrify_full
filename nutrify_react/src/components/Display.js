import React from "react";
//import "../styles/Login.css";
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
import "../styles/styles.css";
import logo from "./tenor.gif";
class Display extends React.Component {
  state = {
    result: [],
    status: "",
  };

  signout = () => {
    this.props.history.push("/");
    localStorage.removeItem("token");
  };
  submitDate = (e) => {
    e.preventDefault();
    let id = this.props.location.state.id;
    let name = this.props.location.state.Name;
    // console.log(e.target.elements.date.value);
    axios
      .post("/date", {
        date: e.target.elements.date.value,
        name: name,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        console.log(resp.data.result);
        this.setState({
          result: resp.data.result,
          status: resp.data.Status,
        });
      });
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
            // console.log("Delete Display :",resp.data.result)
            if (res.data.Status === "invalid") {
              this.props.history.push("/");
            } else {
              this.setState({
                result: res.data.result,
                status: resp.data.Status,
              });
            }
          });
        //console.log(res.data);
      });
  };
  redirectAddmeal = () => {
    this.props.history.push("/addmeal", {
      Name: this.props.location.state.Name,
    });
  };
  componentDidMount = () => {
    //let id= this.props.location.state.id;
    let name = this.props.location.state.Name;

    axios
      .post("/display", {
        name: name,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //  console.log("Display res:",res.data.Status);
        if (res.data.Status === "invalid") {
          this.props.history.push("/");
        } else {
          this.setState({
            result: res.data.result,
            status: res.data.Status,
          });
        }
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
          this.props.history.push("/");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Nutrify</Navbar.Brand>
            <Nav className="topnav-right">
              <Nav.Link onClick={this.redirectAddmeal}>AddMeal</Nav.Link>
              <Nav.Link onClick={this.signout}>Signout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        {this.state.status === "Danger" ? (
          <h4 className="blinker">Calorie Limit Exceeded</h4>
        ) : (
          ""
        )}
        <div className="body-table">
          {this.state.result.length === 0 ? (
            <img src={logo} className="img" width="250" height="100"></img>
          ) : (
            this.state.result.map((val, index) => {
              return (
                <div className="table">
                  <div className="container">
                    <div className="table-responsive">
                      <div className="table-wrapper">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>SNo</th>
                              <th style={{ width: "22%" }}>Meal Name</th>
                              <th style={{ width: "22%" }}>Calorie</th>
                              <th>Actions</th>
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
          <form onSubmit={this.submitDate} className="date">
            <input type="date" name="date" className="date-inp" />
            <button type="submit" className="btn btn-warning">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Display;
