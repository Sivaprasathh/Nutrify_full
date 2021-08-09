const Users = require("../db/models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

function isSignIn(req, res, next) {
  var name = req.body.obj.name;
  var password = req.body.obj.password;

  if (name === "admin" && password === "123") {
    const token = jwt.sign(
      {
        name: name,
      },
      "secret",
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    //next();
    res.json({ admin: true, token: token });
  }

  Users.findOne({ Name: name })
    .then((response) => {
      req.userDetails = response;
      req.session.name = response.Name;
      req.session.id = response._id;

      if (bcrypt.compareSync(req.body.obj.password, req.userDetails.Password)) {
        const token = jwt.sign(
          {
            user_id: response._id,
          },
          "secret",
          {
            expiresIn: "1h",
          }
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
        });
        //next();
        res.json({ auth: true, token: token, result: response });
      } else {
        res.clearCookie("connect.sid");
        // res.render("signin",{msg: "Incorrect password"});
        res.send({ Status: "Incorrect password" });
      }
    })
    .catch((err) => {
      res.clearCookie("connect.sid");
      //res.render("signin",{msg: "User not found!"});
    });
}

const verifyJWT = (req, res, next) => {
  // console.log("Body: ",req.body);
  const token = req.body.headers["x-access-token"]; //post

  //const token = req.headers["x-access-token"]; //get
  //console.log(token);
  if (!token) {
    res.send("No token found");
  } else {
    jwt.verify(token, "secret", (err, data) => {
      if (err) {
        res.send({ Status: "failed" });
      } else {
        next();
      }
    });
  }
};

module.exports = { isSignIn, verifyJWT };
