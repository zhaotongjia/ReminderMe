let database = require("../models/userModel").loginDatabase;
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  // loginSubmit: passport.authenticate("local", {
  //   successRedirect: "/reminder",
  //   failureRedirect: "/login"
  // }),

  registerSubmit: (req, res) => {
    let register = {
      id: database.length + 1,
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    database.push(register); //push the new login (id, username, email and password to the logindatabase under/modles/userModel)
    res.redirect("/login"); //after user register to a new account, direct them to the log in page
  },
};

module.exports = authController;
