const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../db/models/user");
const axios = require("axios");
const Meal = require("../db/models/meal");
var jwt = require("jsonwebtoken");
const { isSignIn, verifyJWT } = require("../controllers/controller");

router.post("/display", verifyJWT, (req, res) => {
  Users.find({})
    .then((response) => {
      res.send({ Status: "Success", result: response });
    })
    .catch((err) => {
      res.send({ Status: "Failure" });
    });
});

router.post("/delete", verifyJWT, async (req, res) => {
  //console.log(req.body.name);
  await Users.findOneAndRemove({ Name: req.body.name })
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log("err");
    });
  Users.find({}).then((resp) => {
    console.log(resp);
    res.send({ Status: "Success", result: resp });
  });
});
router.post("/displaymeals", verifyJWT, (req, res) => {
  Meal.find({ Name: req.body.name }).then((response) => {
    // console.log(response);
    res.send({ Status: "Success", result: response });
  });
});

module.exports = router;
