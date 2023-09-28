const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//require controller modules//
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

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

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/")
  });
});

router.get("/member_join",  user_controller.member_join_form_get);

router.post("/member_join",  user_controller.member_join_form_post);

router.get("/admin_join_form",  user_controller.admin_join_form_get);

router.post("/admin_join_form",  user_controller.admin_join_form_post);

module.exports = router;
