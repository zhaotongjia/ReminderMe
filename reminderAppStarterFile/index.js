const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const multer = require("multer");
const imgur = require("imgur");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

app.use(express.static(path.join(__dirname, "public")));
app.use(upload.any());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(ejsLayouts);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());

// Routes start here
const reminderRoute = require("./routes/reminderRoute");
app.use("/reminder", reminderRoute);

const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);

const homeRoute = require("./routes/homeRoute");
app.use("/", homeRoute);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminder in your browser 🚀"
  );
});

