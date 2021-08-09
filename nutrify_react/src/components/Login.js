import React from "react";
import "../styles/styles.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      obj: {},
    };
  }

  handleData = (e) => {
    e.preventDefault();
    let obj = {
      name: e.target.elements.name.value,
      password: e.target.elements.password.value,
    };

    axios.post("/signin", { obj: obj }).then((res) => {
      if (res.data.auth === true) {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/addmeal", { Name: res.data.result.Name });
      }
      else{
        this.props.history.push("/signup");
      }
    });
  };
  render() {
    return (
      <div className="body">
        <div className="form-div">
          <Button
            className="btn-admin"
            variant="dark"
            onClick={() => {
              this.props.history.push("/adminlogin");
            }}
          >
            admin
          </Button>
          <Form className="form" onSubmit={this.handleData}>
            <h4 className="title">Login</h4>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="data">User Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter User Name"
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

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <div className="hint">
            Dont have an account ?{" "}
            <a href="/signup" className="link">
              Register
            </a>{" "}
            here
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
