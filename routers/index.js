const express = require("express");
const router = express.Router();
//const {isAuthorized} = require("../controllers/controller")
const userRoutes = require("./user");
const adminRoutes = require("./admin");
var jwt = require("jsonwebtoken");

const validToken = (req, res, next) => {
  //post
  if (req.url === "/signin" || req.url === "/signup") {
    next();
  } else {
    const token = req.body.headers["x-access-token"];

    if (!token) {
      res.send("No token found");
    } else {
      jwt.verify(token, "secret", (err, data) => {
        if (err) {
          res.send({ Status: "invalid" });
        } else {
          next();
        }
      });
    }
  }
};

router.use("/", validToken, userRoutes);
router.use("/admin", validToken, adminRoutes);
module.exports = router;
