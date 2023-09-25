const express = require('express');
const router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/login", (req, res, next)=> {
  res.render('login_form')
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

module.exports = router;
