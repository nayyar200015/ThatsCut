var express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const DB =
  "mongodb+srv://abdulrehman:mahlaka190@cluster0.zptsc.mongodb.net/thatscutdata?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log("Error"));
const User = require("./models/usermessage");
const hbs = require("hbs");
require("./db/conn");

var app = express();

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
//setting the paths

// middleware
// app.use(
//   "/css",
//   express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
// );
// app.use(
//   "/js",
//   express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
// );
// app.use(
//   "/jq",
//   express.static(path.join(__dirname, "../node_modules/jquery/dist"))
// );
// app.get("/public", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

// routing

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/gallery", function (req, res) {
  res.render("gallery");
});
app.get("/contact", function (req, res) {
  res.render("contact");
});
app.get("/service", function (req, res) {
  res.render("service");
});

app.post("/contact", async (req, res) => {
  console.log(req.body);
  //   var myData = new User(req.body);
  //   myData
  //     .save()
  //     .then(() => {
  //       res.send("This item has been saved to the database");
  //     })
  //     .catch(() => {
  //       res.status(400).send("Item was not saved to the databse");
  //     });
  try {
    var userData = new User(req.body);
    await userData.save();
    console.log("price is", req.body.service[0]);
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3001);
