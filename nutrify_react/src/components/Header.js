import { Form, Button, Select, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
function Header(props) {
  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    axios
      .post("/updatecalorie", {
        name: props.name,
        calorie: e.target.elements.calorie.value,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        if (resp.data.Status === "invalid") {
          this.props.history.push("/");
        }
      });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Update daily limit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Calorie Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form" onSubmit={handleClose}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Update Calorie</Form.Label>
              <Form.Control
                type="number"
                name="calorie"
                placeholder="in numbers"
              />
            </Form.Group>
            <Button variant="warning" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
