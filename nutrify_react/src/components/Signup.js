import React from "react";
//import "../styles/Signup.module.css";
import Login from "./Login";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "../styles/styles.css";
class Signup extends React.Component {
  state = {
    status: "",
  };

  handleData = (e) => {
    e.preventDefault();
    let obj = {
      username: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      calorielimit: e.target.elements.calorie.value,
    };
    axios.post("/signup", { obj: obj }).then((res) => {
      console.log(res);
      if (res.data.Status === "Success") this.props.history.push("/");
    });
  };
  render() {
    return (
      <div className="body">
        <div className="form-div">
          <Form className="form" onSubmit={this.handleData}>
            <h4 className="title">Signup</h4>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="data">User Name</Form.Label>
              <Form.Control
                type="name"
                name="name"
                placeholder="Enter user name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="data">Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="data">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="data">Calorie Limit</Form.Label>
              <Form.Control
                type="number"
                name="calorie"
                placeholder="Calorie Limit"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

          <div className="hint">
            Already have an account ?{" "}
            <a href="/" className="link">
              Sign in
            </a>{" "}
            here
          </div>
          {this.state.status === "Success" ? (
            <h4 className="hint">Signin now!!</h4>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Signup;
