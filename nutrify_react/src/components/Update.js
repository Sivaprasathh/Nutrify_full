import React from "react";

import { Form, Button, Select } from "react-bootstrap";
import axios from "axios";
import "../styles/styles.css";
class Update extends React.Component {
  constructor() {
    super();
    this.state = {
      calorie: "",
    };
    this.inputRef = React.createRef();
  }
  getCalories = async () => {
    // console.log()
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
    //console.log(e.target.value);
    this.setState({
      calorie: e.target.value,
    });
  };
  handleData = (e) => {
    e.preventDefault();
    // console.log("Id:",this.props.location.state.id);
    //console.log("Name:",this.props.location.state.Name);
    let obj = {
      Id: this.props.location.state.id,
      Name: this.props.location.state.Name,
      Meal: e.target.elements.meal.value,
      Calorie: e.target.elements.calorie.value,
    };
    axios
      .post("/update", {
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
      <div className="body-update">
        <div className="form-div-update">
          <Form className="form" onSubmit={this.handleData}>
            <h4 className="title">Update Meal</h4>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="data">Meal Name</Form.Label>
              <Form.Control
                type="text"
                name="meal"
                ref={this.inputRef}
                placeholder="Enter Meal Name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="data">Calorie</Form.Label>
              <Form.Control
                type="calorie"
                name="calorie"
                placeholder="Calorie"
                value={this.state.calorie}
                placeholder="Calorie Limit"
                onChange={this.changeState}
                required
              />
            </Form.Group>
            <Button className="btn btn-success" onClick={this.getCalories}>
              Fetch
            </Button>
            <Button variant="primary" className="btn-update" type="submit">
              Update
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Update;
