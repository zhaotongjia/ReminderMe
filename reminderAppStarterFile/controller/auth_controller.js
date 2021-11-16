let database = require("../models/userModel").loginDatabase;
const passport = require("../middleware/passport");
const fetch = require("node-fetch");

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
    const picid = process.env.UNSPLASH_ACCESS_ID;
    const url = `https://api.unsplash.com/photos/random/?client_id=${picid}`;
    console.log(url);
    fetch(url)
      .then((data) => data.json())
      .then((newData) => {
        let userImage = newData.urls.small;
        let register = {
          id: database.length + 1,
          name: req.body.username,
          email: req.body.email,
          password: req.body.password,
          pic: userImage,
        };
        database.push(register);
      });
    res.redirect("/auth/login");
  },

  gitLogin: (req, res, next) => {
    passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
  },

  gitBack: (req, res, next) => {
    passport.authenticate("github", {
      failureRedirect: "auth/login",
      successRedirect: "/reminder",
    })(req, res, next);
  },

  unsplashpic: () => {
    const clientID = process.env.UNSPLASH_ACCESS_ID;
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/auth/login");
  },

  revoke: (req, res) => {
    let sessionid = req.body.sessionID;
    req.sessionStore.destroy(sessionid, (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/dashboard");
    });
  },
};

module.exports = authController;
