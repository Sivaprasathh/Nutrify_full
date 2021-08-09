const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const allRoutes = require("./routers/index");
require("dotenv").config();

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const app = express();
var cors = require("cors");

app.use(cors());
//

app.set("views", "views");
app.set("view engine", "ejs");
const url = process.env.MONGODB_URL;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/nutrify_react/build"));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("Connected");
});

app.use("/", allRoutes);
app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/nutrify_react/build/index.html");
});
/*app.get("/check",(req,res)=>{

res.send({name:"Siva"});	
})*/
app.listen(process.env.PORT || 4000, function () {
  console.log("Sever Running");
});
