// dashboard page 
// multer: will resassble all packet for the image on the server side 
// url is no long the unsplash one, it should be where multer save the ressembled pic

// can let multer to store the pic in other companies' service e.g. AWS 
// we will use imgur
const express= require("express")
const router = express.Router()
const { ensureAuthenticated } = require("../middleware/checkAuth");


router.get("/dashboard",ensureAuthenticated, (req, res) =>{
    console.log(req.sessionID)
    console.log(req.user)
    res.render("home/dashboard", { user: [req.user, req.sessionID] })
})

module.exports = router; 