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

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/")
  });
});

// router.post("/logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     req.session = null;
//     res.redirect("/")
//   });
// });

// router.post("/logout", (req, res, next) => {
//     res.render('/')
//   })

module.exports = router;
