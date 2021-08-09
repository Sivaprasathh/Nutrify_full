const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../db/models/user");
const axios = require("axios");
const Meal = require("../db/models/meal");
var jwt = require("jsonwebtoken");
const { isSignIn, verifyJWT } = require("../controllers/controller");

/*const verifyJWT = (req, res, next) => {
  // console.log("Body: ",req.body);
  const token = req.body.headers["x-access-token"]; //post

  //const token = req.headers["x-access-token"]; //get
  //console.log(token);
  if (!token) {
    res.send("No token found");
  } else {
    jwt.verify(token, "secret", (err, data) => {
      if (err) {
        res.send("Authentication failed");
      } else {
        next();
      }
    });
  }
};
*/
router.post("/check", verifyJWT, (req, res) => {
  res.send("Ur are authenticated");
});
router.post("/signin", isSignIn, (req, res) => {
  res.send({ Status: "Success" });
});

router.post("/display", verifyJWT, (req, res) => {
  // console.log("Body:",req.body.name);
  //console.log("Id:",req.body.id);

  //console.log(response);

  Meal.find({ Name: req.body.name }).then((response) => {
    let totalCalorie = 0;
    for (let i = 0; i < response.length; i++)
      totalCalorie += response[i].Calorie;
    var limit = 0;
    Users.find({ Name: req.body.name }).then((response1) => {
      limit = response1[0].CalorieLimit;
      if (limit < totalCalorie) {
        res.send({ Status: "Danger", result: response });
      } else {
        res.send({ Status: "Normal", result: response });
        //res.render("final", {name: req.session.name, calorie:totalCalorie, response: response,msg:"Good to go,Your within the limit",status:"normal"});
      }
    });
  });
});

router.post("/signup", (req, res) => {
  var name = req.body.obj.username;
  var email = req.body.obj.email;
  var password = req.body.obj.password;
  var cl = req.body.obj.calorielimit;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  const data = {
    Name: name,
    Email: email,
    Password: hash,
    CalorieLimit: cl,
  };
  const newUser = new Users(data);
  if (newUser.save()) res.send({ Status: "Success" });
  else res.send({ Status: "Failure" });
});
router.post("/delete", verifyJWT, async (req, res) => {
  await Meal.findOneAndRemove({ _id: req.body.id, Name: req.body.name })
    .then((resp) => {})
    .catch((err) => {
      console.log("err");
    });
  Meal.find({ Name: req.body.name }).then((resp) => {
    res.send({ Status: "Success", result: resp });
  });
});
router.post("/update", verifyJWT, async (req, res) => {
  // console.log(req.body.obj.Id)
  await Meal.findOneAndUpdate(
    { _id: req.body.obj.Id, Name: req.body.obj.Name },
    { Meal: req.body.obj.Meal, Calorie: req.body.obj.Calorie }
  )
    .then((resp) => {
      res.send({ Status: "Success", result: resp });
    })
    .catch((err) => {
      console.log("Failure");
    });
});

router.post("/date", verifyJWT, async (req, res) => {
  var str = req.body.date.split("-");
  var dateStr = "";
  for (let i = str.length - 1; i >= 0; i--) {
    if (i !== str.length - 1) {
      dateStr = dateStr + "-" + str[i];
    } else {
      dateStr = dateStr + str[i];
    }
  }

  Meal.find({ Name: req.body.name, Date: dateStr }).then((response) => {
    let totalCalorie = 0;
    for (let i = 0; i < response.length; i++)
      totalCalorie += response[i].Calorie;
    var limit = 0;
    Users.find({ Name: req.body.name }).then((response1) => {
      limit = response1[0].CalorieLimit;
      if (limit < totalCalorie) {
        res.send({ Status: "Danger", result: response });
      } else {
        res.send({ Status: "Normal", result: response });
        //res.render("final", {name: req.session.name, calorie:totalCalorie, response: response,msg:"Good to go,Your within the limit",status:"normal"});
      }
    });
  });
});

router.post("/addmeal", verifyJWT, async (req, res) => {
  var date = new Date().toJSON().slice(0, 10).split("-").reverse().join("-");
  var time = new Date().toLocaleTimeString();

  const data = {
    Name: req.body.obj.name,
    UserId: req.session.id,
    Meal: req.body.obj.meal,
    Calorie: req.body.obj.calorie,
    Date: date,
    Time: time,
  };

  const newMeal = await new Meal(data);

  newMeal.save().then((resp) => {
    res.send({ Status: "Success", result: resp });
  });
});

router.post("/updatecalorie", verifyJWT, async (req, res) => {
  // console.log(req.body)
  await Users.findOneAndUpdate(
    { Name: req.body.name },
    { CalorieLimit: req.body.calorie }
  )
    .then((resp) => {
      res.send({ Status: "Success", result: resp });
    })
    .catch((err) => {
      console.log("Failure");
    });
});

module.exports = router;
