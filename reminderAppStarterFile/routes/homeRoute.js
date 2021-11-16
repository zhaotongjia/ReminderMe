const express = require("express");
const imgur = require("imgur");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/checkAuth");
const fs = require("fs");
const { isRedirect } = require("node-fetch");
let database = require("../models/userModel").loginDatabase;

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  req.sessionStore.all((err, sessions) => {
    if (err) {
      console.log(err);
    } else {
      res.render("home/dashboard", { user: [req.user, sessions] });
    }
  });
});

router.post("/uploads/", async (req, res) => {
  const file = req.files[0];
  try {
    const url = await imgur.uploadFile(`./uploads/${file.filename}`);
    const piclink = url.link.split(".").slice(0,-1).join(".") + "m.jpeg"
    console.log(piclink);
    database.forEach( (e) => {
      if ((req.user.id) === e.id) {
        e.pic = piclink
      }
    })
    fs.unlinkSync(`./uploads/${file.filename}`);
    res.redirect("/dashboard")
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
