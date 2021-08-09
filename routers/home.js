const Users = require("../db/models/user");
const Meal = require("../db/models/meal");
const axios = require("axios");
const {isSignIn,isAuthorized} = require("../controllers/controller")
const express = require("express")
const router = express.Router()
router.post("/displaynav", (req, res) => {
  console.log(req.body);
  res.send("Success");
   
  });