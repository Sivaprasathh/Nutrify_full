import React from "react";
import { Form, Button, Select } from "react-bootstrap";
import axios from "axios";
import Header from "../components/Header";
import "../styles/styles.css";
import { Navbar, Container, Nav } from "react-bootstrap";

class Addmeal extends React.Component {
  constructor() {
    super();
    this.state = {
      calorie: "",
    };
    this.inputRef = React.createRef();
  }
  handleDisplay = () => {
    let name = this.props.location.state.Name;
    this.props.history.push(`/display:${name}`, {
      Name: name,
    });
  };
  signout = () => {
    this.props.history.push("/");
    localStorage.removeItem("token");
  };

  getCalories = async () => {
    console.log();
    const EndPoint = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const headers = {
      "x-app-id": "58f45caa",
      "x-app-key": "d2af6e8214db4c2761dcd7f127ee230a",
    };
    const response = await axios.post(
      EndPoint,
      { query: this.inputRef.current.value },
      { headers }
    );
    if (response.data) {
      console.log("nutrix calorie", response.data.foods[0]["nf_calories"]);
      this.setState({
        calorie: response.data.foods[0]["nf_calories"],
      });
    }
  };
  changeState = (e) => {
    // console.log(e.target.value);
    this.setState({
      calorie: e.target.value,
    });
  };
  handleData = async (e) => {
    e.preventDefault();
    let obj = {
      name: this.props.location.state.Name,
      meal: e.target.elements.meal.value,
      calorie: this.state.calorie,
    };

    axios
      .post("/addmeal", {
        obj: obj,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.Status === "invalid") {
          this.props.history.push("/");
        }
        if (res.data.Status === "Success")
          this.props.history.push(`/display:${res.data.result._id}`, {
            Name: res.data.result.Name,
            id: res.data.result._id,
          });
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
      <div className="body-add">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Nutrify</Navbar.Brand>
            <Nav className="topnav-right">
              <Nav.Link onClick={this.handleDisplay}>Display</Nav.Link>
              <Header name={this.props.location.state.Name} />
              <Nav.Link onClick={this.signout} className="btn ml-15">
                Signout
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <div className="form-div-add">
          <Form className="form" onSubmit={this.handleData}>
            <h4 className="title">Add your Meal</h4>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="data">User Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={this.props.location.state.Name}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="data">Enter Meal Name</Form.Label>
              <Form.Control
                type="text"
                name="meal"
                ref={this.inputRef}
                placeholder="Enter Meal Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="data">Calorie Limit</Form.Label>
              <Form.Control
                type="number"
                name="calorie"
                value={this.state.calorie}
                placeholder="Calorie Limit"
                onChange={this.changeState}
              />
            </Form.Group>
            <Button className="btn btn-success" onClick={this.getCalories}>
              Fetch
            </Button>
            <Button variant="primary" type="submit" className="submit-btn">
              Add
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Addmeal;
