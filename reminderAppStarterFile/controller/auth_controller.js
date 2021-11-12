let database = require("../models/userModel").loginDatabase;
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/reminder",
      failureRedirect: "/auth/login",
    })(req, res, next);
  },

  registerSubmit: (req, res) => {
    let register = {
      id: database.length + 1,
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    database.push(register); //push the new login (id, username, email and password to the logindatabase under/modles/userModel)
    res.redirect("/auth/login"); //after user register to a new account, direct them to the log in page
  },

  gitLogin: (req, res, next) => {
    passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
  },

  gitBack: (req, res, next) => {
    passport.authenticate("github", {
      failureRedirect: "auth/login",
      successRedirect: "/reminder"
    })(req, res, next);
  },

  unsplashpic: () => {
    const clientID = process.env.UNSPLASH_ACCESS_ID;
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/auth/login");
  },
};

module.exports = authController;
